/**
 * @types TaskTypes
 * @summary Type definitions for task domain
 * @domain task
 * @category task-management
 */

export interface Task {
  idTask: string;
  idUser: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
  dateCreated: Date;
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
}

export interface CreateTaskDto {
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  priority?: TaskPriority;
}

export interface Subtask {
  idSubtask: string;
  idTask: string;
  title: string;
  status: TaskStatus;
  dateCreated: Date;
}

export interface CreateSubtaskDto {
  idTask: string;
  title: string;
}
