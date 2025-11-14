'use server'

import { sdk } from "@/lib/medusaClient"
import { HttpTypes } from "@medusajs/types"
import { redirect } from "next/navigation"
import { getAuthHeaders, getCartId, setCartId } from "./cookies"

export async function retrieveCart(cartId?: string) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  if(!cartId){
    cartId = await getCartId();
  }

  if(!cartId){
    return null;
  }

  return sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${cartId}`, {
      method: "GET",
      query: {
        fields:
          "*items, +items.thumbnail, +items.metadata, *promotions, *customer, +completed_at",
      },
      headers,
    })
    .then(({ cart }) => {
      return mapMedusaCartToCart(cart);
    })
    .catch(() => {
      return null;
    })
}

export async function createCart(items?: AddCartItem[]) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const cart = await sdk.store.cart.create({ items: items ?? [] }, {
    fields:
      "*items, +items.thumbnail, +items.metadata, *promotions, *customer, +completed_at"
  }, headers).then(async ({ cart }) => {
    await setCartId(cart.id);
    return cart;
  });
  return mapMedusaCartToCart(cart);
}


export async function updateCart(cartId: string, data: HttpTypes.StoreUpdateCart) {
  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(async ({ cart }) => {
      return mapMedusaCartToCart(cart);
    })
}

export async function addItemToCart(cartId: string, {
  variant_id,
  quantity,
}: AddCartItem) {
  if (!variant_id) {
    throw new Error("Missing variant ID when adding to cart")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return await sdk.store.cart
    .createLineItem(
      cartId,
      {
        variant_id,
        quantity,
      },
      {},
      headers
    )
    .then(async ({ cart }) => {
      return mapMedusaCartToCart(cart);
    })
}

export async function addToCartBulk(cartId: string, items: AddCartItem[]) {
  const headers = {
    "Content-Type": "application/json",
    ...(await getAuthHeaders()),
  } as Record<string, any>

  if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] =
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}/line-items/bulk`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ line_items: items }),
    }
  )
    .then(async () => {
    })
}

export async function updateLineItem(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .then(async () => {
    })
}

export async function deleteLineItem(cartId: string, lineId: string) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, {}, headers)
    .then(async () => {
    })
}

export async function emptyCart(cartId: string) {
  const cart = await retrieveCart(cartId)
  if (!cart) {
    throw new Error("No existing cart found when emptying cart")
  }

  for (const item of cart.items || []) {
    await deleteLineItem(cart.id, item.id)
  }
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(async () => {
    })
}

export async function initiatePaymentSession(
  cart: any,
  data: {
    provider_id: string
    context?: Record<string, unknown>
  }
) {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then(async (resp) => {
      return resp
    })
}

export async function applyPromotions(cartId: string, codes: string[]) {
  if (!cartId) {
    throw new Error("No existing cart found")
  }

  await updateCart(cartId, { promo_codes: codes })
    .then(async () => {
    })
}


// TODO: Pass a POJO instead of a form entity here
export async function setShippingAddress(cartId: string, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses")
    }
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses")
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      // customer_id: customer?.id,
      email: formData.get("email"),
    } as any
    await updateCart(cartId, data)
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function setBillingAddress(cartId: string, formData: FormData) {
  try {
    if (!cartId) {
      throw new Error("No existing cart found when setting billing address")
    }

    const data = {
      billing_address: {
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        company: formData.get("billing_address.company"),
        postal_code: formData.get("billing_address.postal_code"),
        city: formData.get("billing_address.city"),
        country_code: formData.get("billing_address.country_code"),
        province: formData.get("billing_address.province"),
        phone: formData.get("billing_address.phone"),
      },
    } as any

    await updateCart(cartId, data)
  } catch (e: any) {
    return e.message
  }
}

