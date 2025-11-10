/**
 * @types ErrorMessageTypes
 * @summary Type definitions for ErrorMessage component
 * @domain core
 * @category ui-components
 */

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}
