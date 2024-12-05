import { semesterNameCodeMapper } from './semester.constans';
import { SemesterModel } from './semester.model';
import { TSemester } from './semester.types';

export class SemesterServices {
    static async createSemesterIntoDB(payload: TSemester) {
        // Check semester name-code combination
        if (semesterNameCodeMapper[payload.name] !== payload.code) {
            throw new Error('Invalid Semester Code!');
        }
        const result = await SemesterModel.create(payload);
        return result;
    }

    static async getAllSemester() {
        const result = await SemesterModel.find();
        return result;
    }

    static async getSingleSemester(id: string) {
        const result = await SemesterModel.findById(id);
        return result;
    }

    static async updateSemester(id: string, payload: Partial<TSemester>) {
        if (
            payload.name &&
            payload.code &&
            semesterNameCodeMapper[payload.name] !== payload.code
        ) {
            throw new Error(
                `Invalid semester code. ${payload.code} doesn't align with ${payload.name} semester`,
            );
        }
        const result = await SemesterModel.findByIdAndUpdate(
            { _id: id },
            payload,
            { new: true },
        );
        return result;
    }
}
