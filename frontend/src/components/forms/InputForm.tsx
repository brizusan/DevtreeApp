import { FormValues } from "@/schemas";
import { Control, Controller, FieldError } from "react-hook-form";

type Props = {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
};
export const InputForm = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            className={`w-full border border-gray-300 py-2 px-3 rounded-md bg-slate-50 text-slate-700  ${
              error && "border-red-400"
            }`}
            id={name}
            type={type}
            {...field}
          />
        )}
      />
      {error && (
        <p className="text-red-400 text-sm font-semibold">{error.message}</p>
      )}
    </div>
  );
};
