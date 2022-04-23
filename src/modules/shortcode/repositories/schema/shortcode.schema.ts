import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { PluginCreatedDate } from 'src/database/plugins/created_date';
import { PluginUpdatedDate } from 'src/database/plugins/updated_date';


export type ShortcodeDocument = Shortcode & Document;

@Schema({ versionKey: false })
export class Shortcode {
  // Automatically generated by mongodb
  // @Prop()
  // _id: Types.ObjectId;
  // @Transform(({ value }) => value.toString())
  // _id: ObjectId;

  @Prop({ required: true, trim: true, unique: true})
  shortcode: string;

  // we can put unique url, but right now ignore it
  @Prop({ required: true, lowercase: true, trim: true })
  url: string;

  @Prop({ required: true,})
  startDate: Date;

  @Prop({ default: null})
  lastSeenDate: Date | null;

  @Prop({  default:null})
  redirectCount: number | null;
}

export const ShortcodeSchema = SchemaFactory.createForClass(Shortcode);
