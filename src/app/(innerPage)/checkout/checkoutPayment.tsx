import { Button } from "@/components/custom-ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/custom-ui/radio-group";
import Image from "next/image";
import Link from "next/link";

const CheckoutPayment = () => {
  return (
    <div className="bg-[#F5F5F5] sm:p-10 p-7 rounded-xl">
      <div className="border border-[#999796] sm:p-7.5 p-5 rounded-lg">
        <p className="bg-primary text-white lg:py-[15px] py-3 lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-center rounded-md">
          Your Order
        </p>
        <div className="overflow-x-auto">
          <div className="mt-7.5  min-w-[350px]">
            <div className="flex justify-between border-b-[1.5px] border-b-[#999796] pb-5">
              <p className="lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-secondary-foreground">
                Product
              </p>
              <p className="lg:text-2xl sm:text-xl text-lg lg:leading-[125%] font-semibold text-secondary-foreground">
                Subtotal
              </p>
            </div>

            <div className="mt-7.5 flex flex-col gap-5 border-b-[1.5px] border-b-[#999796] pb-7.5">
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <Image
                    width={70}
                    height={70}
                    src={"/images/cart/img-1.webp"}
                    alt="img"
                    className="bg-white max-h-[70px] object-contain"
                  />
                  <div>
                    <p className="text-secondary-foreground lg:text-xl sm:text-lg text-base font-medium">
                      Modern Tolik Chair
                    </p>
                    <span className="text-base text-secondary-foreground">
                      Qty: 2
                    </span>
                  </div>
                </div>
                <p className="text-secondary-foreground lg:text-xl sm:text-lg text-base font-semibold lg:leading-[150%] mt-2">
                  $350.00
                </p>
              </div>
            </div>

            <div className="flex justify-between border-b-[1.5px] border-b-[#999796] pb-5 mt-7.5">
              <p className="lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground">
                Subtotal
              </p>
              <p className="lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground">
                $1000.00
              </p>
            </div>

            <div className="flex justify-between items-center border-b-[1.5px] border-b-[#999796] pb-5 mt-7.5">
              <p className="lg:text-xl text-lg lg:leading-[150%] font-medium text-secondary-foreground">
                Shipping
              </p>
              <RadioGroup defaultValue="0" className="gap-2.5 justify-end">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="0"
                    id="free-shipping"
                    aria-label="radio"
                    className="border-primary text-transparent"
                  />
                  <Label
                    htmlFor="free-shipping"
                    className="text-gray-1-foreground text-base"
                  >
                    Free Shipping
                  </Label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem
                    value="10"
                    id="fat-rate"
                    aria-label="radio"
                    className="border-primary text-transparent"
                  />
                  <Label
                    htmlFor="fat-rate"
                    className="text-gray-1-foreground text-base"
                  >
                    Fat Rate $10.00
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between mt-7.5">
              <p className="text-xl leading-[150%] font-medium text-secondary-foreground">
                Total
              </p>
              <p className="text-xl leading-[150%] font-medium text-secondary-foreground">
                $1025.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <RadioGroup defaultValue="bank-transfer" className="gap-y-5">
          <div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="bank-transfer"
                id="bank-transfer"
                aria-label="radio"
                className="w-3 h-3 border-primary text-transparent [&_svg]:w-2 [&_svg]:h-2 [&_svg]:fill-black"
              />
              <Label
                htmlFor="bank-transfer"
                className="text-secondary-foreground text-base"
              >
                Direct bank transfer
              </Label>
            </div>
            <p className="text-gray-1-foreground mt-3">
              Make your payment directly into our bank account. Please your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          </div>
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem
              value="check-payment"
              id="check-payment"
              aria-label="radio"
              className="w-3 h-3 border-primary text-transparent [&_svg]:w-2 [&_svg]:h-2 [&_svg]:fill-black"
            />
            <Label
              htmlFor="check-payment"
              className="text-secondary-foreground text-base"
            >
              Check payments
            </Label>
          </div>
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem
              value="cash-on-delivery"
              id="cash-on-delivery"
              aria-label="radio"
              className="w-3 h-3 border-primary text-transparent [&_svg]:w-2 [&_svg]:h-2 [&_svg]:fill-black"
            />
            <Label
              htmlFor="cash-on-delivery"
              className="text-secondary-foreground text-base"
            >
              Cash on delivery
            </Label>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem
                value="paypal"
                id="paypal"
                aria-label="radio"
                className="w-3 h-3 border-primary text-transparent [&_svg]:w-2 [&_svg]:h-2 [&_svg]:fill-black"
              />
              <Label
                htmlFor="paypal"
                className="text-secondary-foreground text-base"
              >
                PayPal
              </Label>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                width={124}
                height={24}
                src={"/images/payment-card.webp"}
                alt="img"
              />
              <p className="text-secondary-foreground">What is paypal?</p>
            </div>
          </div>
        </RadioGroup>

        <div className="flex items-center gap-2.5 mt-10">
          <Checkbox
            id="terms"
            className="rounded-[4px] border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
          />
          <Label
            htmlFor="terms"
            className="lg:text-lg text-base font-normal text-secondary-foreground"
          >
            I have read and agree to the website{" "}
            <Link href={"/terms-conditions"} className="underline">
              terms and conditions
            </Link>
            <span className="text-primary-foreground">*</span>{" "}
          </Label>
        </div>

        <Button className="lg:py-3 w-full mt-10 lg:leading-[166%] lg:text-lg">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
