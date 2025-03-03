import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClientDTO } from 'src/application/dtos/client/create-client.dto';
import { UpdateClientDTO } from 'src/application/dtos/client/update-client.dto';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.use-case';
import { UpdateClientUseCase } from 'src/application/use-cases/clients/update-client.use-case';
import { DeleteClientUseCase } from 'src/application/use-cases/clients/delete-client.use-case';
import { Client } from 'src/domain/entities/clients/client.entity';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  /**
   * Creates a new client.
   *
   * This route handles the creation of a new client. It accepts a DTO with the client data,
   * validates it, and returns the newly created client entity.
   *
   * @param createClientDTO - The DTO containing the client data for creation.
   * @returns {Promise<Client>} - A promise that resolves to the created client.
   */
  @Post()
  async create(@Body() createClientDTO: CreateClientDTO): Promise<Client> {
    return this.createClientUseCase.execute(createClientDTO);
  }

  /**
   * Updates an existing client by ID.
   *
   * This route handles the updating of an existing client. It accepts the client ID
   * and a DTO with the updated client data, and returns the updated client entity if successful,
   * or null if the client was not found.
   *
   * @param id - The ID of the client to be updated.
   * @param updateClientDTO - The DTO containing the updated client data.
   * @returns {Promise<Client | null>} - A promise that resolves to the updated client or null if not found.
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDTO: UpdateClientDTO,
  ): Promise<Client | null> {
    return this.updateClientUseCase.execute(id, updateClientDTO);
  }

  /**
   * Deletes an existing client by ID.
   *
   * This route handles the deletion of a client by its ID. It returns a promise that resolves
   * when the client has been successfully deleted.
   *
   * @param id - The ID of the client to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the client is deleted.
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteClientUseCase.execute(id);
  }
}
