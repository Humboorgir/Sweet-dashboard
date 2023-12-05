import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, placeholder, disabled, maxLength = 140, ...props }, ref) => {
    return (
      <div className={cn("relative min-h-[120px] w-[700px] max-w-[80vw]", className)}>
        <textarea
          className="absolute flex top-0 left-0 bottom-0 right-0 rounded-md bg-neutral-900 px-3 py-3
        ring-offset-neutral-900 focus-visible:outline-none border disabled:cursor-not-allowed 
        disabled:opacity-50 ring-offset-3border-3 border-secondary/60 transition-[border]
         placeholder:text-transparent peer resize-none focus:border-secondary"
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <label
          className="absolute peer-placeholder-shown:top-2
          peer-placeholder-shown:left-2 peer-placeholder-shown:text-base
          peer-focus:!-top-1.5 peer-focus:!left-[8px] peer-focus:!text-xs peer-focus:!text-secondary
           bg-neutral-900 px-1 transition-all duration-[150ms] pointer-events-none
        z-10 -top-1.5 left-[8px] text-secondary/60 peer-disabled:opacity-50 text-xs">
          {placeholder}
        </label>
      </div>
    );
  }
);

export default TextArea;
