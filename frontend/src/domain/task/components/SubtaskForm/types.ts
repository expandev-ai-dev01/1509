/**
 * @types SubtaskFormTypes
 * @summary Type definitions for SubtaskForm component
 * @domain task
 * @category task-management
 */

export interface SubtaskFormProps {
  idTask: string;
  onSuccess?: (subtaskId: string) => void;
  onCancel?: () => void;
}
