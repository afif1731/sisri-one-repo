/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
// eslint-disable-next-line @typescript-eslint/naming-convention
interface CustomResponseData {
  [key: string]: any;
}

export class CustomResponse {
  code: number;
  message: string;
  data: CustomResponseData | null;
  meta: CustomResponseData | null;

  constructor(
    code: number,
    message: string,
    data: CustomResponseData | null = null,
    meta: CustomResponseData | null = null,
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  toJSON() {
    const result = {
      code: this.code,
      message: this.message,
      status: true,
      data: this.data,
      meta: this.meta,
    };

    if (!this.meta) {
      delete result.meta;
    }

    return result;
  }
}
