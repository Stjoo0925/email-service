import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className = "",
  required,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
        htmlFor={props.id || props.name}
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <input
        id={props.id || props.name}
        className={`rounded-lg border border-gray-300 bg-white/60 py-3 px-4 text-sm placeholder-gray-400 backdrop-blur-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition ${className}`}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
