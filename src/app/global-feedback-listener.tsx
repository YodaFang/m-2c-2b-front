'use client'

import { useCallback } from 'react';
import { useEvent, ActionEvents } from "@/hooks/use-event";
import { toast, showErrorToast } from "@/components/custom-ui/toast";
import { hideLoadingOverlay, showLoadingOverlay } from "@/components/custom-ui/loading-overlay";
import { CheckCircle2Icon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Thumbnail from "@/components/custom-ui/thumbnail";

/**
 * 根布局中的全局事件监听器
 * 负责将业务 Hook 发射的事件转换为 UI 反馈（Toast, Overlay等）
 */
export function GlobalFeedbackListener() {

  // --- 1. Customer/Auth Events ---
  const handleShowLoading = useCallback((eventName: string) => {
    console.log("GlobalFeedbackListener >>>>>>>>> handleShowLoading >>>>>>>>>>> eventName", eventName)
    showLoadingOverlay();
  }, []);
  useEvent(['customer:login-start', 'customer:logout-start', 'customer:signup-start', 'cart:create-start'], handleShowLoading);
  const handleHideLoading = useCallback((eventName: string) => {
    hideLoadingOverlay();
  }, []);
  useEvent(['customer:login-end', 'customer:logout-start', 'customer:signup-start', 'cart:create-start'], handleHideLoading);

  // 监听登录成功
  const handleLoginSuccess = useCallback(() => {
    toast.success(<><b>Sign In Sucessfully</b><br /><p>Welcome back!</p></>);
  }, []);
  useEvent('customer:login-success', handleLoginSuccess);

  // 监听登录失败
  const handleLoginFailure = useCallback((_: string, { message }: ActionEvents['customer:login-failure']) => {
    showErrorToast("Login Failed", message || 'Please check your email and password.');
  }, []);
  useEvent('customer:login-failure', handleLoginFailure);

  // 监听登出成功
  const handleLogoutSuccess = useCallback(() => {
    toast.success("Signed out successfully.");
  }, []);
  useEvent('customer:logout-success', handleLogoutSuccess);

  // 监听登出失败
  // const handleLogoutFailure = useCallback(({ message }: ActionEvents['customer:logout-failure']) => {
  //   showErrorToast("Logout Failed", message);
  // }, []);
  // useEvent('customer:logout-failure', handleLogoutFailure);

  // 监听注册成功
  const handleSignupSuccess = useCallback(() => {
    toast.success("Account created successfully! Please sign in.");
  }, []);
  useEvent('customer:signup-success', handleSignupSuccess);

  // 监听注册失败
  const handleSignupFailure = useCallback((_: string, { message }: ActionEvents['customer:signup-failure']) => {
    showErrorToast("Sign Up Failed", message);
  }, []);
  useEvent('customer:signup-failure', handleSignupFailure);

  // --- 2. Cart Events ---

  // 监听添加购物车成功
  const handleItemAdded = useCallback((_: string, { product, variant }: ActionEvents['cart:add-success']) => {
    if (product && variant) {
      showAddCartToast(product, variant);
    } else {
      toast.success("Item added successfully.");
    }
  }, []);
  useEvent('cart:add-success', handleItemAdded);

  const handleItemDeleted = useCallback(() => {
    toast.success('Item Removed Successfully');
  }, []);
  useEvent('cart:del-success', handleItemDeleted);


  // 如果有其他的事件，继续在这里添加 useEvent 监听即可。

  return null; // 这是一个无渲染组件
}


/**
 * 您的 showAddCartToast 逻辑（可以保持独立，但为了完整性放在这里）
 */
function showAddCartToast(p: any, v: any) {
  return toast.custom(
    (id) => (
      <Card className="bg-emerald-50 lg:w-[300px] w-full px-0 mx-0 py-2 gap-3">
        <CardHeader className="w-full px-2 gap-1">
          <CardTitle className="w-full flex flex-row justify-center text-base text-emerald-600"><CheckCircle2Icon size="23px" className="mx-1" /> Successfully Added</CardTitle>
          <CardDescription className="w-full px-0 py-1 mx-0 border-y-[1.5px]">
            <div className="flex gap-2 p-0">
              <div className="shrink-0">
                <Thumbnail
                  className="h-[54px]"
                  thumbnail={p.thumbnail!}
                  size="square"
                  type="preview"
                />
              </div>
              <div className="flex flex-col shrink">
                <b className="text-sm leading-tight line-clamp-2">{p.title}</b>
                <span className="text-secondary-foreground text-sm">{v.title}</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full px-2 mx-0 gap-3">
          <div className='w-full flex flex-row gap-2'>
            <button className='border-[1.5px] border-[#999796] flex justify-center items-center w-full py-1 rounded-lg'>
              <span className='text-secondary-foreground text-base font-semibold'>View Cart</span>
            </button>
            <button className='bg-primary border-[1.5px] border-[#999796] flex justify-center items-center w-full py-1 rounded-lg'>
              <span className='text-primary-foreground text-base font-semibold'>Checkout</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    ),
    {
      duration: 3000,
      closeButton: true,
    }
  );
}
