import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={`border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-300 ${className}`}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";

export { Textarea };
