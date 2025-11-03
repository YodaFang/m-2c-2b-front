"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps, toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-400" />,
        error: <TriangleAlertIcon className="size-8 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-gray-500" />,
      }}
      {...props}
    />
  )
}

export { Toaster, toast }

export const showErrorToast = (title: string, content?: string) => {
  return toast.error(
    <div className="flex flex-col px-6">
      <div className="text-lg font-bold text-center">{title}</div>
      {content && <div className="text-base opacity-90 text-center">{content}</div>}
    </div>,
    {
      position: "top-center",
      duration: 10000,
      dismissible: true,
      style: {
        fontSize: "1.1rem",
        fontWeight: "600",
        padding: "1rem 1.5rem",
        border: "2px solid #ef4444",
        backgroundColor: "#fee2e2",
        color: "#991b1b",
        minWidth: "320px",
      },
    }
  );
};


type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  duration?: number;
};

export function showConfirmToast(options: ConfirmOptions = {}): Promise<boolean> {
  const {
    title = "Please Confirm",
    description = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    duration = Infinity,
  } = options;

  return new Promise<boolean>((resolve) => {
    // 使用 Sonner 的自定义内容功能
    const toastId = toast.custom(
      (id) => (
        <div className="flex justify-center items-center fixed inset-0 bg-black/40 z-[9999]">
          <AlertDialog open onOpenChange={() => {
            toast.dismiss(id);
            resolve(false);
          }}>
            <AlertDialogContent className="max-w-sm mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                {description && (
                  <AlertDialogDescription asChild>
                    <div
                      className="text-base text-muted-foreground text-center mt-2 space-y-2"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter className="flex justify-end gap-3 mt-4">
                <AlertDialogCancel
                  onClick={() => {
                    toast.dismiss(id);
                    resolve(false);
                  }}
                >
                  {cancelText}
                </AlertDialogCancel>
                <AlertDialogAction
                  className={
                    variant === "danger"
                      ? "bg-destructive text-white hover:bg-destructive/90"
                      : "bg-primary text-white hover:bg-primary/90"
                  }
                  onClick={() => {
                    toast.dismiss(id);
                    resolve(true);
                  }}
                >
                  <b>{confirmText}</b>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
      {
        position: "top-center", // 居中
        duration,
      }
    );
  });
}

