
'use client'

import React, { useState } from "react";
import { z, ZodObject, ZodTypeAny, ZodError, ZodEffects } from "zod";
import { TextField, CheckboxField, FloatingLabelField } from "@/components/custom-ui/field"

export function extractSchemaDesc(schema: ZodObject<any> | ZodEffects<any>): Record<string, string>[] {
  while (schema instanceof ZodEffects) {
    schema = schema._def.schema;
  }

  if (!(schema instanceof ZodObject)) {
    throw new Error("Provided schema is not a ZodObject");
  }

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
  const inputType = fieldDesc.inputType;
  const autoFocus = !!fieldDesc.autoFocus;
  const type = fieldDesc.type;
  const label = fieldDesc.label;
  const key = fieldDesc.zodkey;
  const placeholder = fieldDesc.placeholder;
  const name = `auto-field-${label}`
  const error = formError[key] ?? '';
  const val = formData[key] ?? '';
  const onChange = (e: any) => updateValFunc(key, e.target.value);

  if (inputType === "checkbox") {
    return <CheckboxField key={name} autoFocus={autoFocus} label={label} name={name} error={error} value={val} onChange={onChange} />;
  } else if (inputType === "floating_label_field") {
    return <FloatingLabelField
      key={name}
      autoFocus={autoFocus}
      type={type}
      label={label}
      name={name}
      placeholder={placeholder}
      error={error} value={val}
      onChange={onChange}
      requiredMark={fieldDesc.required}
    />;
  } else {
    return <TextField
      key={name}
      autoFocus={autoFocus}
      type={type}
      label={label}
      name={name}
      placeholder={placeholder}
      error={error}
      value={val}
      onChange={onChange}
      requiredMark={fieldDesc.required}
    />;
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

export function useGeneratedFields(schema: ZodObject<any> | ZodEffects<any>) {
  const fieldDescs = extractSchemaDesc(schema);
  const [formData, setFormDataRaw] = useState<any>(() => {
    return fieldDescs.reduce((acc, field) => {
      acc[field.zodkey] = field.default ?? undefined;
      return acc;
    }, {});
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateFieldVal = (field: string, value: any) => {
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

  const inputFields: React.JSX.Element[] = [];
  const inputFieldsMap: Record<string, React.JSX.Element> = {};
  fieldDescs?.forEach((fd) => {
    const field = renderInputField(fd, formData, updateFieldVal, fieldErrors);
    inputFields.push(field);
    inputFieldsMap[fd.zodkey] = field;
  });

  return { formData, updateFieldVal, inputFields, inputFieldsMap, clearAllErrors, validate }
}

export function useZodFormData(schema: ZodObject<any> | ZodEffects<any>, init?: any) {
  const fieldDescs = extractSchemaDesc(schema);
  const [formData, setFormDataRaw] = useState<any>(() => {
    return fieldDescs.reduce((acc, field) => {
      acc[field.zodkey] = init ? ((init[field.zodkey] || field.default) ?? '') : (field.default ?? '');
      return acc;
    }, {});
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateFieldVal = (field: string, value: any) => {
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
      console.log("validate >>>>>>>>> data:", formData)
      console.log("validate >>>>>>>>> result:", result)
      setFieldErrors(result.errors as any);
      return null;
    }
  };

  return { formData, updateFieldVal, fieldErrors, clearAllErrors, validate }
}
