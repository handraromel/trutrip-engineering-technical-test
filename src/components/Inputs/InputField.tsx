import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { inputCss } from './styles';

type FieldValue = string | number | Date | null;

interface FieldInputProps {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'datepicker' | 'password' | 'number';
  name: string;
  placeholder?: string;
  rows?: number;
  passwordFeedback?: boolean;
  onBlur?: (value: string) => void | Promise<void>;
  disabled?: boolean;
  numericOnly?: boolean;
  maxDate?: Date;
}

export const InputField: React.FC<FieldInputProps> = ({
  id,
  label,
  type,
  name,
  placeholder,
  passwordFeedback = false,
  onBlur,
  disabled = false,
  numericOnly = false,
  maxDate,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string;

  const getInputComponent = (field: ControllerRenderProps<Record<string, FieldValue>, string>) => {
    const hasError = !!error;

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        await onBlur(e.target.value);
      }
      field.onBlur();
    };

    switch (type) {
      case 'password':
        return (
          <Password
            id={id}
            value={field.value as string}
            onChange={field.onChange}
            onBlur={handleBlur}
            toggleMask
            feedback={passwordFeedback}
            className="p-inputtext-sm w-full"
            placeholder={placeholder}
            invalid={hasError}
            pt={inputCss.passwordStyles}
            disabled={disabled}
          />
        );
      case 'datepicker':
        return (
          <Calendar
            id={id}
            value={field.value ? new Date(field.value as string) : null}
            onChange={(e) => {
              const formattedDate = e.value ?? null;
              field.onChange(formattedDate);
            }}
            onBlur={field.onBlur}
            dateFormat="yy MM dd"
            placeholder={placeholder}
            invalid={hasError}
            className="p-inputtext-sm w-full"
            disabled={disabled}
            maxDate={maxDate}
          />
        );
      case 'number':
        return (
          <InputNumber
            id={id}
            value={field.value as number}
            onChange={(e) => field.onChange(e.value)}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className="p-inputtext-sm w-full"
            inputClassName={hasError ? 'p-invalid' : ''}
            disabled={disabled}
            min={0}
            showButtons={false}
          />
        );
      default:
        return (
          <InputText
            id={id}
            value={field.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (numericOnly) {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                field.onChange(numericValue);
              } else {
                field.onChange(e.target.value);
              }
            }}
            onBlur={handleBlur}
            type={type}
            placeholder={placeholder}
            invalid={hasError}
            className="p-inputtext-sm w-full"
            disabled={disabled}
            inputMode={numericOnly ? 'numeric' : 'text'}
          />
        );
    }
  };

  return (
    <div className="field">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <Controller name={name} control={control} render={({ field }) => getInputComponent(field)} />
      {error && <small className="p-error">{error}</small>}
    </div>
  );
};
