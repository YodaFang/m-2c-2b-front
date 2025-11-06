'use client'

import { AccountLayout } from "./AccountLayout"
import useApp from "@/hooks/use-app"

export default function ProfilePage() {
    const { customer } = useApp();
    if (!customer) {
        return null;
    }
    return (
        <AccountLayout>
            <h1 className="text-xl font-semibold mb-4">Hello {customer.first_name}</h1>
            <p>这里显示用户资料</p>
        </AccountLayout>
    )
}
