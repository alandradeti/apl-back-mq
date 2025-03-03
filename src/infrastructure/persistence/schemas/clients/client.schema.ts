import { Schema, Document } from 'mongoose';

/**
 * Mongoose schema for the Client entity.
 *
 * This schema defines the structure of the `Client` collection in MongoDB.
 * It includes two fields: `name` and `apiKey`, both of which are required
 * and must be unique.
 */
export const ClientSchema = new Schema({
  /**
   * The name of the client.
   *
   * This field is required and must be unique across the collection.
   *
   * @type {String}
   */
  name: { type: String, required: true, unique: true },

  /**
   * The API key associated with the client.
   *
   * This field is required and must be unique across the collection.
   *
   * @type {String}
   */
  apiKey: { type: String, required: true, unique: true },
});

/**
 * Mongoose document interface for the Client entity.
 *
 * This interface defines the structure of a document returned from MongoDB.
 * It includes the fields `name` and `apiKey` as defined in the schema.
 */
export interface ClientDocument extends Document {
  /**
   * The name of the client.
   *
   * @type {string}
   */
  name: string;

  /**
   * The API key associated with the client.
   *
   * @type {string}
   */
  apiKey: string;
}
