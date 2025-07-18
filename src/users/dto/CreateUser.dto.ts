import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    age?: number
}