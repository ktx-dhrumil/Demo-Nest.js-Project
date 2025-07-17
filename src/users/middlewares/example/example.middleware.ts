import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("Example middleware.");
    const { authorization } = req.headers
    if(authorization === "dhumusdmn"){
      next();
    }else{
      throw new HttpException("User not authenticated.", HttpStatus.FORBIDDEN)
    }
  }
}
