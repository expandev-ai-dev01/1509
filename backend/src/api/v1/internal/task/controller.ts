/**
 * @api {post} /api/v1/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with the specified parameters
 *
 * @apiParam {String} title Task title (3-100 characters)
 * @apiParam {String} [description] Task description (max 1000 characters)
 * @apiParam {Date} [dueDate] Due date (cannot be in the past)
 * @apiParam {Number} [priority] Priority level (0=Low, 1=Medium, 2=High)
 *
 * @apiSuccess {String} idTask Task identifier
 * @apiSuccess {String} title Task title
 * @apiSuccess {String} description Task description
 * @apiSuccess {Date} dueDate Due date
 * @apiSuccess {Number} priority Priority level
 * @apiSuccess {Number} status Task status
 * @apiSuccess {Date} dateCreated Creation timestamp
 *
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleTooShort Title must have at least 3 characters
 * @apiError {String} titleTooLong Title cannot exceed 100 characters
 * @apiError {String} descriptionTooLong Description cannot exceed 1000 characters
 * @apiError {String} dueDateInPast Due date cannot be in the past
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { taskCreate } from '@/services/task';
import { HTTP_STATUS } from '@/constants';

const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).nullable().optional(),
  dueDate: z.coerce.date().nullable().optional(),
  priority: z.coerce.number().int().min(0).max(2).optional(),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body against schema
     */
    const validatedData = createTaskSchema.parse(req.body);

    /**
     * @rule {fn-task-creation} Create task with user context
     * @remarks In production, idUser would come from authenticated session
     */
    const idUser = (req.headers['x-user-id'] as string) || 'default-user';

    const task = await taskCreate(idUser, validatedData);

    res.status(HTTP_STATUS.CREATED).json(successResponse(task));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (
      error.message === 'titleRequired' ||
      error.message === 'titleTooShort' ||
      error.message === 'titleTooLong' ||
      error.message === 'descriptionTooLong' ||
      error.message === 'dueDateInPast'
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
