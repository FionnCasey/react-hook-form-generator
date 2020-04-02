import { useMemo, createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { FormStyles, FieldStyles } from './types';

export const StylesCtx = createContext({} as FormStyles);

export const useStyles = <T extends FieldStyles>(type: keyof FormStyles, styles?: T): T => {
  const styleCtx = useContext(StylesCtx);

  return useMemo(() => {
    return !!styles ? merge(styleCtx[type], styles) : (styleCtx[type] as T);
  }, [type, styleCtx, styles]);
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
