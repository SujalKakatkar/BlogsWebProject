/** @format */

import React, { useId } from "react";

function Select({ options, label, className = "",bgColor="bg-gray-900",textColor="text-white", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id} className={`${textColor}`}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg ${textColor} ${bgColor} outline-none duration-200  w-full ${className}`}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
