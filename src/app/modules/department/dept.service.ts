import { DepartmentModel } from './dept.model';
import { TDepartment } from './dept.types';

export class DepartmentServices {
    static async createDepartment(payload: TDepartment) {
        const result = await DepartmentModel.create(payload);
        return result;
    }

    static async getAllDepartments() {
        const result = await DepartmentModel.find().populate('faculty');
        return result;
    }

    static async getSingleDepartment(id: string) {
        const result = await DepartmentModel.findById(id).populate('faculty');
        return result;
    }

    static async updateDepartment(id: string, payload: Partial<TDepartment>) {
        const result = await DepartmentModel.findByIdAndUpdate(
            { _id: id },
            payload,
            { new: true },
        );
        return result;
    }
}
