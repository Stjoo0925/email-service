import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-tr from-emerald-500 to-teal-400 px-5 py-2 font-medium text-white shadow-lg transition hover:from-emerald-600 hover:to-teal-500 disabled:opacity-50 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-5 w-5 animate-spin text-white select-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
