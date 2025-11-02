
import { z, ZodObject, ZodTypeAny } from "zod";

type FieldInfo = {
  type: string;
  describe?: Record<string, any>;
};
export function extractSchemaInfo(schema: ZodObject<any>): Record<string, FieldInfo> {
  const shape = schema.shape;
  const result: Record<string, FieldInfo> = {};

  for (const key in shape) {
    const field = shape[key] as ZodTypeAny;
    const def: FieldInfo = {
      type: field._def.typeName?.replace("Zod", "").toLowerCase() || "unknown",
    };

    // 解析 describe() 信息
    const desc = (field._def.description as string) || "";
    if (desc) {
      try {
        def.describe = JSON.parse(desc);
      } catch {
        def.describe = { raw: desc };
      }
    }
    result[key] = def;
  }

  return result;
}


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).describe(JSON.stringify({
    default: "",
    label: "Email",
    inputShowLabel: true,
    inputGroup: 2,
    inputType: "password",
  })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const info = extractSchemaInfo(loginSchema);
console.log("loginSchema>>>>>>>>>>>>>>>>>>>>>>", info);

export async function loginUser(prevState: any, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const errors: any = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.keys(errors).map(field => errors[field]).join(' ');
    return { message: errorMessage, status: 'error' };
  }

  const { email, password } = parsed.data;

  // In a real application, you would hash the password and save to a database
  console.log('Login user:', { email, password });

  // Simulate a delay for network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: 'Login successful!', status: 'success' };
}
