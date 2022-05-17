declare module "mongoose" {
  interface DocumentQuery<T, DocType extends import("mongoose").Document, QueryHelpers = {}> {
    mongooseCollection: {
      name: any;
    };
    cache(): Query;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> {}
}
