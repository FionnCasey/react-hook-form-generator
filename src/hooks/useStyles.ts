import { useMemo, createContext, useContext } from 'react';

import { FormStyles, FieldStyles } from '../types';

export const StyleCtx = createContext({} as FormStyles);

export const useStyles = <T extends FieldStyles>(
  type: keyof FormStyles,
  inlineStyles?: T
): T => {
  const baseStyles = useContext(StyleCtx);

  return useMemo(() => {
    return !!inlineStyles
      ? { ...baseStyles[type], ...inlineStyles }
      : (baseStyles[type] as T);
  }, [type, baseStyles, inlineStyles]);
};
