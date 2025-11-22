'use client'

import { z } from "zod";
import { useZodFormData } from "@/hooks/use-zod-fields"
import { FieldGroup, CheckboxField, FloatingLabelField } from "@/components/custom-ui/field"
import { FloatingLabelCombobox } from "@/components/custom-ui/combobox"
import { Button } from '@/components/ui/button'

interface AddressFormProp {
    initAddress?: any;
    addressHandler: (addr: any) => void;
}

export function AddressForm({ initAddress, addressHandler }: AddressFormProp) {
    const { formData, updateFieldVal, fieldErrors, validate } = useZodFormData(shippingAdrSchema, initAddress);
    const handlerSubmit = async () => {
        const data = validate();
        if (data && Object.keys(data).length) {
            addressHandler(data);
        }
    }
    return (
        <div className="w-full">
            <FieldGroup>
                <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-3">
                    <FloatingLabelField type="text" label="Name" name="first_name" error={fieldErrors['first_name']} value={formData['first_name']} onChange={(e: any) => updateFieldVal('first_name', e.target.value)} requiredMark={true} />
                    <FloatingLabelField type="text" label="Phone" name="phone" error={fieldErrors['phone']} value={formData['phone']} onChange={(e: any) => updateFieldVal('phone', e.target.value)} requiredMark={true} />
                </div>
                <FloatingLabelField type="text" label="Street Address" name="address_1" error={fieldErrors['address_1']} value={formData['address_1']} onChange={(e: any) => updateFieldVal('address_1', e.target.value)} requiredMark={true} />
                <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-3">
                    <FloatingLabelCombobox label="City" value={formData['City']} onChange={(val: any) => updateFieldVal('City', val)} options={frameworks} requiredMark />
                    <FloatingLabelCombobox label="State" value={formData['province']} onChange={(val: any) => updateFieldVal('province', val)} options={frameworks} requiredMark />
                    <FloatingLabelField type="text" label="Zip Code" name="postal_code" error={fieldErrors['postal_code']} value={formData['postal_code']} onChange={(e: any) => updateFieldVal('postal_code', e.target.value)} requiredMark={true} />
                    <CheckboxField className="pl-3" label="Set as default" name="default" value={formData['is_default_shipping']} onChange={(e: any) => updateFieldVal('is_default_shipping', e.target.value)} />
                </div>
                <Button className='w-full lg:py-[11px] text-lg mt-3' onClick={handlerSubmit}>Submit</Button>
            </FieldGroup>
        </div>
    )
}


const shippingAdrSchema = z.object({
    id: z.string().optional(),
    first_name: z.string().min(3, { message: 'At least 3 charecters.' }),
    last_name: z.string().min(3, { message: 'At least 3 charecters.' }).optional(),
    phone: z.string().min(3, { message: 'At least 3 charecters.' }),
    address_1: z.string().min(3, { message: 'At least 3 charecters.' }),
    address_2: z.string().min(3, { message: 'At least 3 charecters.' }),
    city: z.string().min(3, { message: 'At least 3 charecters.' }),
    province: z.string().min(3, { message: 'At least 3 charecters.' }),
    postal_code: z.string().min(3, { message: 'At least 3 charecters.' }),
    is_default_shipping: z.boolean().describe(JSON.stringify({
        default: false,
    })),
})

export type ShippingAdr = z.infer<typeof shippingAdrSchema>;


const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]
