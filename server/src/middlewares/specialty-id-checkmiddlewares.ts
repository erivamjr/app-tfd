import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SpecialtyIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // if (isNaN(Number(req.params.id)) || Number(req.params.id) < 1) {
    //   throw new BadRequestException('Invalid user ID');
    // }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(req.params.id)) {
      throw new BadRequestException('Invalid specialty ID');
    }

    next();
  }
}
