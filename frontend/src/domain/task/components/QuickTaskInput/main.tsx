/**
 * @component QuickTaskInput
 * @summary Quick task creation input with Enter key support
 * @domain task
 * @type domain-component
 * @category form
 *
 * @description
 * Lightweight input for rapid task creation. User types title
 * and presses Enter to create task with default values.
 *
 * @props
 * @param {QuickTaskInputProps} props
 *   - onSuccess: Callback after successful task creation
 *   - placeholder: Input placeholder text
 */

import { useState, KeyboardEvent } from 'react';
import { useTaskCreate } from '../../hooks/useTaskCreate';
import { TaskPriority } from '../../types';
import type { QuickTaskInputProps } from './types';

export const QuickTaskInput = (props: QuickTaskInputProps) => {
  const { onSuccess, placeholder = 'Digite um título para a tarefa' } = props;
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { createTask, isCreating } = useTaskCreate({
    onSuccess: (task) => {
      setTitle('');
      setError(null);
      onSuccess?.(task.idTask);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isCreating) {
      e.preventDefault();

      const trimmedTitle = title.trim();

      if (trimmedTitle.length === 0) {
        setError('Digite um título para a tarefa');
        return;
      }

      if (trimmedTitle.length < 3) {
        setError('O título deve ter pelo menos 3 caracteres');
        return;
      }

      await createTask({
        title: trimmedTitle,
        priority: TaskPriority.Medium,
      });
    }
  };

  const handleChange = (value: string) => {
    setTitle(value);
    if (error) setError(null);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={title}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isCreating}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Criação rápida de tarefa"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      <p className="mt-1 text-xs text-gray-500">Pressione Enter para criar a tarefa</p>
    </div>
  );
};
