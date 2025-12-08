import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  level: string; // e.g., Beginner, Intermediate, Advanced

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
