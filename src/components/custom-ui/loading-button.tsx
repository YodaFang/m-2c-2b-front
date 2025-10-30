import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
    isLoading?: boolean
}

export function LoadingButton({
    children,
    isLoading = false,
    className,
    ...props
}: LoadingButtonProps) {
    return (
        <Button disabled={isLoading} className={cn("relative", className)} {...props}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                children
            )}
        </Button>
    )
}
