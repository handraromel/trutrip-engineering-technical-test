export type FieldValue = string | number | Date | null;

export interface FieldInputProps {
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
