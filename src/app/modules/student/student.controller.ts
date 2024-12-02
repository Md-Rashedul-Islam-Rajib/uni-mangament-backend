import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';


export class StudentControllers {

    static async getSingleStudent (
        req: Request,
    res: Response,
    next: NextFunction,
){
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        sendResponse(res, 
            200,
            true,
            'Student is retrieved succesfully',
            result,
        );
    } catch (err) {
        next(err);
    }
};

static async getAllStudents(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        sendResponse(
            res,
            200,
            true,
            'Student is retrieved succesfully',
            result,
        );
    } catch (err) {
        next(err);
    }
};

static async deleteStudent (
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        
        sendResponse(
            res,
            200,
            true,
            'Student is deleted succesfully',
            result,
        );
    } catch (err) {
        next(err);
    }
};

        }