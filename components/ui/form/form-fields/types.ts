import {
  Control,
  FieldPath,
  FieldValues,
  FormState,
  UseFormRegister,
} from 'react-hook-form';

export type FormFieldProps<T extends FieldValues = FieldValues> = {
  register: UseFormRegister<T>;
  formState: FormState<T>;
  name: FieldPath<T>;
};

export type ControlledFormFieldProps<T extends FieldValues = FieldValues> = {
  formState: FormState<T>;
  name: FieldPath<T>;
  control: Control<FieldValues>;
};
