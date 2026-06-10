import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
 
export class RegisterDto {
  @IsEmail({}, { message: 'Некоректний формат email' })
  email: string;
 
  @IsString()
  @MinLength(6, { message: 'Пароль має містити щонайменше 6 символів' })
  @MaxLength(72)
  password: string;
}
