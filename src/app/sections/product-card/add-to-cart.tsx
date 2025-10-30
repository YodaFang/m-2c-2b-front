"use client"
import { useState } from "react"
import { LoadingButton } from "@/components/custom-ui/loading-button"
import { ShoppingBag } from "@/lib/icon"
import { Product } from "@/data/products";

const PreviewAddToCart = ({
  product,
}: {
  product: Product
}) => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product?.variants?.[0]?.id) return null

    setIsAdding(true)


    setIsAdding(false)
  }
  return (
    <LoadingButton
      className="rounded-full p-3 border-none shadow-none"
      onClick={(e) => {
        e.preventDefault()
        handleAddToCart()
      }}
      isLoading={isAdding}
    >
      <ShoppingBag fill="#fff" />
    </LoadingButton>
  )
}

export default PreviewAddToCart
