import { Model, Document, UpdateQuery, FilterQuery } from 'mongoose';
import { IDatabaseRepository } from 'src/domain/interfaces/repositories/database/database.repository.interface';

/**
 * MongoDB Repository implementation for CRUD operations.
 *
 * This class implements the `IDatabaseRepository` interface and provides methods
 * to interact with MongoDB for creating, reading, updating, and deleting documents.
 * It uses Mongoose for database operations and can be used with any MongoDB model.
 *
 * @template T The type of the entity to be stored in the repository.
 */
export class MongoRepository<T> implements IDatabaseRepository<T> {
  /**
   * Constructor to initialize the repository with the MongoDB model.
   *
   * @param model - The Mongoose model used for performing database operations.
   */
  constructor(protected readonly model: Model<T & Document>) {}

  /**
   * Finds a document by its ID.
   *
   * @param id - The ID of the document to be retrieved.
   * @returns {Promise<T | null>} - A promise that resolves to the document, or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    const doc = await this.model.findById(id).exec();
    return doc ? (doc.toObject() as T) : null;
  }

  /**
   * Finds a document matching the given filter.
   *
   * @param filter - The filter criteria for finding the document.
   * @returns {Promise<T | null>} - A promise that resolves to the document, or null if not found.
   */
  async findOne(filter: Partial<T>): Promise<T | null> {
    const doc = await this.model
      .findOne(filter as FilterQuery<T & Document>)
      .exec();
    return doc ? (doc.toObject() as T) : null;
  }

  /**
   * Finds all documents in the collection.
   *
   * @returns {Promise<T[]>} - A promise that resolves to an array of documents.
   */
  async findAll(): Promise<T[]> {
    const docs = await this.model.find().exec();
    return docs.map((doc) => doc.toObject() as T);
  }

  /**
   * Inserts a new document into the collection.
   *
   * @param data - The data to be inserted into the collection.
   * @returns {Promise<T>} - A promise that resolves to the inserted document.
   */
  async insert(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject() as T;
  }

  /**
   * Updates a document by its ID.
   *
   * @param id - The ID of the document to be updated.
   * @param data - The data to be updated in the document.
   * @returns {Promise<T | null>} - A promise that resolves to the updated document, or null if not found.
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, data as UpdateQuery<T & Document>, { new: true })
      .exec();
    return doc ? (doc.toObject() as T) : null;
  }

  /**
   * Deletes a document by its ID.
   *
   * @param id - The ID of the document to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the document is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
