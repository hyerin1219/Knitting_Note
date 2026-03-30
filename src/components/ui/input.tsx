import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva('w-20 py-1 px-3 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:ring-[#8FD3C3]/40', {
    variants: {
        variant: {
            default: '',
            full: 'flex-1',
            readyOnly: 'cursor-default pointer-events-none',
        },
        size: {
            default: '',
            // sm: 'h-8 text-sm',
            // lg: 'h-12 text-base',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type InputProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>;

function Input({ className, variant, size, type = 'text', ...props }: InputProps) {
    return <input type={type} className={cn(inputVariants({ variant, size }), className)} {...props} />;
}
export { Input, inputVariants };
