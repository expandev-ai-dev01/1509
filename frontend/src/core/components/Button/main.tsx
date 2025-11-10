import { getButtonClassName } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants
 * @domain core
 * @type ui-component
 * @category form
 *
 * @props
 * @param {ButtonProps} props
 *   - variant: Button style variant
 *   - size: Button size
 *   - fullWidth: Full width button
 *   - isLoading: Loading state
 */
export const Button = (props: ButtonProps) => {
  const { children, isLoading, disabled, ...rest } = props;

  return (
    <button className={getButtonClassName(props)} disabled={disabled || isLoading} {...rest}>
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
      ) : (
        children
      )}
    </button>
  );
};
