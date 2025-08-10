# InputField Component

A versatile form input component that supports multiple input types with React Hook Form integration.

## Usage

```tsx
import { InputField } from '@/components/Inputs';
import { useForm, FormProvider } from 'react-hook-form';

const MyForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <InputField
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="Enter username"
        />

        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          passwordFeedback={true}
        />
      </form>
    </FormProvider>
  );
};
```

## Props

| Prop               | Type                                               | Required | Description                           |
| ------------------ | -------------------------------------------------- | -------- | ------------------------------------- |
| `id`               | `string`                                           | ✅       | Unique identifier for the input       |
| `name`             | `string`                                           | ✅       | Form field name (for React Hook Form) |
| `label`            | `string`                                           | ✅       | Display label for the input           |
| `type`             | `'text' \| 'password' \| 'number' \| 'datepicker'` | ✅       | Input type                            |
| `placeholder`      | `string`                                           | ❌       | Placeholder text                      |
| `passwordFeedback` | `boolean`                                          | ❌       | Show password strength feedback       |
| `onBlur`           | `(value: string) => void`                          | ❌       | Custom blur handler                   |
| `disabled`         | `boolean`                                          | ❌       | Disable the input                     |
| `numericOnly`      | `boolean`                                          | ❌       | Allow only numeric characters         |
| `maxDate`          | `Date`                                             | ❌       | Maximum date for datepicker           |

## Input Types

### Text Input

```tsx
<InputField id="name" name="name" label="Full Name" type="text" placeholder="Enter your name" />
```

### Password Input

```tsx
<InputField
  id="password"
  name="password"
  label="Password"
  type="password"
  passwordFeedback={true}
/>
```

### Number Input

```tsx
<InputField id="age" name="age" label="Age" type="number" placeholder="Enter age" />
```

### Date Picker

```tsx
<InputField
  id="birthdate"
  name="birthdate"
  label="Birth Date"
  type="datepicker"
  maxDate={new Date()}
/>
```

### Numeric Only Text

```tsx
<InputField
  id="phone"
  name="phone"
  label="Phone Number"
  type="text"
  numericOnly={true}
  placeholder="Enter phone number"
/>
```
