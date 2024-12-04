import { DepartmentModel } from "./dept.model";

export class DepartmentServices {
    static async getAllDepartments() {
        const result = await DepartmentModel.find().populate("faculty");
        return result;
    }
}