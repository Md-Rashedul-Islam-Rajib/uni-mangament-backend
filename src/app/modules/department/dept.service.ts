import { DepartmentModel } from "./dept.model";
import { TDepartment } from "./dept.types";

export class DepartmentServices {

    static async createDepartment(payload: TDepartment) {
        const result = await DepartmentModel.create(payload);
        return result;
    };

    static async getAllDepartments() {
        const result = await DepartmentModel.find().populate("faculty");
        return result;
    }
}