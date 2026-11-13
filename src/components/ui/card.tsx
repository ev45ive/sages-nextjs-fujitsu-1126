import * as React from "react"
import { cn } from "cn"

/**
 * Card is the main container for compound card layouts.
 *
 * @param props.size - Visual density of the card. `"default"` or `"sm"`.
 * @param props.className - Additional classes merged into the root element.
 *
 * @example
 * ```jsx
 * // Basic card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Content goes here.</p>
 *   </CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```jsx
 * // Card with header action and footer
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Notifications</CardTitle>
 *     <CardDescription>You have 3 unread messages.</CardDescription>
 *     <CardAction>
 *       <button>Mark all read</button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Message list...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <button>View all</button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @example
 * ```jsx
 * // Small card with image on top
 * <Card size="sm">
 *   <img src="/cover.jpg" alt="Cover" />
 *   <CardHeader>
 *     <CardTitle>Small Card</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Compact layout.</p>
 *   </CardContent>
 * </Card>
 * ```
 *
 * @example
 * ```jsx
 * // Minimal card with only content
 * <Card className="max-w-sm">
 *   <CardContent>
 *     <p>Just some content.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
