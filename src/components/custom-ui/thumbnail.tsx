
import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

type ThumbnailProps = {
  thumbnail: string
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  type?: "preview" | "full"
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
  type,
}) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className, {
        "aspect-[11/14]": isFeatured,
        "aspect-[9/16]": !isFeatured && size !== "square",
        "aspect-[1/1]": size === "square",
        "w-[180px]": size === "small",
        "w-[290px]": size === "medium",
        "w-[440px]": size === "large",
        "w-full": size === "full",
      })}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={thumbnail} size={size} type={type} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  type,
}: Pick<ThumbnailProps, "size" | "type"> & {
  image: string
}) => {
  return (
    <Image
      src={image}
      alt="Thumbnail"
      className={cn("absolute inset-0 object-contain", {
        "p-4": type === "full",
        "p-2": type === "preview",
      })}
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  );
}

export default Thumbnail
