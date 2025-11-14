"use server"

import { sdk } from "@/lib/medusaClient"
import { HttpTypes } from "@medusajs/types"
import {
  getAuthHeaders,
  removeAuthToken,
  setAuthToken,
  removeCartId
} from "./cookies"

export interface Customer extends HttpTypes.StoreCustomer { };


export const retrieveCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*employee, *orders",
      },
      headers: authHeaders,
    })
    .then(({ customer }) => customer)
    .catch(() => null)
}

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
}

export async function signup(data: Record<string, any>) {
  const email = data.email as string;
  const password = data.password as string;
  const customerForm = {
    email,
    first_name: data.first_name as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: email,
      password: password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      customHeaders
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)
    return { success: true, customer: createdCustomer };
  } catch (error: any) {
    console.log("error", error)
    return { success: false, message: error.message };
  }
}

export async function login(email: string, password: string) {
  try {
    return sdk.auth
      .login("customer", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string)
        return { success: true, message: "login successfully" };
      }).catch((err) => {
        return { success: false, message: err.message };
      });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function signout() {
  try {
    await sdk.auth.logout();
  } catch (error: any) {
    console.log("signout error: ");
    console.log(error.toString());
  }
  await removeAuthToken();
  await removeCartId();
}

export async function transferCart(cartId: string) {

  if (!cartId) {
    return
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart.transferCart(cartId, {}, headers)
    .then(async ({ cart }) => {
      return cart;
    });
}

export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async () => {
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
