import type { NextFunction, Request, Response } from 'express';
import type { ZodEffects, ZodObject, ZodTypeAny } from 'zod';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ZodSchema = ZodObject<any, any, any> | ZodEffects<ZodTypeAny>;
/**
 *
 * @param schema A zod validation schema
 * @returns A promise
 */
const validateRequest = (schema: ZodSchema) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validateRequest;
