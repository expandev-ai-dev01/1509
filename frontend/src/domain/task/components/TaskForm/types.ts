/**
 * @types TaskFormTypes
 * @summary Type definitions for TaskForm component
 * @domain task
 * @category task-management
 */

import type { CreateTaskDto } from '../../types';

export interface TaskFormProps {
  onSuccess?: (taskId: string) => void;
  onCancel?: () => void;
}

export interface TaskFormData extends CreateTaskDto {}
