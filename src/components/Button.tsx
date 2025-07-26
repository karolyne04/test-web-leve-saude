import React from 'react';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                'bg-primary text-white px-4 py-2 rounded font-bold hover:bg-secondary transition ' +
                (props.className || '')
            }
        >
            {children}
        </button>
    );
} 