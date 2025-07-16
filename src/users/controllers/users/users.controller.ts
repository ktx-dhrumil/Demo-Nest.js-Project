import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

interface Posts{
    name: string;
    post: string;
    likes: number;
}

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()  // using get decorator and returning array of objects
    getUsers(): {}[]{
        return [{ msg: "User Controller Working(Get)", success: true }]
    }

    @Post() /* using post decorators along with req and res decorators
    with type annotation with Request and Response types from express module */
    getUsersDetails(@Req() req: Request, @Res() res: Response): void{
        // return [{ msg: "User Controller Working(Post).", success: true }]
        const incomingDate = req.headers['date'] || new Date().toISOString(); // Use current date if not provided
        const dateInIST = new Date(incomingDate);
        dateInIST.setMinutes(dateInIST.getMinutes() + 330);

        console.log('Original Date:', incomingDate);
        console.log('Date in IST:', dateInIST.toISOString());

        req.headers['date'] = dateInIST.toISOString();

        console.log(req.body);
        console.log(req.headers);
        res.send("Created(post). Date adjusted to IST.");
    }

    @Get("posts") // further sub routing by passing in get decorator 
    getUsersPosts(): Posts[]{
        return [{
            name: "Dhrumil", post: "url to image 1", likes: 10, 
        }]
    }

    @Post("create") /* using body decorator to send data using request.body 
    creating and type annotating the CreateUserDto to use the intellisense for accessing the parameter's property of the parameter */
    createUser(@Body() userData: CreateUserDto){
        console.log(`Hello ${userData.name} email: ${userData.email}`)
        return "Request body and DTO's."
    } 
    /* this method has some issues 
    if the userData will not fullfill the requirements as in the DTO it will still allow to create a post request
    so we need some validators for the same

    @Get(":id") // getting params out of the url
    getParams1(@Req() req: Request, @Res() res: Response){
        console.log(req.params)
        res.send(`Fetching params using the express way. ${req.params.id}`)
    } */
    
    @Get(":id/:postId") // getting params out of the url using the NestJs way using params decorator
    getParams(@Param('id', ParseIntPipe) id: number, @Param("postId") postId: string){
        console.log(id, postId)
        return { id, postId } // strings are printed as pure white while numbers as slight yellow
    }

    @Get("query") // query parameters are best for filtering 
    getQuery(@Query("sortBy") sortBy: string, @Query("bounded") bounded: boolean){
        console.log(sortBy, bounded)
        return { sortBy, bounded }
    }

    @Post("validated")// creating a create user using class validators
    @UsePipes(new ValidationPipe())
    createValidatedUser(@Body() userData: CreateUserDto){
        console.log(`User created successfully ${userData}`);
        return userData
    }

    @Get("service") // this endpoint will be returning the service method
    getFakeUsers(){
        return this.userService.fetchUsers()
    }

    @Post("create/service") // new ValidationPipe watches the annotations made in the DTO
    // and observes the object passed with the request that if it annotates with the DTO or not
    @UsePipes(new ValidationPipe())
    createUser1(@Body() userData: CreateUserDto){
        console.log(userData)
        return this.userService.createUser(userData)
    }

    @Get(":id") // using user service to fetch the users by it's id.
    getUserById(@Param("id", ParseIntPipe) id: number){
        const user = this.userService.fetchUserById(id)
        if(!user){
            throw new HttpException(`User with id not present.`, HttpStatus.BAD_REQUEST)
        }
        return user;
    }

    @Post("pipe")
    @UsePipes(new ValidationPipe())
    createUserPipe(@Body(ValidateCreateUserPipe) userData: CreateUserDto){
        console.log(10, "10")
        console.log(userData.age)
        return { age: userData.age }
    }
}