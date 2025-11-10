/**
 * @hook useTaskCreate
 * @summary Hook for creating new tasks with mutation handling
 * @domain task
 * @type domain-hook
 * @category task-management
 *
 * @description
 * Provides task creation functionality with loading states,
 * error handling, and success callbacks.
 */

import { useMutation } from '@tanstack/react-query';
import { taskService } from '../../services/taskService';
import type { UseTaskCreateOptions, UseTaskCreateReturn } from './types';

export const useTaskCreate = (options: UseTaskCreateOptions = {}): UseTaskCreateReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
