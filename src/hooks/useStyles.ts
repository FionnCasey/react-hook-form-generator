import { useMemo, createContext, useContext } from 'react';
import merge from 'lodash.merge';

import { FormStyles, FieldStyles } from '../types';

export const StyleCtx = createContext({} as FormStyles);

export const useStyles = <T extends FieldStyles>(
  type: keyof FormStyles,
  inlineStyles?: T
): T => {
  const baseStyles = useContext(StyleCtx);

  return useMemo(() => {
    return !!inlineStyles
      ? merge(baseStyles[type], inlineStyles)
      : (baseStyles[type] as T);
  }, [type, baseStyles, inlineStyles]);
};
