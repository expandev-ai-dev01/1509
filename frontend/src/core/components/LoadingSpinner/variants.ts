import { clsx } from 'clsx';
import type { LoadingSpinnerProps } from './types';

/**
 * @variants LoadingSpinnerVariants
 * @summary Style variants for LoadingSpinner component
 * @domain core
 * @category ui-components
 */

export function getLoadingSpinnerClassName(props: LoadingSpinnerProps): string {
  const { size = 'medium', className } = props;

  return clsx(
    'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent',
    {
      'h-6 w-6': size === 'small',
      'h-10 w-10': size === 'medium',
      'h-16 w-16': size === 'large',
    },
    className
  );
}
