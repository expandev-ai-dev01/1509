/**
 * @summary
 * Business logic for task management operations
 *
 * @module services/task
 */

import { v4 as uuidv4 } from 'uuid';
import {
  TaskEntity,
  TaskCreateRequest,
  TaskCreateResponse,
  TaskPriority,
  TaskStatus,
  SubtaskEntity,
  SubtaskCreateRequest,
  SubtaskCreateResponse,
} from './taskTypes';

// In-memory storage (no database persistence)
const tasks: TaskEntity[] = [];
const subtasks: SubtaskEntity[] = [];

/**
 * @summary
 * Creates a new task with the provided information
 *
 * @function taskCreate
 *
 * @param {string} idUser - User identifier from session
 * @param {TaskCreateRequest} data - Task creation data
 *
 * @returns {Promise<TaskCreateResponse>} Created task information
 *
 * @throws {Error} When validation fails
 */
export async function taskCreate(
  idUser: string,
  data: TaskCreateRequest
): Promise<TaskCreateResponse> {
  /**
   * @validation Title is required and must meet length requirements
   * @throw {titleRequired}
   */
  if (!data.title || data.title.trim().length === 0) {
    throw new Error('titleRequired');
  }

  /**
   * @validation Title must have minimum 3 characters
   * @throw {titleTooShort}
   */
  if (data.title.trim().length < 3) {
    throw new Error('titleTooShort');
  }

  /**
   * @validation Title must not exceed 100 characters
   * @throw {titleTooLong}
   */
  if (data.title.length > 100) {
    throw new Error('titleTooLong');
  }

  /**
   * @validation Description must not exceed 1000 characters
   * @throw {descriptionTooLong}
   */
  if (data.description && data.description.length > 1000) {
    throw new Error('descriptionTooLong');
  }

  /**
   * @validation Due date cannot be in the past
   * @throw {dueDateInPast}
   */
  if (data.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(data.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      throw new Error('dueDateInPast');
    }
  }

  /**
   * @rule {fn-task-creation} Create task with system-generated fields
   */
  const newTask: TaskEntity = {
    idTask: uuidv4(),
    idUser,
    title: data.title.trim(),
    description: data.description?.trim() || null,
    dueDate: data.dueDate || null,
    priority: data.priority ?? TaskPriority.Medium,
    status: TaskStatus.Pending,
    dateCreated: new Date(),
  };

  tasks.push(newTask);

  return {
    idTask: newTask.idTask,
    title: newTask.title,
    description: newTask.description,
    dueDate: newTask.dueDate,
    priority: newTask.priority,
    status: newTask.status,
    dateCreated: newTask.dateCreated,
  };
}

/**
 * @summary
 * Creates a new subtask linked to an existing task
 *
 * @function subtaskCreate
 *
 * @param {string} idUser - User identifier from session
 * @param {SubtaskCreateRequest} data - Subtask creation data
 *
 * @returns {Promise<SubtaskCreateResponse>} Created subtask information
 *
 * @throws {Error} When validation fails
 */
export async function subtaskCreate(
  idUser: string,
  data: SubtaskCreateRequest
): Promise<SubtaskCreateResponse> {
  /**
   * @validation Parent task must exist
   * @throw {taskNotFound}
   */
  const parentTask = tasks.find((t) => t.idTask === data.idTask && t.idUser === idUser);
  if (!parentTask) {
    throw new Error('taskNotFound');
  }

  /**
   * @validation Subtask title is required
   * @throw {titleRequired}
   */
  if (!data.title || data.title.trim().length === 0) {
    throw new Error('titleRequired');
  }

  /**
   * @validation Subtask title must have minimum 3 characters
   * @throw {titleTooShort}
   */
  if (data.title.trim().length < 3) {
    throw new Error('titleTooShort');
  }

  /**
   * @validation Subtask title must not exceed 100 characters
   * @throw {titleTooLong}
   */
  if (data.title.length > 100) {
    throw new Error('titleTooLong');
  }

  /**
   * @rule {fn-subtask-creation} Create subtask linked to parent task
   */
  const newSubtask: SubtaskEntity = {
    idSubtask: uuidv4(),
    idTask: data.idTask,
    idUser,
    title: data.title.trim(),
    status: TaskStatus.Pending,
    dateCreated: new Date(),
  };

  subtasks.push(newSubtask);

  return {
    idSubtask: newSubtask.idSubtask,
    idTask: newSubtask.idTask,
    title: newSubtask.title,
    status: newSubtask.status,
    dateCreated: newSubtask.dateCreated,
  };
}

/**
 * @summary
 * Retrieves all tasks for a specific user
 *
 * @function taskList
 *
 * @param {string} idUser - User identifier
 *
 * @returns {Promise<TaskEntity[]>} List of user tasks
 */
export async function taskList(idUser: string): Promise<TaskEntity[]> {
  return tasks.filter((t) => t.idUser === idUser);
}

/**
 * @summary
 * Retrieves a specific task by ID
 *
 * @function taskGet
 *
 * @param {string} idUser - User identifier
 * @param {string} idTask - Task identifier
 *
 * @returns {Promise<TaskEntity | null>} Task information or null if not found
 */
export async function taskGet(idUser: string, idTask: string): Promise<TaskEntity | null> {
  return tasks.find((t) => t.idTask === idTask && t.idUser === idUser) || null;
}

/**
 * @summary
 * Retrieves all subtasks for a specific task
 *
 * @function subtaskList
 *
 * @param {string} idUser - User identifier
 * @param {string} idTask - Parent task identifier
 *
 * @returns {Promise<SubtaskEntity[]>} List of subtasks
 */
export async function subtaskList(idUser: string, idTask: string): Promise<SubtaskEntity[]> {
  return subtasks.filter((s) => s.idTask === idTask && s.idUser === idUser);
}
