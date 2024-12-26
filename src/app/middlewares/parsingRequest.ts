import {  RequestHandler } from 'express';

export const parsingRequest: RequestHandler = (
    req,
    res,
    next,
) => {
    try {
        // Parse the `data` field from req.body
        if (req.body && req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    } catch (error) {
        // Handle JSON parsing errors
        res.status(400).json({
            message: "Invalid JSON format in 'data' field",
        });
    }
};
