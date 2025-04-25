// src/components/ui/select.jsx
import React from "react";

/**
 * Een ultra-lichte Select-implementatie:
 *  - accepteert value / onValueChange
 *  - negeert onValueChange veilig als hij niet meegegeven is
 *  - behoudt noop-componenten zodat bestaande JSX niet breekt
 */

export function Select({ value, onValueChange, children, ...rest }) {
  // veilige handler: alleen aanroepen als er écht een functie is
  const handleChange = (e) => {
    if (typeof onValueChange === "function") {
      onValueChange(e.target.value);
    }
  };

  return (
    <select
      className="border p-1 rounded w-full"
      value={value}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

/* ---------- No-op wrappers zodat bestaande JSX werkt ---------- */
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <>{placeholder}</>;
