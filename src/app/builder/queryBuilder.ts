import { Query } from "mongoose";

class QueryBuilder<T> {
    private modelQuery: Query<T[], T>;
    private query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query?.searchTerm as string | undefined;
        if (searchTerm) {
            const regexQuery = searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            }));
            this.modelQuery = this.modelQuery.find({
                $or: regexQuery as FilterQuery<T>[],
            });
        }
        return this;
    }
}




export default QueryBuilder;