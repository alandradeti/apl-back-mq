import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateClientDTO } from 'src/application/dtos/authenticate-client/authenticate-client.dto';
import { AuthenticateClientUseCase } from 'src/application/use-cases/authenticate-client/authenticate-client.use-case';

@ApiTags('authenticate-client')
@Controller('authenticate-client')
export class AuthenticateClientController {
  constructor(
    private readonly authenticateClientUseCase: AuthenticateClientUseCase,
  ) {}

  /**
   * Authenticates a client by its API key and generates an access token.
   *
   * This route handles the login process for a client. It takes an API key
   * as input, validates it, and returns an access token if the authentication
   * is successful. If the API key is invalid, it returns an error message.
   *
   * @param authenticateClientDTO - The DTO containing the API key for authentication.
   * @returns {Promise<{ accessToken: string } | { message: string }>} -
   * A promise that resolves to either an object with an access token or an error message.
   */
  @Post('login')
  async login(
    @Body() authenticateClientDTO: AuthenticateClientDTO,
  ): Promise<{ accessToken: string } | { message: string }> {
    const token = await this.authenticateClientUseCase.execute(
      authenticateClientDTO,
    );
    if (!token) {
      return { message: 'Invalid API key' };
    }
    return { accessToken: token };
  }
}
