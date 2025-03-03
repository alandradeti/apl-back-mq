import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard class extends the AuthGuard from NestJS, specifically for JWT authentication.
 * This guard protects routes that require JWT validation by delegating the authentication
 * process to the Passport JWT strategy.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
