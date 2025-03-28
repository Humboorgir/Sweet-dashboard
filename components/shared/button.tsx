import * as React from "react";
import Ripple from "@/components/shared/ripple";
import Link from "next/link";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md text-base font-medium
   ring-offset-background transition-colors focus-visible:outline-none 
   focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
   disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden`,
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral-100 hover:bg-primary/90",
        secondary: "bg-secondary-strong text-neutral-100 hover:bg-secondary-strong/80",
        outline: "border border-primary text-primary-soft",
        ghost: "hover:bg-primary/20 !px-2.5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 rounded-md px-2",
        lg: "h-11 rounded-md px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    rippleColor?: string;
    href?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, rippleColor, href, ...props }, ref) => {
    // use secondary itself as the rippleColor if variant == secondary and rippleColor
    // isn't specified
    if (variant == "secondary" && !rippleColor) rippleColor = "#7C72FF";

    const Component = href ? Link : "button";
    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        {...(href ? { href } : {})}
        // @ts-ignore
        ref={ref}
        {...props}>
        <Ripple rippleColor={rippleColor} />
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;
