import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CourseLevel } from '../types/course.types';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: CourseLevel.BEGINNER })
  level: string;

  @Prop()
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
