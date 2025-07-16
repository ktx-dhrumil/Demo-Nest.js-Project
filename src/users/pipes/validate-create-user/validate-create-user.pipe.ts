import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log("Inside pipe validator.")
    console.log(value)
    console.log(metadata)
    const parseAgeToInt = parseInt(value.age.toString())
    if(isNaN(parseAgeToInt)){
      console.log(`${value.age} is not a number.`)
      throw new HttpException("Invalid data type for age.", HttpStatus.BAD_REQUEST)
    }
    console.log(`${parseAgeToInt} is a number. Returning.....`)
    return { ...value, age: parseAgeToInt }
  }
}
