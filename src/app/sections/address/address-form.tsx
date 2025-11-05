'use client'

import { z } from "zod";
import { Button } from '@/components/ui/button'
import { FieldGroup, } from "@/components/custom-ui/field"
import { useGeneratedFields } from "@/hooks/use-zod-fields"

const addressSchema = z.object({
    first_name: z.string().min(3, { message: 'At least 3 charecters.' }).describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "Name",
        type: "text",
        required: true,
    })),
    address_1: z.string().min(5, { message: 'Invalid address.' }).describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "Address",
        type: "text",
        required: true,
    })),
    address_2: z.string().describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "Block, Apartment, etc.",
        type: "text",
        required: true,
    })),
    postal_code: z.string().min(5, { message: 'Invalid Postal code.' }).max(5, { message: 'Invalid Postal code.' }).describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "Postal code",
        type: "text",
        required: true,
    })),
    city: z.string().min(3, { message: 'Invalid City.' }).describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "City",
        type: "text",
        required: true,
    })),
    province: z.string().min(3, { message: 'Invalid Province.' }).describe(JSON.stringify({
        inputType: "floating_label_field",
        label: "Province",
        type: "text",
        required: true,
    })),
});

const RegsiterForm = () => {
    const { inputFields, validate } = useGeneratedFields(addressSchema);
    const handlerSubmit = async () => {
        const data1 = validate();
    }
    return (
        <div className='container'>
            <FieldGroup>
                {inputFields}
            </FieldGroup>
            <Button className='w-full text-lg mt-3' onClick={handlerSubmit}>Submit</Button>
        </div>
    )
}

export default RegsiterForm