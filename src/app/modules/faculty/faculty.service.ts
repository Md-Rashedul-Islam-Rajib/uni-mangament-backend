import { FacultyModel } from './faculty.model';
import { TFaculty } from './faculty.types';

export class FacultyServices {
    static async createFaculty(payload: TFaculty) {
        const result = await FacultyModel.create(payload);
        return result;
    }

    static async getAllFaculties() {
        const result = await FacultyModel.find();
        return result;
    }

    static async getSingleFaculty(id: string) {
        const result = await FacultyModel.findById(id);
        return result;
    }
    static async updateFaculty(id: string, payload: Partial<TFaculty>) {
        const result = await FacultyModel.findByIdAndUpdate(
            { _id: id },
            payload,
            { new: true },
        );
        return result;
    }
}
