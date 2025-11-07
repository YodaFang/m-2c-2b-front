'use client'

import { useState } from "react"
import { PackageIcon, LayoutDashboard, MapPinHouseIcon, LogOutIcon, TicketXIcon, RotateCcwKeyIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { LoginRegister } from "@/app/sections/auth/login-register"
import useApp from "@/hooks/use-app"

export default function Account() {
  const { customer } = useApp();
  if (customer) {
    return (
      <div className="container flex flex-row">
        <aside className="flex-col w-62 border-r">
          <Item variant="default" className="flex-col gap-1">
            <ItemMedia className="w-full">
              <Avatar className="size-12">
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
            <a href="#" onClick={() => { }}>
              <ItemMedia>
                <LayoutDashboard className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Overview</ItemTitle>
              </ItemContent>
            </a>
          </Item>
          <Item size="sm" asChild>
            <a href="#" onClick={() => { }}>
              <ItemMedia>
                <PackageIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Orders</ItemTitle>
              </ItemContent>
            </a>
          </Item>
          <Item size="sm" asChild>
            <a href="#" onClick={() => { }}>
              <ItemMedia>
                <MapPinHouseIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Addresses</ItemTitle>
              </ItemContent>
            </a>
          </Item>
          <Item size="sm" asChild>
            <a href="#" onClick={() => { }}>
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
            <a href="#" onClick={() => { }}>
              <ItemMedia>
                <RotateCcwKeyIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Change Password</ItemTitle>
              </ItemContent>
            </a>
          </Item>
          <Item size="sm" asChild>
            <a href="#" onClick={() => { }}>
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
        <div className="flex-col p-6">
          <h1 className="text-xl font-semibold mb-4">Hello {customer?.first_name}</h1>
          <p>这里显示用户资料</p>
        </div>
      </div>
    )
  } else {
    return <div className="container"> <LoginRegister className="max-w-xl mt-10 mx-auto" /></div>
  }
}
