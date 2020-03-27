import { useMemo, createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { FormStyles, FieldStyles } from './types';

export const StylesCtx = createContext({} as FormStyles);

export const useStyles = <T extends FieldStyles>(type: keyof FormStyles, fieldStyles?: T): T => {
  const formStyles = useContext(StylesCtx);

  return useMemo(() => {
    if (!!fieldStyles && fieldStyles.override) {
      return fieldStyles;
    } else if (!!formStyles) {
      return merge(formStyles[type], fieldStyles);
    }
  }, [type, formStyles, fieldStyles]);
};

export const useErrorMessage = (name: string, label?: string) => {
  const { errors } = useFormContext();

  return useMemo(() => {
    const error = get(errors, name);
 
    if (!error) return undefined;

    const message: string | undefined = get(errors, `${name}.message`);

    if (message) return message.replace(name, label || name);
    return 'Field validation failed';
  }, [errors, name]);
};