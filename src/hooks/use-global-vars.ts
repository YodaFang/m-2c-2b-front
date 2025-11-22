import { atom, useAtom } from "jotai";

const sidebarCartOpenAtom = atom(false);

export function useSidebarCartVar() {
  const [sidebarCartOpen, setSidebarCartOpen] = useAtom(sidebarCartOpenAtom);

  return { sidebarCartOpen, setSidebarCartOpen }
}

type AuthDialogMode = "normal" | "checkout";
const authDialogOpenAtom = atom(false);
const authDialogModeAtom = atom<AuthDialogMode>('normal');

export function useAuthDialogVars() {
  const [authDialogOpen, setAuthDialogOpen] = useAtom(authDialogOpenAtom);
  const [authDialogMode, setAuthDialogMode] = useAtom(authDialogModeAtom);

  const showNomralAuthDialog = () => {
    setAuthDialogMode("normal");
    setAuthDialogOpen(true);
  }

  const showCheckoutAuthDialog = () => {
    setAuthDialogMode("checkout");
    setAuthDialogOpen(true);
  }

  return { authDialogOpen, authDialogMode, setAuthDialogOpen, showNomralAuthDialog, showCheckoutAuthDialog }
}

