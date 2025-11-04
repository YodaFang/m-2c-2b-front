"use client";

import { MinusCircle, PlusCircle, Trash2Icon } from "lucide-react";
import Thumbnail from "@/components/custom-ui/thumbnail";

interface CartItemProp {
    item: any;
    decreaseItem: (id: string) => void;
    increaseItem: (id: string) => void;
    deleteItem: (id: string) => void;
}

export const CartItem = ({ item, decreaseItem, increaseItem, deleteItem }: CartItemProp) => {
    const { id, unit_price: price, quantity, thumbnail, product_title: title, variant_title } = item;

    return (
        <div className="flex items-center py-2 border-b-[1px]">
            <div className="bg-white shrink-0">
                <Thumbnail
                    className="w-[90]"
                    thumbnail={thumbnail!}
                    size="square"
                    type="preview"
                />
            </div>
            <div className="flex flex-col shrink">
                <b className="text-sm leading-tight line-clamp-2">{title}</b>
                <div className="flex justify-between">
                    <span className="text-secondary-foreground text-sm">{variant_title}</span>
                    <span className="text-secondary-foreground text-sm">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2.5 px-1.5 py-1">
                        <button
                            className="text-neutral-500"
                            onClick={() => decreaseItem(id)}
                        >
                            <MinusCircle size="21" />
                        </button>
                        <input
                            value={quantity}
                            readOnly
                            className="outline-none max-w-4 text-center text-base"
                        />
                        <button
                            className="text-neutral-500"
                            onClick={() => increaseItem(id)}
                        >
                            <PlusCircle size="21" />
                        </button>
                    </div>
                    <button
                        onClick={() => deleteItem(id)}
                        className="text-neutral-500 text-sm underline"
                    >
                        <Trash2Icon size="18" />
                    </button>
                </div>
            </div>
        </div>
    );
}
