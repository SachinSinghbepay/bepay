import { cn } from "../../lib/utils";
import React from 'react';

const MaxWidthWrapper = ({ className, children }) => {
    return (
        <section className={cn(
            "h-full mx-auto w-full  max-w-full md:max-w-[1308px] px-4 md:px-8 lg:px-3 ",
            className,
        )}>
            {children}
        </section>
    )
};

export default MaxWidthWrapper