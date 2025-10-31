import { AppLink } from "@/components/custom-ui/link"
import Thumbnail from "@/components/custom-ui//thumbnail"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product } from "@/api/products";
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

  return (
    <div
      data-testid="product-wrapper"
      className="flex flex-col justify-between gap-1 relative w-full h-full p-2 overflow-hidden border bg-white shadow-borders-base rounded-lg hover:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-shadow ease-in-out duration-150"
    >
      <AppLink href={`/product/${product.handle}`} underline>
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
        <span className="text-lg leading-tight line-clamp-2" data-testid="product-title">
          {product.title}
        </span>
      </AppLink>
      <span className="text-neutral-600 text-xs line-clamp-3" data-testid="product-subtitle">
        {product.subtitle}
      </span>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row gap-1">
            {discounted && (
              <span
                className="line-through text-sm"
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
          </div>
        </div>
        <PreviewAddToCart product={product} />
      </div>
    </div>
  )
}
