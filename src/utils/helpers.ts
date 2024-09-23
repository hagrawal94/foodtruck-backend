import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class Helper {

  public static errorHelper(err: any, bypass: Boolean = false, res?: Response): any {
    if (err instanceof HttpException) {
      if (bypass)
        return res.status(HttpStatus.OK).json({ data: err.getResponse(), status: err.getStatus() });
      throw err;
    }
    throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
