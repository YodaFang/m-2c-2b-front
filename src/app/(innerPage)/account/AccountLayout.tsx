'use client'

import { useState } from "react"
import { PackageIcon, LayoutDashboard, MapPinHouseIcon, LogOutIcon, TicketXIcon, RotateCcwKeyIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "个人信息", href: "/profile" },
  { name: "我的地址", href: "/profile/address" },
  { name: "我的订单", href: "/profile/orders" },
  { name: "修改密码", href: "/profile/password" },
]

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="container flex flex-row">
      {/* 左侧侧边菜单（桌面端显示） */}
      <aside className="flex-col py-3 w-62 border-r">
        <Item variant="default" className="flex-col">
          <ItemMedia className="w-full">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent className="w-full">
            <ItemDescription className="text-center text-base text-primary font-bold">Test</ItemDescription>
            <ItemDescription className="text-center">yodafang0121@gmail.com</ItemDescription>
          </ItemContent>
        </Item>
        <Separator className="mb-3" />
        <Item size="sm" className="bg-white" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <LayoutDashboard className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Overview</ItemTitle>
            </ItemContent>
          </a>
        </Item>
        <Item size="sm" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <PackageIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Orders</ItemTitle>
            </ItemContent>
          </a>
        </Item>
        <Item size="sm" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <MapPinHouseIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Addresses</ItemTitle>
            </ItemContent>
          </a>
        </Item>
        <Item size="sm" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <TicketXIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Returns</ItemTitle>
            </ItemContent>
          </a>
        </Item>
        <Separator className="my-2" />
        <Item size="sm" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <RotateCcwKeyIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Change Password</ItemTitle>
            </ItemContent>
          </a>
        </Item>
        <Item size="sm" asChild>
          <a href="#" onClick={() => {}}>
            <ItemMedia>
              <LogOutIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sign Out</ItemTitle>
            </ItemContent>
          </a>
        </Item>
      </aside>
      {/* 右侧主要内容区 */}
      <main className="flex-col p-6 md:ml-0">
        {children}
      </main>
    </div>
  )
}
