import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for reuse across the application
 *
 * @module utils/validation
 */

// String validations
export const zString = z.string().min(1);
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

export const zName = z.string().min(1).max(200);
export const zDescription = z.string().min(1).max(500);
export const zNullableDescription = z.string().max(500).nullable();

// Number validations
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive();
export const zNonNegativeNumber = z.number().min(0);

// ID validations
export const zId = z.coerce.number().int().positive();
export const zFK = z.coerce.number().int().positive();
export const zNullableFK = z.coerce.number().int().positive().nullable();

// Boolean validations
export const zBit = z.coerce.number().int().min(0).max(1);
export const zBoolean = z.boolean();

// Date validations
export const zDate = z.coerce.date();
export const zDateString = z.string().datetime();
export const zNullableDate = z.coerce.date().nullable();
