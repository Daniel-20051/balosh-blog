import React, { useState } from "react";

interface TextAreaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  error,
  required = false,
  rows = 4,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-[#515051]">
        {label}
        {required && <span className="text-[#ef4444] ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
            <div className="text-[#6b7280]">{icon}</div>
          </div>
        )}

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
              block w-full px-3 py-2 border border-[#e5e7eb] rounded-lg
              placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326]
              transition-colors duration-200 resize-none
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border-[#ef4444] focus:ring-[#ef4444] focus:border-[#ef4444]"
                  : ""
              }
              ${isFocused ? "border-[#f88326]" : ""}
            `}
        />
      </div>

      {maxLength && (
        <p className="text-sm text-[#6b7280] text-right">
          {value.length}/{maxLength} characters
        </p>
      )}

      {error && <p className="text-sm text-[#ef4444]">{error}</p>}
    </div>
  );
};

export default TextArea;
