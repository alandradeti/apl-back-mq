/**
 * Generic interface for database repository operations.
 *
 * This interface defines common CRUD operations for any entity type.
 * It can be reused across different repositories by providing the entity type
 * as a generic parameter.
 */
export interface IDatabaseRepository<T> {
  /**
   * Finds an entity by its ID.
   *
   * @param id - The ID of the entity to be found.
   * @returns {Promise<T | null>} A promise that resolves to the entity if found, or null if not found.
   */
  findById(id: string): Promise<T | null>;

  /**
   * Finds a single entity that matches the given filter.
   *
   * @param filter - A partial object representing the entity's fields to match.
   * @returns {Promise<T | null>} A promise that resolves to the entity if found, or null if not found.
   */
  findOne(filter: Partial<T>): Promise<T | null>;

  /**
   * Finds all entities in the collection.
   *
   * @returns {Promise<T[]>} A promise that resolves to an array of all entities.
   */
  findAll(): Promise<T[]>;

  /**
   * Inserts a new entity into the database.
   *
   * @param data - A partial object representing the entity data to insert.
   * @returns {Promise<T>} A promise that resolves to the inserted entity.
   */
  insert(data: Partial<T>): Promise<T>;

  /**
   * Updates an existing entity by its ID with the provided data.
   *
   * @param id - The ID of the entity to be updated.
   * @param data - A partial object representing the new entity data.
   * @returns {Promise<T | null>} A promise that resolves to the updated entity if successful, or null if the entity was not found.
   */
  update(id: string, data: Partial<T>): Promise<T | null>;

  /**
   * Deletes an entity by its ID.
   *
   * @param id - The ID of the entity to be deleted.
   * @returns {Promise<void>} A promise that resolves when the entity is deleted.
   */
  delete(id: string): Promise<void>;
}
