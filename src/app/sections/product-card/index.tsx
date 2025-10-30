import { AppLink } from "@/components/custom-ui/link"
import Thumbnail from "@/components/custom-ui//thumbnail"
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import PreviewAddToCart from "./add-to-cart"

export default async function ProductCard({
  product,
  isFeatured,
}: {
  product: Product
  isFeatured?: boolean
}) {
  if (!product) {
    return null
  }

  const discounted = product.price < product.org_price;


  const inventoryQuantity = 1;

  return (

    <div
      data-testid="product-wrapper"
      className="flex flex-col justify-between gap-2 relative w-full h-full p-2 overflow-hidden bg-white shadow-borders-base rounded-lg group-hover:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-shadow ease-in-out duration-150"
    >
      <AppLink href={`/product/${product.handle}`}>
        <div className="w-full">
          <Thumbnail
            thumbnail={product.thumbnail!}
            size="square"
            isFeatured={isFeatured}
          />
        </div>
        {discounted ? (
          <div
            className="bg-important px-2 text-important-foreground text-lg font-semibold inline capitalize absolute top-3 left-0"
          >
            -{product.discountPercentage!}%
          </div>
        ) : null}
        <div className="flex flex-col txt-compact-medium">
          <span className="text-neutral-600 text-xs">BRAND</span>
          <span className="text-ui-fg-base" data-testid="product-title">
            {product.title}
          </span>
        </div>
      </AppLink>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row gap-1">
            {discounted && (
              <span
                className="line-through text-sm items-center"
                data-testid="original-price"
              >
                {product.org_price} Lei
              </span>
            )}
            <span
              className={cn("text-neutral-950 font-medium text-xl ", {
                "text-important": discounted,
              })}
              data-testid="price"
            >
              {product.price} Lei
            </span>
            <span className="text-neutral-600 text-[0.7rem] self-end">Excl. VAT</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <span
              className={cn({
                "text-green-500": inventoryQuantity && inventoryQuantity > 50,
                "text-orange-500":
                  inventoryQuantity &&
                  inventoryQuantity <= 50 &&
                  inventoryQuantity > 0,
              })}
            >
              •
            </span>
            <span className="text-neutral-600 text-xs">
              {inventoryQuantity} left
            </span>
          </div>
        </div>
        <PreviewAddToCart product={product} />
      </div>
    </div>
  )
}
