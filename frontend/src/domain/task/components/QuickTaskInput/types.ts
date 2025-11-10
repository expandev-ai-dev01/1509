/**
 * @types QuickTaskInputTypes
 * @summary Type definitions for QuickTaskInput component
 * @domain task
 * @category task-management
 */

export interface QuickTaskInputProps {
  onSuccess?: (taskId: string) => void;
  placeholder?: string;
}
