import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "./admin.constant";
import { AdminModel } from "./admin.model";

export class AdminServices {

    static async getAllAdmin(query: Record<string,unknown>) {
        const adminQuery = new QueryBuilder(AdminModel.find(), query)
            .search(AdminSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = await adminQuery.getQuery;
        return result;
    }

}