import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers: {name: string, email: string}[] = [
        { name: "Dhrumil", email: "dhrumil11@gmail.com" },
        { name: "Dhrumil", email: "dhrumil12@gmail.com" },
        { name: "Dhrumil", email: "dhrumil13@gmail.com" }
    ]
    fetchUsers() {
        return this.fakeUsers
    }

    createUser(usersDetails: CreateUserType) {
        this.fakeUsers.push(usersDetails)
        return
    }

    fetchUserById(id: number){
        return { id: id, name: "Dhrumil", email: "dhrumil@gmail.com" }
    }
}
