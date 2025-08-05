import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CustomButton = React.forwardRef(
  (
    {
      className,
      href,
      variant = "primary",
      target = "_blank", // opens in new tab by default
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-[10px] shadow";
    const primaryStyles =
      "bg-white text-black cursor-pointer rounded-[3px] border-[1px] font-bold hover:bg-transparent text-[16px] hover:text-white hover:border-[1px] border-white";
    const outlineStyles =
      "bg-transparent text-white cursor-pointer font-bold rounded-[3px] hover:bg-white text-[16px] hover:text-black border-[1px] border-white";

    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        <Button
          className={cn(
            baseStyles,
            variant === "primary" ? primaryStyles : outlineStyles,
            className
          )}
          ref={ref}
          {...props}
        />
      </Link>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
