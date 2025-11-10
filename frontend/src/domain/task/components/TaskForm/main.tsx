/**
 * @component TaskForm
 * @summary Complete task creation form with validation
 * @domain task
 * @type domain-component
 * @category form
 *
 * @description
 * Full-featured form for creating tasks with title, description,
 * due date, and priority. Includes real-time validation and
 * error handling.
 *
 * @props
 * @param {TaskFormProps} props
 *   - onSuccess: Callback after successful task creation
 *   - onCancel: Callback for form cancellation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useTaskCreate } from '../../hooks/useTaskCreate';
import { TaskPriority } from '../../types';
import { Button } from '@/core/components/Button';
import type { TaskFormProps, TaskFormData } from './types';

const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres')
    .refine((val) => val.trim().length > 0, 'O título não pode conter apenas espaços em branco'),
  description: z.string().max(1000, 'A descrição deve ter no máximo 1000 caracteres').optional(),
  dueDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return date >= new Date(new Date().setHours(0, 0, 0, 0));
      },
      { message: 'A data de vencimento não pode ser anterior à data atual' }
    ),
  priority: z.coerce.number().int().min(0).max(2).optional(),
});

export const TaskForm = (props: TaskFormProps) => {
  const { onSuccess, onCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      priority: TaskPriority.Medium,
    },
  });

  const { createTask, isCreating } = useTaskCreate({
    onSuccess: (task) => {
      reset();
      onSuccess?.(task.idTask);
    },
    onError: (error: Error) => {
      alert(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    const taskData = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      description: data.description || null,
    };

    await createTask(taskData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título da tarefa"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descreva os detalhes da tarefa (opcional)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Data de Vencimento
        </label>
        <input
          id="dueDate"
          type="date"
          {...register('dueDate')}
          min={format(new Date(), 'yyyy-MM-dd')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Prioridade
        </label>
        <select
          id="priority"
          {...register('priority')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={TaskPriority.Low}>Baixa</option>
          <option value={TaskPriority.Medium}>Média</option>
          <option value={TaskPriority.High}>Alta</option>
        </select>
        {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>}
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isCreating}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isCreating}>
          Criar Tarefa
        </Button>
      </div>
    </form>
  );
};
