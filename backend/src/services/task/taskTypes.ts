/**
 * @summary
 * Type definitions for task management
 *
 * @module services/task
 */

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

export interface TaskEntity {
  idTask: string;
  idUser: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
  dateCreated: Date;
}

export interface TaskCreateRequest {
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  priority?: TaskPriority;
}

export interface TaskCreateResponse {
  idTask: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
  dateCreated: Date;
}

export interface SubtaskEntity {
  idSubtask: string;
  idTask: string;
  idUser: string;
  title: string;
  status: TaskStatus;
  dateCreated: Date;
}

export interface SubtaskCreateRequest {
  idTask: string;
  title: string;
}

export interface SubtaskCreateResponse {
  idSubtask: string;
  idTask: string;
  title: string;
  status: TaskStatus;
  dateCreated: Date;
}
