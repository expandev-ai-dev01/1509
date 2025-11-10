import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';
import * as subtaskController from '@/api/v1/internal/subtask/controller';

const router = Router();

// Task routes
router.post('/task', taskController.postHandler);

// Subtask routes
router.post('/subtask', subtaskController.postHandler);

export default router;
