import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom-ui/select";
import { Textarea } from "@/components/ui/textarea";
import AuthDialog from '@/app/sections/auth'

const CheckoutForm = () => {
  const submitForm = async (formData: FormData) => {
    "use server";
    console.log(formData);
  };

  return (
    <div>
      <div className="text-gray-1-foreground inline">
        Returning customer? <AuthDialog nullIfLogin><span className="pl-2 underline" >Click here to login</span> </AuthDialog>
      </div>
      <form action={submitForm} className="mt-6">
        <div className="flex flex-col gap-7.5">
          <div className="flex sm:flex-row flex-col justify-between gap-x-[22px] gap-y-7.5">
            <label
              htmlFor="email"
              className="text-gray-1-foreground w-full text-base"
            >
              Email address<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"email"}
                name={"email"}
                id="email"
                required
              />
            </label>
          </div>
          <div className='w-full flex flex-row items-center mt-3 text-base font-medium text-secondary-foreground '>
            <span className="whitespace-nowrap pr-3">Shiping Address</span>
            <span className='block w-full h-px bg-black'></span>
          </div>
          <div className="flex sm:flex-row flex-col justify-between gap-x-[22px] gap-y-7.5">
            <label
              htmlFor="first_name"
              className="text-gray-1-foreground w-full text-base"
            >
              name<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"text"}
                name={"first_name"}
                id="first_name"
                required
              />
            </label>
            <label
              htmlFor="phone"
              className="text-gray-1-foreground w-full text-base"
            >
              Phone<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"number"}
                name={"phone"}
                id="phone"
                required
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="town"
              className="text-gray-1-foreground w-full text-base"
            >
              Town / City<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"text"}
                name={"town"}
                id="town"
                required
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="street"
              className="text-gray-1-foreground w-full text-base"
            >
              Street address<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"text"}
                name={"street"}
                id="street"
                required
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="zip"
              className="text-gray-1-foreground w-full text-base"
            >
              ZIP Code<span className="text-red-400">*</span>
              <Input
                className={
                  "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5"
                }
                type={"text"}
                name={"zip"}
                id="zip"
                required
              />
            </label>
          </div>
          <label
            htmlFor="notes"
            className="text-gray-1-foreground w-full text-base"
          >
            Additional information (optional)
            <Textarea
              className={
                "border-[1.5px] border-[#999796] text-base text-gray-1-foreground font-medium py-3 mt-2.5 min-h-[140px]"
              }
              name={"notes"}
              id="notes"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
