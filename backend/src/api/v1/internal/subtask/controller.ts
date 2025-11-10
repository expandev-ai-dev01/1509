/**
 * @api {post} /api/v1/internal/subtask Create Subtask
 * @apiName CreateSubtask
 * @apiGroup Subtask
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new subtask linked to an existing task
 *
 * @apiParam {String} idTask Parent task identifier
 * @apiParam {String} title Subtask title (3-100 characters)
 *
 * @apiSuccess {String} idSubtask Subtask identifier
 * @apiSuccess {String} idTask Parent task identifier
 * @apiSuccess {String} title Subtask title
 * @apiSuccess {Number} status Subtask status
 * @apiSuccess {Date} dateCreated Creation timestamp
 *
 * @apiError {String} taskNotFound Parent task not found
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleTooShort Title must have at least 3 characters
 * @apiError {String} titleTooLong Title cannot exceed 100 characters
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { subtaskCreate } from '@/services/task';
import { HTTP_STATUS } from '@/constants';

const createSubtaskSchema = z.object({
  idTask: z.string().uuid(),
  title: z.string().min(3).max(100),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body against schema
     */
    const validatedData = createSubtaskSchema.parse(req.body);

    /**
     * @rule {fn-subtask-creation} Create subtask with user context
     * @remarks In production, idUser would come from authenticated session
     */
    const idUser = (req.headers['x-user-id'] as string) || 'default-user';

    const subtask = await subtaskCreate(idUser, validatedData);

    res.status(HTTP_STATUS.CREATED).json(successResponse(subtask));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else if (
      error.message === 'taskNotFound' ||
      error.message === 'titleRequired' ||
      error.message === 'titleTooShort' ||
      error.message === 'titleTooLong'
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}
