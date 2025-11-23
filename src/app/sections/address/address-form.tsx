'use client'

import { useZodFormData } from "@/hooks/use-zod-fields"
import { FieldGroup, CheckboxField, FloatingLabelField } from "@/components/custom-ui/field"
import { FloatingLabelCombobox } from "@/components/custom-ui/combobox"
import { Button } from '@/components/ui/button'
import { AddressSchema, AddressType } from "@/hooks/use-address"

interface AddressFormProp {
    initAddress?: any;
    submitHandler: (addr: AddressType) => Promise<any>;
    cancelHandler?: () => void;
}

export function AddressForm({ initAddress, submitHandler, cancelHandler }: AddressFormProp) {
    const { formData, updateFieldVal, fieldErrors, validate } = useZodFormData(AddressSchema, initAddress);
    const handlerSubmit = async () => {
        const data = validate();
        if (data && Object.keys(data).length) {
            await submitHandler(data);
        }
    }

    const handlerCancel = async () => {
       if(cancelHandler) cancelHandler();
    }
    return (
        <FieldGroup>
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-3">
                <FloatingLabelField type="text" label="Name" name="first_name" error={fieldErrors['first_name']} value={formData['first_name']} onChange={(e: any) => updateFieldVal('first_name', e.target.value)} requiredMark={true} />
                <FloatingLabelField type="text" label="Phone" name="phone" error={fieldErrors['phone']} value={formData['phone']} onChange={(e: any) => updateFieldVal('phone', e.target.value)} requiredMark={true} />
            </div>
            <FloatingLabelField type="text" label="Street Address" name="address_1" error={fieldErrors['address_1']} value={formData['address_1']} onChange={(e: any) => updateFieldVal('address_1', e.target.value)} requiredMark={true} />
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-3">
                <FloatingLabelCombobox label="City" value={formData['city']} onChange={(val: any) => updateFieldVal('city', val)} options={frameworks} error={fieldErrors['city']} requiredMark />
                <FloatingLabelCombobox label="State" value={formData['province']} onChange={(val: any) => updateFieldVal('province', val)} options={frameworks} error={fieldErrors['province']} requiredMark />
                <FloatingLabelField type="text" label="Zip Code" name="postal_code" error={fieldErrors['postal_code']} value={formData['postal_code']} onChange={(e: any) => updateFieldVal('postal_code', e.target.value)} requiredMark={true} />
                <CheckboxField className="pl-3" label="Set as default" name="default" checked={formData['is_default']} onCheckedChange={(val: boolean) => updateFieldVal('is_default', val)} />
            </div>
            <div className='w-full flex justify-end gap-6'>
                <Button variant="outline" className='lg:py-[11px] px-8 text-base font-semibold' onClick={handlerCancel}>Cancel</Button>
                <Button className='lg:py-[11px] px-8 text-base font-semibold' onClick={handlerSubmit}>Submit</Button>
            </div>
        </FieldGroup>
    )
}

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
