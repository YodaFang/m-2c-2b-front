import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
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
                <Spinner />
            ) : (
                children
            )}
        </Button>
    )
}
