import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  public constructor() {}

  public async catch(exception: any, host: ArgumentsHost): Promise<void | string> {
    const contextType = host.getType();
    if (contextType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception?.status ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;
      const error = exception?.response?.error
        ? exception?.response?.error
        : 'Interval Server Error';

      response.status(status).json({
        statusCode: status,
        error,
      });
      if (exception?.response?.message?.length) {
        const errorObj = exception.response.message[0];
        this.logger.error(
          `HTTP exception validation error. Exception: ${exception} | error: ${errorObj.error}`,
        );
      } else {
        this.logger.error(
          `HTTP exception caught by global filter. Exception: ${exception} | status: ${status} | error: ${error}`,
        );
      }
    } else {
      this.logger.error(
        `Unhandled exception caught by global filter. Exception: ${exception}. ContextType: ${contextType}`,
      );
    }

    return;
  }
}
