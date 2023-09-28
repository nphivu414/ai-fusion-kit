import { TextArea, TextAreaProps } from '@/components/ui/TextArea';
import { cn } from '@/lib/utils';
import get from 'lodash/get';
import { FieldValues } from 'react-hook-form';

import { FormFieldProps } from '../types';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

type TextAreaFieldProps<T extends FieldValues> = FormFieldProps<T> &
  Omit<TextAreaProps, 'name'> & TextareaAutosizeProps;

export function TextAreaField<T extends FieldValues>(
  props: TextAreaFieldProps<T>
) {
  const { register, name, id, formState, containerClassName, ...rest } = props;
  const { errors } = formState;
  const error = get(errors, name);
  const errorText = error?.message;

  const renderHelperText = () => {
    if (errorText && typeof errorText === 'string') {
      return errorText;
    }
  };

  return (
    <TextArea
      id={id || name}
      containerClassName={cn('my-4', containerClassName)}
      isError={!!error}
      helperText={renderHelperText()}
      {...register(name)}
      {...rest}
    />
  );
}
