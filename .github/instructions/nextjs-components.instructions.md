---
description: "Use when planning, creating, updating, or validating Next.js components, layouts, or pages in src/app or src/components. Covers server vs client components, shadcn/ui from src/components/ui, semantic Tailwind tokens from globals.css, compound Card composition, and the cn class helper."
applyTo: "src/app/**/*.tsx, src/components/**/*.tsx"
---
# Next.js components, layouts and pages

## Rules

- Prefer Server Components. Add `"use client"` only for state, effects, event handlers, or browser-only hooks (e.g. `usePathname`). Keep client parts small and at the leaves.
- Reuse components from `src/components/ui/` for repeatable layout and interactive elements before writing new markup.
- Missing component: search with `mcp_shadcn_get_add_command_for_items` or the shadcn registry tools, then ask the user whether to install it or create it manually. Do not install or create it without confirmation.
- Use semantic Tailwind tokens from `src/app/globals.css` (e.g. `bg-card`, `text-muted-foreground`). Do not hardcode colors (`bg-gray-100`, `text-blue-500`, `#fff`).
- For complex layouts, compose compound components (`Card` + `CardHeader` + `CardContent`) instead of adding configuration props.
- Class names: `import { cn } from "cn"` (as in `src/components/ui/*.tsx`; `src/lib/utils.ts` re-exports it). Merge user classes last: `cn("base-classes", className)`.
- Every component accepts `className` and spreads remaining props.
- Button is built on Base UI: there is no `asChild`. Use `render`: `<Button render={<Link href="/cart" />} nativeButton={false}>Cart</Button>`.
- Never nest a `Button` inside a Trigger. Use `<DropdownMenuTrigger render={<Button />}>`.
- `DropdownMenuLabel` must sit inside `DropdownMenuGroup`.
- Next.js 16 with `cacheComponents`: dynamic APIs (`params`, `searchParams`, `cookies()`, `usePathname`) must be wrapped in `<Suspense>`. Put `await params` in an inner component. Read `node_modules/next/dist/docs/` before writing Next-specific code.
- Validate with `npx tsc --noEmit`. Run `npm run build` for prerender and Suspense errors, since `npm run dev` does not report them.

## Cheatsheet: tokens (globals.css)

| Purpose | Classes |
|---------|---------|
| Page surface | `bg-background text-foreground` |
| Card / popover | `bg-card text-card-foreground`, `bg-popover text-popover-foreground` |
| Muted text / area | `text-muted-foreground`, `bg-muted` |
| Primary action | `bg-primary text-primary-foreground` |
| Secondary | `bg-secondary text-secondary-foreground` |
| Hover / accent | `bg-accent text-accent-foreground` |
| Borders, inputs, focus | `border-border`, `border-input`, `ring-ring` |
| Status | `text-destructive` `bg-destructive/10`, `text-success` `bg-success/10`, `bg-warning text-warning-foreground`, `bg-info text-info-foreground` |
| Surface | `bg-surface text-on-surface` |
| Sidebar | `bg-sidebar text-sidebar-foreground`, `bg-sidebar-accent text-sidebar-accent-foreground` |
| Radius | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` |
| Elevation | `shadow-elevation-1` … `shadow-elevation-5` |
| Fonts | `font-sans`, `font-mono`, `font-heading` |

## Cheatsheet: components (src/components/ui/)

- Available: `alert-dialog`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `dialog`, `dropdown-menu`, `field`, `input`, `label`, `navigation-menu`, `pagination`, `select`, `separator`, `sheet`, `skeleton`, `sonner`, `table`, `tabs`, `textarea`.
- `Button` variant: `default`, `outline`, `secondary`, `ghost`, `destructive`, `success`, `link`. Size: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
- `Badge` variant: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
- `Field` orientation: `vertical` (default), `horizontal`, `responsive`.
- `TabsList` variant: `default`, `line`.
- `Card` compound: `Card` (`size="default" | "sm"`) > `CardHeader` (`CardTitle`, `CardDescription`, `CardAction`), `CardContent`, `CardFooter`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction><Button variant="ghost" size="icon-sm">...</Button></CardAction>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```