export async function setContactDetails(
  cartId: string,
  formData: FormData
) {
  try {
    if (!cartId) {
      throw new Error("No existing cart found when setting contact details")
    }
    const data = {
      email: formData.get("email") as string,
      metadata: {
        invoice_recipient: formData.get("invoice_recipient"),
        cost_center: formData.get("cost_center"),
        requisition_number: formData.get("requisition_number"),
        door_code: formData.get("door_code"),
        notes: formData.get("notes"),
      },
    }
    await updateCart(cartId, data)
  } catch (e: any) {
    return e.message
  }
}

export async function placeOrder(
  cartId: string
): Promise<HttpTypes.StoreCompleteCartResponse> {
  if (!cartId) {
    throw new Error("No existing cart found when placing an order")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await sdk.store.cart
    .complete(cartId, {}, headers)

  if (response.type === "cart") {
    return response
  }

  redirect(
    `/${response.order.shipping_address?.country_code?.toLowerCase()}/order/confirmed/${response.order.id
    }`
  )
}

function mapMedusaCartToCart(medusaCart: HttpTypes.StoreCart): Cart {
  return {
    id: medusaCart.id,
    customer_id: medusaCart.customer_id,
    email: medusaCart.email,
    currency_code: medusaCart.currency_code,
    shipping_address: medusaCart.shipping_address
      ? mapMedusaAddress(medusaCart.shipping_address)
      : undefined,
    billing_address: medusaCart.billing_address
      ? mapMedusaAddress(medusaCart.billing_address)
      : undefined,
    items: (medusaCart.items || []).map(mapMedusaLineItemToCartItem),
    shipping_methods: (medusaCart.shipping_methods || []).map(mapMedusaShippingMethod),
    payment_collection: medusaCart.payment_collection
      ? mapMedusaPaymentCollection(medusaCart.payment_collection)
      : undefined,
    item_total: medusaCart.item_total,
    subtotal: medusaCart.subtotal,
    total: medusaCart.total,
    tax_total: medusaCart.tax_total,
    discount_total: medusaCart.discount_total,
    shipping_total: medusaCart.shipping_total,
    gift_card_total: medusaCart.gift_card_total,
  };
}

function mapMedusaAddress(addr: HttpTypes.StoreCartAddress): Address {
  return {
    id: addr.id,
    first_name: addr.first_name,
    last_name: addr.last_name,
    phone: addr.phone,
    company: addr.company,
    address_1: addr.address_1 ?? "",
    address_2: addr.address_2,
    city: addr.city ?? "",
    province: addr.province,
    postal_code: addr.postal_code ?? "",
  };
}

function mapMedusaLineItemToCartItem(item: HttpTypes.StoreCartLineItem): CartItem {
  return {
    id: item.id,
    quantity: item.quantity,
    product_id: item.product?.id ?? "",
    product_title: item.title,
    product_subtitle: item.subtitle,
    product_handle: item.product_handle ?? "",
    thumbnail: item.thumbnail ?? "",
    variant_id: item.variant_id,
    variant_title: item.variant_title,
    variant_sku: item.variant_sku ?? "",
    unit_price: item.unit_price,
    total: item.total ?? 0,
    subtotal: item.subtotal ?? 0,
    tax_total: item.tax_total ?? 0,
    discount_total: item.discount_total,
    requires_shipping: item.requires_shipping,
    is_discountable: item.is_discountable,
    is_tax_inclusive: item.is_tax_inclusive,
    tax_lines: (item.tax_lines || []).map(mapMedusaTaxLine),
    adjustments: (item.adjustments || []).map(mapMedusaAdjustment),
  };
}

function mapMedusaTaxLine(tax: any): TaxLine {
  return {
    id: tax.id,
    description: tax.description,
    rate: tax.rate,
    code: tax.code,
    total: tax.total,
    subtotal: tax.subtotal,
  };
}

function mapMedusaAdjustment(adj: any): Adjustment {
  return {
    id: adj.id,
    code: adj.code,
    amount: adj.amount,
    description: adj.description,
    promotion_id: adj.promotion_id,
    provider_id: adj.provider_id,
  };
}

function mapMedusaShippingMethod(method: any): ShippingMethod {
  return {
    id: method.id,
    name: method.name,
    description: method.description,
    amount: method.amount,
    is_tax_inclusive: method.is_tax_inclusive,
    shipping_option_id: method.shipping_option_id,
    tax_lines: (method.tax_lines || []).map(mapMedusaTaxLine),
    adjustments: (method.adjustments || []).map(mapMedusaAdjustment),
    total: method.total,
    subtotal: method.subtotal,
    tax_total: method.tax_total,
  };
}

function mapMedusaPaymentCollection(pc: any): PaymentCollection {
  return {
    id: pc.id,
    currency_code: pc.currency_code,
    amount: pc.amount,
    authorized_amount: pc.authorized_amount,
    captured_amount: pc.captured_amount,
    refunded_amount: pc.refunded_amount,
    status: pc.status,
    payment_providers: pc.payment_providers,
    payments: pc.payments,
    payment_sessions: pc.payment_sessions,
  };
}

export interface AddCartItem {
  variant_id: string,
  quantity: number,
}

export interface Cart {
  id: string,
  customer_id?: string
  email?: string
  currency_code?: string
  shipping_address?: Address
  billing_address?: Address
  items: CartItem[]
  shipping_methods: ShippingMethod[]
  payment_collection?: PaymentCollection
  created_at?: string
  updated_at?: string

  // totals
  item_total: number
  subtotal: number
  total: number
  tax_total: number
  discount_total?: number
  shipping_total?: number
  gift_card_total?: number
  promotions?: Promotion[]
}

export interface PaymentProvider {
  id: string
  is_enabled: boolean
}

export interface Address {
  id?: string
  first_name?: string
  last_name?: string
  phone?: string
  company?: string
  address_1: string
  address_2?: string
  city: string
  province?: string
  postal_code: string
}

export interface CartItem {
  id: string
  quantity: number
  product_id: string
  product_title: string
  product_subtitle?: string
  product_handle: string
  thumbnail: string
  variant_id?: string
  variant_title?: string
  variant_sku?: string

  unit_price: number
  total: number
  subtotal: number
  tax_total: number
  discount_total?: number

  requires_shipping: boolean
  is_discountable?: boolean
  is_tax_inclusive?: boolean

  tax_lines?: TaxLine[]
  adjustments?: Adjustment[]
}

export interface TaxLine {
  id: string
  description?: string
  rate: number
  code?: string
  total: number
  subtotal: number
}

export interface Adjustment {
  id: string
  code: string
  amount: number
  description?: string
  promotion_id?: string
  provider_id?: string
}

export interface ShippingMethod {
  id: string
  name: string
  description?: string
  amount: number
  is_tax_inclusive: boolean
  shipping_option_id?: string

  tax_lines?: TaxLine[]
  adjustments?: Adjustment[]

  total: number
  subtotal: number
  tax_total: number
}

export interface PaymentCollection {
  id: string
  currency_code: string
  amount: number
  authorized_amount: number
  captured_amount: number
  refunded_amount: number
  status: 'pending' | 'authorized' | 'canceled' | 'completed'

  payment_providers?: { id: string }[]
  payments?: Payment[]
  payment_sessions?: PaymentSession[]
}

export interface Payment {
  id: string
  amount: number
  authorized_amount: number
  captured_amount: number
  refunded_amount: number
  currency_code: string
  provider_id: string
}

export interface PaymentSession {
  id: string
  amount: number
  currency_code: string
  provider_id: string
  status: 'pending' | 'authorized' | 'canceled'
}

export interface Promotion {
  id: string
  code: string
  is_automatic: boolean
  application_method: PromotionMethod
}

export interface PromotionMethod {
  type: 'fixed' | 'percentage'
  value: string
  currency_code?: string
}
