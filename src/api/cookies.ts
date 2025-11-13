"use server"

import { cookies as nextCookies } from "next/headers"

export const getAuthHeaders = async (): Promise<
  { authorization: string } | null
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (token) {
      return { authorization: `Bearer ${token}` }
    }

    return null;
  } catch (error) {
    return null;
  }
}

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()

  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeAuthToken = async () => {
  const cookies = await nextCookies()

  cookies.delete("_medusa_jwt")
}

/**
 * 获取购物车 ID
 */
export const getCartId = async (): Promise<string | undefined> => {
  try {
    const cookies = await nextCookies()
    return cookies.get("_cart_id")?.value ?? undefined
  } catch {
    return undefined
  }
}

/**
 * 设置购物车 ID
 */
export const setCartId = async (cartId: string) => {
  const cookies = await nextCookies()

  cookies.set("_cart_id", cartId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30天
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

/**
 * 删除购物车 ID
 */
export const removeCartId = async () => {
  const cookies = await nextCookies()
  cookies.delete("_cart_id")
}