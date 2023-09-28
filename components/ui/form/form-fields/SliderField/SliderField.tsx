import { Slider, SliderProps } from '@/components/ui/Slider';
import get from 'lodash/get';
import { Controller, FieldValues } from 'react-hook-form';

import { ControlledFormFieldProps } from '../types';

type SliderFieldProps<T extends FieldValues> = ControlledFormFieldProps<T> & Omit<SliderProps, 'name'>;

export function SliderField<T extends FieldValues>(props: SliderFieldProps<T>) {
  const { name, id, formState, min, max, control, ...rest } = props;
  const { errors } = formState;
  const error = get(errors, name);
  const errorText = error?.message;

  const renderHelperText = () => {
    if (errorText && typeof errorText === 'string') {
      return errorText;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, name, ...fields },
      }) => (
        <Slider
          id={id || name}
          min={min}
          max={max}
          onValueChange={onChange}
          helperText={renderHelperText()}
          isError={!!error}
          {...rest}
          {...fields}
        />
      )}
    />

  );
}
