import { Response } from "express";
import { TFunction } from "i18next";

class ApiResponse<T> {
  deleteOne(res: Response, t: TFunction, id: string) {
    return res.status(200).json({ message: t("deleted_successfully"), id });
  }

  deleteMany(res: Response, t: TFunction, document: any) {
    return res.status(200).json({
      message: t("deleted_successfully"),
      deletedCount: document.deletedCount,
    });
  }

  getMany(res: Response, documents: any, paginationResult: any) {
    res.status(200).json({ documents, paginationResult });
  }

  getOne(res: Response, document: any) {
    return res.status(200).json(document);
  }

  notFound(res: Response, t: TFunction) {
    return res.status(404).json({ message: t("document_not_found") });
  }

  empty(res: Response) {
    return res
      .status(200)
      .json({
        documents: [],
        paginationResult: {
          currentPage: 1,
          numberOfPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
          limit: 1,
          totalDocs: 0,
        },
      });
  }

  updateOne(res: Response, t: TFunction, document: any) {
    return res.status(200).json({
      message: t("updated_successfully"),
      document,
    });
  }

  updateManyNoMatch(res: Response, t: TFunction) {
    return res.status(200).json({
      message: t("no_matched_documents"),
      modifiedCount: 0,
    });
  }

  updateMany(res: Response, t: TFunction, document: any) {
    return res.status(200).json({
      message: t("updated_successfully"),
      document,
    });
  }

  success(
    res: Response,
    t: TFunction,
    status: number,
    messageKey: string,
    data?: any
  ) {
    return res.status(status).json({ message: t(messageKey), ...data });
  }
}

export default new ApiResponse();
