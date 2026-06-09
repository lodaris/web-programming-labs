import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва тегу не може бути порожньою' })
  @MaxLength(50)
  name: string;
}
