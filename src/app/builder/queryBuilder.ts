import { Query } from "mongoose";

class QueryBuilder<T> {
    private modelQuery: Query<T[], T>;
    private query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }



}




export default QueryBuilder;