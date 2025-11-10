import type { ErrorMessageProps } from './types';

/**
 * @component ErrorMessage
 * @summary Error message display component with retry/back actions
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @props
 * @param {ErrorMessageProps} props
 *   - title: Error title
 *   - message: Error message
 *   - onRetry: Retry callback
 *   - onBack: Back navigation callback
 */
export const ErrorMessage = (props: ErrorMessageProps) => {
  const { title = 'Erro', message, onRetry, onBack, className = '' } = props;

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
            >
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
