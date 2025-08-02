import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
  disabled = false,
}) => {
  return (
    <label
      className={`flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 text-[#f88326] focus:ring-[#f88326] border-[#e5e7eb] rounded"
      />
      <span className="ml-2 text-sm text-[#515051]">{label}</span>
    </label>
  );
};

export default Checkbox;
