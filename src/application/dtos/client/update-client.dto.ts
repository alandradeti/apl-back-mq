import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for updating a client.
 *
 * This class defines the structure of the data required to update an existing client.
 * It includes the client's name, which can be modified as part of the update process.
 *
 * @example
 * {
 *   "name": "SolutionTech"
 * }
 */
export class UpdateClientDTO {
  /**
   * The name of the client.
   *
   * This field represents the name of the client entity that is being updated.
   * It is an optional field, depending on whether the client name is to be changed
   * as part of the update process. The value should be a valid name to identify the client.
   *
   * @example 'SolutionTech'
   */
  @ApiProperty({
    description: 'Name of the client',
    example: 'SolutionTech',
  })
  name: string;
}
