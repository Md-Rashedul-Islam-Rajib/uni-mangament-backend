"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            const regexQuery = searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            }));
            this.modelQuery = this.modelQuery.find({
                $or: regexQuery,
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        // Exclude non-filter fields directly using a set
        const excludeFields = new Set([
            'searchTerm',
            'sort',
            'limit',
            'page',
            'fields',
        ]);
        for (const key of Object.keys(queryObj)) {
            if (excludeFields.has(key)) {
                delete queryObj[key];
            }
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b;
        const sortFields = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortFields);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Math.max(Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1, 1); // Ensure page >= 1
        const limit = Math.max(Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10, 1); // Ensure limit >= 1
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fieldsToSelect = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fieldsToSelect);
        return this;
    }
    getQuery() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
