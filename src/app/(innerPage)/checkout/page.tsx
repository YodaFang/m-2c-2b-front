
import CheckoutForm from "@/app/(innerPage)/checkout/checkoutForm";
import { HomeIcon, ChevronRight } from "lucide-react"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase.",
};

const Checkout = () => {
  return (
    <main className="w-full bg-white px-2">
      <div className="flex items-center gap-1 overflow-hidden py-2">
        <span>
          <HomeIcon className="size-5 text-slate-600" />
        </span>
        <span >
          <ChevronRight className="size-4" />
        </span>
        <span className="flex items-center space-x-1 text-slate-600 text-base font-semibold">Checkout</span>
      </div>
      <CheckoutForm />
    </main>
  );
};

export default Checkout;
