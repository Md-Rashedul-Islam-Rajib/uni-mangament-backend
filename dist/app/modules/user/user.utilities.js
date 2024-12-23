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
exports.generateAdminId = exports.generateFacultyMemberID = exports.generateStudentId = void 0;
const student_model_1 = require("../student/student.model");
const member_model_1 = require("../facultyMember/member.model");
const admin_model_1 = require("../admin/admin.model");
const findLastStudentId = (semesterId, departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentCount = yield student_model_1.StudentModel.countDocuments({
        admissionSemester: semesterId,
        academicDepartment: departmentId,
    });
    return studentCount;
});
const generateStudentId = (payload1, payload2) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = yield findLastStudentId(payload1._id, payload2._id);
    console.log(currentId);
    const incrementId = (currentId + 1).toString().padStart(4, '0'); // Increment and pad to 4 digits
    return `${payload1.year}${payload1.code}${payload2.code}${incrementId}`;
});
exports.generateStudentId = generateStudentId;
const findLastFacultyMemberId = (departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyMember = yield member_model_1.FacultyMemberModel.findOne({
        academicDepartment: departmentId,
    })
        .sort({ id: -1 }) // Sort by ID in descending order
        .select('id') // Select only the ID field
        .lean();
    // Extract the numeric part of the ID, e.g., from "F-0003" to "0003"
    const lastId = (lastFacultyMember === null || lastFacultyMember === void 0 ? void 0 : lastFacultyMember.id)
        ? parseInt(lastFacultyMember.id.split('-')[1], 10)
        : 0;
    return lastId; // Return the numeric portion of the last ID
});
const generateFacultyMemberID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = yield findLastFacultyMemberId(payload._id);
    // Increment and pad with zeroes to maintain the "F-XXXX" format
    const incrementedId = (lastId + 1).toString().padStart(4, '0');
    return `F-${incrementedId}`;
});
exports.generateFacultyMemberID = generateFacultyMemberID;
const findLastAdminId = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield admin_model_1.AdminModel.findOne({ user: adminId })
        .sort({ id: -1 }) // Sort by ID in descending order
        .select('id') // Select only the ID field
        .lean();
    const lastId = (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? parseInt(lastAdmin.id.split('-')[1], 10) : 0;
    return lastId;
});
const generateAdminId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = yield findLastAdminId(payload._id);
    const incrementedId = (lastId + 1).toString().padStart(4, '0');
    return `A-${incrementedId}`;
});
exports.generateAdminId = generateAdminId;
