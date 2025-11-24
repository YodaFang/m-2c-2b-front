'use client'

import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { setShippingAddress, setBillingAddress } from "@/api/cart";


export const useAddressActions = () => {
  const queryClient = useQueryClient();

  const saveShippingAddr = async (address: AddressType) => {
    const { id, is_default, ...addrData } = address;
    await setShippingAddress(addrData);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    queryClient.invalidateQueries({ queryKey: ["useGetShippingMethods"] });
    return true;
  }

  const saveBillingAddr = async (address: AddressType) => {
    const { id, is_default, ...addrData } = address;
    await setBillingAddress(addrData);
    queryClient.invalidateQueries({ queryKey: ["useGetCart"] });
    return true;
  }

  return {
    saveShippingAddr,
    saveBillingAddr,
  }
}

const optionalMinLength = (len: number) =>
  z.string().optional().refine(
    (v) => !v || v === "" || v.length >= len,
    { message: `At least ${len} characters or empty.` }
  );

export const AddressSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(3, { message: 'At least 3 charecters.' }),
  last_name: optionalMinLength(3),
  phone: z.string().min(3, { message: 'At least 3 charecters.' }),
  address_1: z.string().min(3, { message: 'At least 3 charecters.' }),
  address_2: optionalMinLength(3),
  city: z.string().min(3, { message: 'At least 3 charecters.' }),
  province: z.string().min(3, { message: 'At least 3 charecters.' }),
  country_code: z.string().describe(JSON.stringify({
    default: 'ro',
  })),
  postal_code: z.string().min(3, { message: 'At least 3 charecters.' }),
  is_default: z.boolean().describe(JSON.stringify({
    default: false,
  })),
})

export type AddressType = z.infer<typeof AddressSchema>;

