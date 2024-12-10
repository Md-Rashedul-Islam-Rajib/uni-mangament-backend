import { startSession } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "./admin.constant";
import { AdminModel } from "./admin.model";
import { TAdmin } from "./admin.types";
import { UserModel } from "../user/user.model";

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

    static async deleteAdmin(id: string) {
        
        const session = await startSession();
        session.startTransaction();

        try {
            const deletedAdmin = await AdminModel.findByIdAndUpdate(
                id,
                { isDeleted: true },
                {new:true, session}
            );

            if (!deletedAdmin) {
                throw new Error("failed to delete admin");
            }

            const userId = deletedAdmin.user;

            const deletedUser = await UserModel.findOneAndUpdate(
                userId,
                { isDeleted: true },
                {new: true, session}
            );

            if (!deletedUser) {
                throw new Error("failed to delete user");
            }
            await session.commitTransaction();
            await session.endSession();
            return deletedAdmin;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }

    }





}