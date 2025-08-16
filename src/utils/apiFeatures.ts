import { Query } from "mongoose";

 type paginateOBJ = {
  currentPage: number;
  numberOfPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  totalDocs: number;
};

class ApiFeature {
  private excludedFields: string[] = [];
  constructor(
    public MongooseQuery: Query<any, any>,
    public queryStr: Record<string, any>
  ) {
    this.MongooseQuery = MongooseQuery;
    this.queryStr = queryStr;
  }

  public paginationResult: paginateOBJ = {
  currentPage: 1,
  numberOfPages: 1 ,
  hasNextPage: false ,
  hasPrevPage: false,
  limit: 1 ,
  totalDocs: 0 ,
  };

  filter() {
    const queryObj: Record<string, any> = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((element) => delete queryObj[element]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.MongooseQuery = this.MongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.sort(sortBy);
    } else {
      this.MongooseQuery = this.MongooseQuery.sort("-createdAt");
    }
    return this;
  }

 sanitize(fields: string[] | undefined) {
    if (!fields) return this;
    this.excludedFields = fields;
    return this;
  }

  select() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.select(`${fields} -_id`);
    } else {
      const excludeStr = this.excludedFields.map(f => `-${f}`).join(" ");
      this.MongooseQuery = this.MongooseQuery.select(`-__v ${excludeStr}`);
    }
    return this;
  }

  search(fields: string[]) {
    if (this.queryStr.keyword) {
      this.MongooseQuery = this.MongooseQuery.find({
        $or: fields.map((field) => ({
          [field]: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        })),
      });
    }
    return this;
  }

  paginate(countDocuments: number) {
    const page = Math.max(parseInt(this.queryStr.page) || 1, 1);
    const limit = Math.max(parseInt(this.queryStr.limit) || 20, 1);

    const adjustedLimit = Math.min(limit, countDocuments);

    const skip = (page - 1) * adjustedLimit;
    const endIndex = page * adjustedLimit;

    const pagination: paginateOBJ = {
      currentPage: page,
      limit: adjustedLimit,
      totalDocs: countDocuments,
      hasNextPage: endIndex < countDocuments,
      hasPrevPage: skip > 0,
      numberOfPages: Math.ceil(countDocuments / adjustedLimit),
    };

    this.MongooseQuery = this.MongooseQuery.skip(skip).limit(adjustedLimit);
    this.paginationResult = pagination;

    return this;
  }
}

export default ApiFeature;