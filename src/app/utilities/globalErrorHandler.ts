import mongoose, { MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { ValidationErrorResponse } from './error.type';
import { ZodError } from 'zod';

export const handleErrors = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // handling mongoose errors
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: err.errors,
            },
            stack: err.stack,
        } as ValidationErrorResponse);
    }

    // handling cast errors
    if (err instanceof MongooseError) {
        if (err?.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ObjectId',
                success: false,
                error: {
                    name: err.name,
                    errors: err,
                },
                stack: err.stack,
            });
        }
    }
    // handling zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: err.name,
            success: false,
            error: {
                name: err.name,
                errors: err.errors || err.issues,
            },
            stack: err.stack,
        });
    }

    // handling all other errors except zod and mongoose
    if (err instanceof Error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }
    // handling unknown errors
    return res.status(500).json({
        message: 'Unknown error occurs',
        success: false,
        error: JSON.stringify(err),
    });
};
