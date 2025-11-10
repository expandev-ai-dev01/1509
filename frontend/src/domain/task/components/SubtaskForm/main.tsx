/**
 * @component SubtaskForm
 * @summary Form for creating subtasks linked to parent task
 * @domain task
 * @type domain-component
 * @category form
 *
 * @description
 * Simple form for creating subtasks. Requires parent task ID
 * and subtask title. Validates title length and parent task existence.
 *
 * @props
 * @param {SubtaskFormProps} props
 *   - idTask: Parent task identifier
 *   - onSuccess: Callback after successful subtask creation
 *   - onCancel: Callback for form cancellation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubtaskCreate } from '../../hooks/useSubtaskCreate';
import { Button } from '@/core/components/Button';
import type { SubtaskFormProps } from './types';

const subtaskFormSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
});

interface SubtaskFormData {
  title: string;
}

export const SubtaskForm = (props: SubtaskFormProps) => {
  const { idTask, onSuccess, onCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubtaskFormData>({
    resolver: zodResolver(subtaskFormSchema),
  });

  const { createSubtask, isCreating } = useSubtaskCreate({
    onSuccess: (subtask) => {
      reset();
      onSuccess?.(subtask.idSubtask);
    },
    onError: (error: Error) => {
      alert(`Erro ao criar subtarefa: ${error.message}`);
    },
  });

  const onSubmit = async (data: SubtaskFormData) => {
    await createSubtask({
      idTask,
      title: data.title,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="subtask-title" className="block text-sm font-medium text-gray-700 mb-1">
          Título da Subtarefa <span className="text-red-500">*</span>
        </label>
        <input
          id="subtask-title"
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título da subtarefa"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isCreating}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isCreating}>
          Adicionar Subtarefa
        </Button>
      </div>
    </form>
  );
};
