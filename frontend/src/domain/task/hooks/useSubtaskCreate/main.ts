/**
 * @hook useSubtaskCreate
 * @summary Hook for creating new subtasks with mutation handling
 * @domain task
 * @type domain-hook
 * @category task-management
 *
 * @description
 * Provides subtask creation functionality with loading states,
 * error handling, and success callbacks.
 */

import { useMutation } from '@tanstack/react-query';
import { subtaskService } from '../../services/subtaskService';
import type { UseSubtaskCreateOptions, UseSubtaskCreateReturn } from './types';

export const useSubtaskCreate = (options: UseSubtaskCreateOptions = {}): UseSubtaskCreateReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: subtaskService.create,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createSubtask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
};
