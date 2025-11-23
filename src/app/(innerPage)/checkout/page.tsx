
import CheckoutForm from "@/app/(innerPage)/checkout/checkoutForm";
import { HomeIcon, ChevronRight, ArrowRightIcon } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link";
import AddressDialog from "./addressDialog"


export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase.",
};

const Checkout = () => {
  return (
    <main className="w-full bg-white px-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-1 overflow-hidden py-2">
          <Link href="/" >
            <HomeIcon className="size-5 text-slate-600" />
          </Link>
          <span >
            <ChevronRight className="size-4" />
          </span>
          <span className="flex items-center space-x-1 text-slate-600 text-base font-semibold">Checkout</span>
        </div>
        <nav className="py-2 px-3">
          <ul className="flex gap-6">
            <li className="group">
              <Link
                href="/shop"
                className="flex items-center text-slate-600 text-base font-semibold group-hover:text-secondary-foreground"
              >
                <ArrowRightIcon className="size-5" />
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <CheckoutForm />
      <AddressDialog />
    </main>
  );
};

export default Checkout;
