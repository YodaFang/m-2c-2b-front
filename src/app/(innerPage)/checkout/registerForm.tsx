"use client";
import { Button } from "@/components/custom-ui/button";
import { Checkbox } from "@/components/custom-ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/custom-ui/dialog";
import { Input } from "@/components/custom-ui/input";
import { Label } from "@/components/custom-ui/label";
import Link from "next/link";
import { useState } from "react";
import SocialLoginButtons from "./socialLoginButtons";

const RegisterForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  let isLogin = false;
  const handleSingup = () => {
    if (isLogin) {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <div className="flex items-center gap-2.5 mt-5">
        <Checkbox
          checked={open}
          onCheckedChange={(value: boolean) =>
            setOpen(typeof value === "boolean" ? value : false)
          }
          id="extra"
          className="rounded-[4px] border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
        />
        <Label htmlFor="extra" className="text-base text-secondary-foreground">
          Create an account?
        </Label>
      </div>
      <DialogContent className="sm:max-w-[550px] justify-center max-h-[calc(100vh_-50px)] overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="border border-black bg-background p-7.5 max-w-[500px] rounded-lg">
          <p className="text-base text-gray-3-foreground mb-5">
            If you have shoppes with us before, please enter your details below.
            If you are a new customer, please proceed to the billing section.,
            please apply it below
          </p>
          <form action="">
            <Label
              htmlFor="name"
              className="text-gray-1-foreground text-base block mb-5"
            >
              Name<span className="text-red-400">*</span>
              <Input
                type="text"
                name="name"
                id="name"
                required
                className="py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5"
              />
            </Label>
            <Label
              htmlFor="register_email"
              className="text-gray-1-foreground text-base block mb-5"
            >
              Email<span className="text-red-400">*</span>
              <Input
                type="email"
                name="email"
                id="register_email"
                required
                className="py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5"
              />
            </Label>
            <Label
              htmlFor="password"
              className="text-gray-1-foreground text-base block mb-5"
            >
              Password<span className="text-red-400">*</span>
              <Input
                type="password"
                name="password"
                id="password"
                required
                className="py-3 px-5 border-[#999796] border-[1.5px] placeholder:text-[#999796] text-gray-1-foreground mt-2.5"
              />
            </Label>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="checkout-terms"
                className="rounded-none border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
              />
              <Label
                htmlFor="checkout-terms"
                className="text-base text-gray-1-foreground"
              >
                I agree to all{" "}
                <Link
                  href={"/terms-conditions"}
                  className="text-gray-1-foreground underline decoration-skip-ink-none text-underline-position"
                >
                  Terms & Conditions
                </Link>{" "}
              </Label>
            </div>
            <Button
              onClick={handleSingup}
              className="w-full lg:py-[11px] lg:text-lg mt-7.5"
            >
              Sing up
            </Button>
          </form>
          <SocialLoginButtons />
          <p className="text-center mt-5 text-base text-gray-1-foreground">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-secondary-foreground font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
