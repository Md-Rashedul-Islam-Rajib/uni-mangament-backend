"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/utilities/globalErrorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello from university');
});
app.use(globalErrorHandler_1.handleErrors);
exports.default = app;
