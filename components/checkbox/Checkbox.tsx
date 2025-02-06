import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={`
            peer
            h-4
            w-4
            shrink-0
            rounded-sm
            border
            border-primary
            ring-offset-background
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
            data-[state=checked]:bg-primary
            data-[state=checked]:text-primary-foreground
            ${className}
          `}
          {...props}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
