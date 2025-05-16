/** @format */

import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", bgColor="bg-white",textColor="text-black",placeholderTextColor="text-black", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className={`${textColor} inline-block mb-1 pl-1`} htmlFor={id}>
          {label}
        </label>
          )}
          <input
              type={type}
              className={`px-3 py-2 rounded-lg ${bgColor} ${placeholderTextColor} outline-none duration-200   ${className}`}
              ref={ref}
              {...props}
              id={id}
          />
    </div>
  );
});

export default Input;
