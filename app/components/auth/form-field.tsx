import type { ReactNode } from "react";
import { CalendarIcon, ChevronDownIcon } from "../icons";

type BaseFieldProps = {
  id: string;
  label: string;
  name: string;
  labelAccessory?: ReactNode;
  required?: boolean;
};

type TextFieldProps = BaseFieldProps & {
  type?: "text" | "email" | "password" | "tel" | "date";
  placeholder?: string;
  icon?: ReactNode;
  autoComplete?: string;
  inputMode?: "email" | "numeric" | "tel" | "text";
};

type SelectFieldProps = BaseFieldProps & {
  options: Array<{ label: string; value: string }>;
};

const inputClassName =
  "min-h-14 w-full min-w-0 rounded-md border-0 bg-slate-100 px-5 py-3 text-base font-medium text-slate-950 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary";

export function FormTextField({
  id,
  label,
  name,
  labelAccessory,
  required = false,
  type = "text",
  placeholder,
  icon,
  autoComplete,
  inputMode,
}: TextFieldProps) {
  const hasIcon = Boolean(icon);

  return (
    <div className="min-w-0">
      <FieldLabel htmlFor={id} label={label} accessory={labelAccessory} />
      <div className="relative mt-2">
        {hasIcon ? (
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`${inputClassName} ${hasIcon ? "pl-14" : ""}`}
        />
        {type === "date" ? (
          <CalendarIcon className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        ) : null}
      </div>
    </div>
  );
}

export function FormSelectField({
  id,
  label,
  name,
  options,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="min-w-0">
      <FieldLabel htmlFor={id} label={label} />
      <div className="relative mt-2">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          className={`${inputClassName} appearance-none pr-12`}
        >
          {options.map((option) => (
            <option key={option.value || "empty"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  accessory,
}: {
  htmlFor: string;
  label: string;
  accessory?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="min-w-0 text-sm font-extrabold uppercase tracking-[0.12em] text-[#4a2a1e]"
      >
        {label}
      </label>
      {accessory}
    </div>
  );
}
