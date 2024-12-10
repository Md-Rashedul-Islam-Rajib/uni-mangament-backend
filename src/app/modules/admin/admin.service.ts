import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "./admin.constant";
import { AdminModel } from "./admin.model";
import { TAdmin } from "./admin.types";

export class AdminServices {

    static async getAllAdmin(query: Record<string, unknown>) {
        const adminQuery = new QueryBuilder(AdminModel.find(), query)
            .search(AdminSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = adminQuery.getQuery;
        return result;
    }


    static async getSingleAdmin(id: string) {
        const result = await AdminModel.findById(id);
        return result;
    };

    static async updateAdmin(id: string, payload: Partial<TAdmin>) {
        const { name, ...remainingAdminData } = payload;

        const modifiedUpdatedData = {
            ...remainingAdminData,
            ...(name &&
                Object.keys(name).reduce(
                    (acc, key) => ({
                        ...acc,
                        [`name.${key}`]: name[key as keyof typeof name],
                    }),
                    {},
                )),
        };
        

        const result = await AdminModel.findByIdAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
        return result;

    }
}