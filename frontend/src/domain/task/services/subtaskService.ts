/**
 * @service subtaskService
 * @summary Subtask management service for authenticated endpoints
 * @domain task
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/subtask/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Subtask, CreateSubtaskDto } from '../types';

export const subtaskService = {
  /**
   * @endpoint POST /api/v1/internal/subtask
   * @summary Creates new subtask
   */
  async create(data: CreateSubtaskDto): Promise<Subtask> {
    const response = await authenticatedClient.post('/subtask', data);
    return response.data.data;
  },
};
