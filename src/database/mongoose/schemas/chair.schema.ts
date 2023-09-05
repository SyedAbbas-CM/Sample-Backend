import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChairStates } from 'src/common/enums';

@Schema({
  timestamps: true,
})
export class Chair {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, default: 0 })
  battery: number;

  @Prop({ required: true, default: ChairStates.Offline })
  state: ChairStates;

  @Prop({ required: true })
  qr_code?: string;

  /**
   * @note GREEN-18 - As a vacationer, I want to scan a QR code at a reserved beach chair so that I can easily
   * find a nearby free beach chair that meets my selected filtering criteria, such as location, availability, number of
   * seats, and the presence of USB-charging stations.
   * @note DB Principles used: Eventual Consistency, Basically available, Redundancy (Works fine in NoSQL Document DBs) 
   * @todo 
   * 1. Insert reservations array within beach chair, implement FIFO
   * 2. Inquire Product for a limitation of maximum reservations
   * 3. Create a Reservations collection, and drop the same redundant data in two places:
   *    a. The reservations array prop in chair as a nested document
   *    b. Reservations collection as a document
   */
}

export const ChairSchema = SchemaFactory.createForClass(Chair);

ChairSchema.index({ id: 1 }, { unique: true, name: 'IDX-Chair-id' });
ChairSchema.index({ qr_code: 1 }, { unique: true, name: 'IDX-Chair-qr_code' });
