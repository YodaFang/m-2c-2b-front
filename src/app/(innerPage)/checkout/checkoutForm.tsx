'use client'

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPinIcon, ArrowRightIcon, EditIcon } from "lucide-react"
import { useSidebarCartVar, useAuthDialogVars, useCheckoutAdressDialogOpen } from "@/hooks/use-global-vars";
import { useGetCart } from "@/hooks/use-app"
import { useAddressActions, AddressType } from "@/hooks/use-address"
import { AddressForm } from "@/app/sections/address/address-form"

const CheckoutForm = () => {

  const { setSidebarCartOpen } = useSidebarCartVar();
  const { showCheckoutAuthDialog } = useAuthDialogVars();
  const { setDialogOpen: setAddressDialogOpen } = useCheckoutAdressDialogOpen();
  const { cart, isLoading } = useGetCart();
  const { saveShippingAddr, saveBillingAddr } = useAddressActions();
  const shippingAddr = cart?.shipping_address;
  const [showShippingAddrForm, setShowShippingAddrForm] = useState(false);
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);

  const submitShipping = async (data: AddressType) => {
    await saveShippingAddr(data);
    setShowShippingAddrForm(false);
    if (useShippingForBilling) {
      await saveBillingAddr(data);
    }
  };

  useEffect(() => showCheckoutAuthDialog(), []);

  if (isLoading) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 my-6 gap-6">
      <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
        <div className="flex flex-col border border-slate-300 rounded-lg">
          <div className="bg-slate-200 rounded-tl-lg rounded-tr-lg p-2 flex justify-between items-center">
            <div className="text-slate-950 text-lg font-medium">
              Shipping Address
            </div>
            <button onClick={() => setAddressDialogOpen(true)} className="pr-1 text-slate-950 text-base font-normal leading-normal underline">
              Select
            </button>
          </div>
          {(!showShippingAddrForm && shippingAddr) ?
            <div className="w-full p-2 flex justify-between items-cneter">
              <div className="flex items-cneter gap-2">
                <div className="bg-slate-50 px-2 rounded-lg flex items-center shrink-0">
                  <MapPinIcon className="md:size-8 size-6 text-primary-600" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-slate-950 md:text-base text-sm font-medium">
                    {shippingAddr.first_name} - {shippingAddr.phone}
                  </div>
                  <div className="text-slate-500 md:text-base text-sm font-normal max-w-[60vw] line-clamp-2">
                    {shippingAddr.address_1}, {shippingAddr.city}, {shippingAddr.province}, {shippingAddr.postal_code}
                  </div>
                </div>
              </div>
              <button className="px-1 rounded-lg flex items-end" onClick={() => setShowShippingAddrForm(true)}>
                <EditIcon className="size-6" />
              </button>
            </div>
            :
            <div className="p-3">
              <AddressForm initAddress={shippingAddr} submitHandler={submitShipping} cancelHandler={() => setShowShippingAddrForm(false)} />
            </div>
          }
        </div>

        <div className="flex flex-col gap-2 border border-slate-300 rounded-lg p-3">
          <div className="flex justify-between items-center gap-2">
            <div className="text-slate-950 text-lg font-medium leading-7">
              Billing Address
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="use-shipping" checked={useShippingForBilling} onCheckedChange={(val: boolean) => setUseShippingForBilling(val)} />
              <Label htmlFor="use-shipping">Use Shipping Address</Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border border-slate-300 rounded-lg p-3">
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-950 text-xl font-medium leading-7">
              Shipping Method
            </span>
          </div>
          <div className="w-full h-[0px] border-t border-dashed border-slate-300"></div>
          <div className="w-full flex gap-6 ">
            <div className="flex flex-wrap justify-between gap-4">
              <label className="flex items-center gap-3 xl:min-w-70">
                <input id="cash" name="ship" type="radio" className="w-4 h-4 border appearance-none border-slate-500 rounded-full checked:bg-primary ring-primary checked:outline-1 outline-offset-1 checked:outline-primary checked:outline transition duration-100 ease-in-out m-0" value="cash" defaultChecked />
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <Image src="assets/icons/money-2.svg" alt="" width="12" height="12" className="w-7 h-7" />
                </div>
                <span className="text-slate-500 text-base font-normal leading-normal">DPD</span>
              </label>
              <label className="flex items-center gap-3 xl:min-w-70">
                <input v-model="paymentType" id="card" name="ship" type="radio" className="w-4 h-4 border appearance-none border-slate-500 rounded-full checked:bg-primary ring-primary checked:outline-1 outline-offset-1 checked:outline-primary checked:outline transition duration-100 ease-in-out m-0" value="card" />
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <Image src="assets/icons/card.svg" width="12" height="12" alt="" className="w-7 h-7" />
                </div>
                <span className="text-slate-500 text-base font-normal leading-normal">
                  Fan
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-center p-3 gap-3 bg-slate-200 rounded-lg">
          <div className="relative md:w-[300px] w-full">
            <input type="text"
              className="bg-white rounded-lg border border-slate-200 focus:border-primary w-full outline-none text-base font-normal leading-normal placeholder:text-slate-400 p-3"
              placeholder="Enter coupon code" />

            <button className="bg-slate-700 absolute top-1/2 -translate-y-1/2 right-1.5 h-10 w-10 rounded flex justify-center items-center">
              <ArrowRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="text-black text-base font-normal leading-normal">
            Get 10% reduce coupon by follow our channel
          </div>

        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="p-4 bg-white rounded-2xl border border-slate-300">
          <div className="flex justify-between gap-4">
            <div className="text-slate-950 text-xl font-medium leading-7">
              Order Summary
            </div>
            <button onClick={() => setSidebarCartOpen(true)} className="pr-2 text-slate-950 text-base font-medium underline">
              2 items
            </button>
          </div>
          <div className="w-full my-3 h-[0px] border border-slate-500"></div>
          <div className="my-3 flex justify-between gap-4">
            <div className="text-slate-950 text-base font-normal leading-normal">
              Subtotal
            </div>
            <div className="text-slate-950 text-base font-normal leading-normal">
              $110.0
            </div>
          </div>

          <div className="my-3 flex justify-between gap-4">
            <div className="text-red-500 text-base font-normal leading-normal">
              Discount
            </div>
            <div className="text-slate-950 text-base font-normal leading-normal">
              - $10.0
            </div>
          </div>

          <div className="w-full h-[0px] border-t border-dashed border-slate-300"></div>

          <div className="my-3 flex justify-between">
            <div className="text-slate-950 text-base font-normal leading-normal">
              Shipping Charge
            </div>
            <div className="text-slate-950 text-base font-normal leading-normal">
              $5.0
            </div>
          </div>

          <div className="my-3 flex justify-between">
            <div className="text-slate-950 text-base font-normal leading-normal">
              <span className="font-medium">
                TVA{" "}
                <small>(21%)</small>
              </span>
            </div>
            <div className="text-slate-950 text-base font-normal leading-normal">
              $5.0
            </div>
          </div>

          <div className="w-full h-[0px] border border-slate-500"></div>

          <div className="mt-3 flex justify-between">
            <div className="text-slate-950 text-lg font-medium leading-normal tracking-tight">
              Total
            </div>
            <div className="text-slate-950 text-lg font-medium leading-normal tracking-tight">
              $50.0
            </div>
          </div>
        </div>
        <div className="mt-1 p-3 flex flex-col gap-3 rounded-2xl border border-slate-300 w-full">
          <div className="flex justify-between">
            <label className="flex items-center gap-3 xl:min-w-70">
              <input id="cash" name="payment" type="radio" className="w-4 h-4 border appearance-none border-slate-500 rounded-full checked:bg-primary ring-primary checked:outline-1 outline-offset-1 checked:outline-primary checked:outline transition duration-100 ease-in-out m-0" value="cash" defaultChecked />
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <Image src="assets/icons/money-2.svg" alt="" width="12" height="12" className="w-7 h-7" />
              </div>
              <span className="text-slate-500 text-base font-normal leading-normal">Cash on delivery</span>
            </label>
            <label className="flex items-center gap-3 xl:min-w-70">
              <input v-model="paymentType" id="card" name="payment" type="radio" className="w-4 h-4 border appearance-none border-slate-500 rounded-full checked:bg-primary ring-primary checked:outline-1 outline-offset-1 checked:outline-primary checked:outline transition duration-100 ease-in-out m-0" value="card" />
              <div className="p-2 bg-white rounded-xl border border-slate-200">
                <Image src="assets/icons/card.svg" width="12" height="12" alt="" className="w-7 h-7" />
              </div>
              <span className="text-slate-500 text-base font-normal leading-normal">
                Credit or Debit Card
              </span>
            </label>
          </div>
          <Button className='w-full lg:py-[11px] text-lg mt-3'>Place Order</Button>
        </div>
      </div>

    </div>
  );
};

export default CheckoutForm;
