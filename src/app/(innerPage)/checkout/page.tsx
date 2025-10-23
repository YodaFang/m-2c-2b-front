import CheckoutForm from "@/app/(innerPage)/checkout/checkoutForm";
import CheckoutPayment from "@/app/(innerPage)/checkout/checkoutPayment";
import InstagramGallery from "@/components/sections/instagramGallery";
import Newsletter from "@/components/sections/newsletter";
import PageHeader from "@/components/sections/pageHeader";
import { Metadata } from "next";
import CouponCodeForm from "./couponCodeForm";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase.",
};

const Checkout = () => {
  return (
    <main>
      <PageHeader
        currentPage="Checkout"
        pageTitle="Checkout"
        breadcrumbLink="/shop"
        breadcrumbLabel="Shop"
      />
      <div className="container lg:pt-25 lg:pb-30 pt-15 pb-15">
        <div className="grid lg:grid-cols-[auto_48.6%] grid-cols-1 gap-7.5">
          <div>
            <LoginForm />
            <CouponCodeForm />
            <CheckoutForm />
          </div>
          <CheckoutPayment />
        </div>
      </div>
      <Newsletter />
      <InstagramGallery />
    </main>
  );
};

export default Checkout;
