import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for creating a client.
 *
 * This class defines the structure of the data required to create a new client.
 * It includes the client's name as a mandatory field for creation.
 *
 * @example
 * {
 *   "name": "SolutionTech"
 * }
 */
export class CreateClientDTO {
  /**
   * The name of the client.
   *
   * This value represents the name of the client entity being created. It is a required
   * field for the client creation process. The name should be unique to identify the client
   * within the system.
   *
   * @example 'SolutionTech'
   */
  @ApiProperty({
    description: 'Name of the client',
    example: 'SolutionTech',
  })
  name: string;
}
