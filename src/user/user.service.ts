
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}


      async validateUser(details:CreateUserDto){
        console.log('User Service');
        console.log(details);
        const user =this.usersRepository.findOneBy({email:details.email});
    
        if(user)return user;  
        
        const newUser=this.usersRepository.create(details);
        return this.usersRepository.save(newUser);
      }

      async findUser(id: number) {
        const user = await this.usersRepository.findOneBy({ id });
        return user;
      }
}
