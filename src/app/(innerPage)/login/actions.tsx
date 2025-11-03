
'use client'
import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import { z, ZodObject, ZodTypeAny, ZodError } from "zod";
import { TextField, CheckboxField, } from "@/components/custom-ui/field"

export function extractSchemaDesc(schema: ZodObject<any>): Record<string, string>[] {
  const shape = schema.shape;
  const result: Record<string, any>[] = [];

  for (const key in shape) {
    const field = shape[key] as ZodTypeAny;
    const desc = (field._def.description as string) || "{}";
    let def: Record<string, string>;
    try {
      def = JSON.parse(desc);
      def["zodtype"] = field._def.typeName?.toLowerCase() || "unknown";
    } catch {
      def = { descRaw: desc };
    }
    def["zodkey"] = key;
    result.push(def);
  }

  return result;
}

function renderInputField(
  fieldDesc: any,
  formData: any,
  updateValFunc: (key: string, val: any) => void,
  formError?: any
) {
  const label = fieldDesc.label;
  const key = fieldDesc.zodkey;
  const name = `auto-field-${label}`
  const error = formError[key] ?? '';
  const val = formData[key] ?? '';
  const onChange = (e: any) => updateValFunc(key, e.target.value);

  if (fieldDesc.type === "checkbox") {
    return (
      <CheckboxField key={name} label={label} name={name} error={error} value={val} onChange={onChange} />
    );
  } else {
    return (
      <TextField key={name} type={fieldDesc.type} label={label} name={name} error={error} value={val} onChange={onChange} requiredMark={fieldDesc.required} />
    );
  }
}

export function flattenZodError(error: ZodError): Record<string, string> {
  const result: Record<string, string> = {};

  for (const issue of error.issues) {
    // issue.path 是 (string | number)[]，把每项转成字符串然后 join
    const path =
      issue.path && issue.path.length
        ? issue.path.map((p) => String(p)).join(".")
        : "_form"; // 根级别的错误放到 _form

    // 只保留第一条消息（避免覆盖）
    if (!result[path]) {
      result[path] = issue.message;
    }
  }

  return result;
}

export function zodValidate<T>(schema: z.ZodType<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: flattenZodError(result.error),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

const errorsAtom = atom<Record<string, string>>({});

export function useGeneratedFields(schema: ZodObject<any>) {
  const fieldDescs = extractSchemaDesc(schema);
  const [formData, setFormDataRaw] = useState<any>(() => {
    return fieldDescs.reduce((acc, field) => {
      acc[field.zodkey] = field.default ?? null;
      return acc;
    }, {});
  });
  const [fieldErrors, setFieldErrors] = useAtom(errorsAtom);

  const updateField = (field: string, value: any) => {
    setFormDataRaw((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    clearFieldError(field);
  };

  const clearFieldError = (key: string) => {
    if (key in fieldErrors) {
      setFieldErrors((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const clearAllErrors = () => {
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors({});
    }
  };

  const validate = () => {
    const result = zodValidate(schema, formData);
    if (result.success) {
      return result.data;
    } else {
      setFieldErrors(result.errors as any);
      return null;
    }
  };

  const inputFields = fieldDescs?.map((fd: any) => renderInputField(fd, formData, updateField, fieldErrors));

  return { formData, inputFields, clearAllErrors, validate }
}

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).describe(JSON.stringify({
    default: "",
    label: "Email",
    type: "email",
    required: true,
    description: "",
    classNmae: "",
  })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }).describe(JSON.stringify({
    default: "",
    label: "Password",
    type: "password",
    required: true,
    description: "",
    classNmae: "",
  })),
});
