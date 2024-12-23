"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyModel = void 0;
const mongoose_1 = require("mongoose");
const FacultySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});
exports.FacultyModel = (0, mongoose_1.model)('Faculty', FacultySchema);
