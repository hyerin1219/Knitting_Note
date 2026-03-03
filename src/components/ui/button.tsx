import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap  shadow-[2px_2px_6px_rgba(0,0,0,0.1)] cursor-pointer', {
    variants: {
        variant: {
            default: 'bg-[#8FD3C3] rounded-lg ',
        },
        size: {
            default: 'text-white p-2',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp: React.ElementType = asChild ? Slot : 'button';

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
