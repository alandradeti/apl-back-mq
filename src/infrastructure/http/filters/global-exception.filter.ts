import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

/**
 * GlobalExceptionFilter is a custom exception filter that handles different types of HTTP exceptions
 * and sends appropriate responses with a status code and a message.
 *
 * It provides specific error messages for the following types of exceptions:
 * - NotFoundException
 * - BadRequestException
 * - UnauthorizedException
 * - ForbiddenException
 * - ConflictException
 *
 * For any other type of exception, a generic internal server error message is sent.
 *
 * @implements {ExceptionFilter} - Implements the global exception filter for the application.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * Catches and handles the exception, and returns a structured HTTP response with the error message.
   *
   * @param exception - The thrown exception that needs to be handled.
   * @param host - The context of the request, including the response and request objects.
   * @returns {Promise<void>} - A promise that resolves when the error response is sent.
   */
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let statusCode: HttpStatus;
    let message: string;

    if (exception instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
    } else if (exception instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Bad request, please check the data provided';
    } else if (exception instanceof UnauthorizedException) {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized access, please login first';
    } else if (exception instanceof ForbiddenException) {
      statusCode = HttpStatus.FORBIDDEN;
      message = 'You do not have permission to access this resource';
    } else if (exception instanceof ConflictException) {
      statusCode = HttpStatus.CONFLICT;
      message = 'Conflict occurred, the request could not be processed';
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error, please try again later';
    }

    response.status(statusCode).json({ statusCode, message });
  }
}
