import clsx from "clsx"
import * as React from "react"



export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "flex h-12 w-full appearance-none rounded-md border border-input bg-transparent px-4 py-2 text-md shadow-sm transition-colors placeholder:text-gray-400 dark:bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

