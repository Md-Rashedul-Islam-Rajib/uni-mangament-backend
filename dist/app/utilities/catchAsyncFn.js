"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A higher-order function that wraps an asynchronous Express request handler
 * to catch any errors and pass them to the global error handler middleware.
 *
 * @param asyncFn - The asynchronous request handler function to be wrapped.
 *
 * @returns A new request handler function that catches errors from the original handler.
 *
 * @example
 * // Example usage:
 * app.get('/some-route', catchAsync(async (req, res, next) => {
 *   const data = await someAsyncFunction();
 *   res.json(data);
 * }));
 */
const catchAsync = (asyncFn) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield asyncFn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = catchAsync;
