import { ChangeEvent } from "react";

export default function TextInput({
  type,
  placeholder,
  value,
  name,
  onChange
}: {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      value={value}
      name={name}
      className="bg-slate-800 outline-none text-white p-2 rounded-none border-b border-orange-400 placeholder-slate-600"
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
