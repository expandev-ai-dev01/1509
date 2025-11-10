/**
 * @types UseSubtaskCreateTypes
 * @summary Type definitions for useSubtaskCreate hook
 * @domain task
 * @category task-management
 */

import type { Subtask, CreateSubtaskDto } from '../../types';

export interface UseSubtaskCreateOptions {
  onSuccess?: (subtask: Subtask) => void;
  onError?: (error: Error) => void;
}

export interface UseSubtaskCreateReturn {
  createSubtask: (data: CreateSubtaskDto) => Promise<Subtask>;
  isCreating: boolean;
  error: Error | null;
}
