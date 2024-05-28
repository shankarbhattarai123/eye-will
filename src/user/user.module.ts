import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { GoogleStrategy } from 'src/user/utils/google.strategy';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [GoogleStrategy,SessionSerializer, {
    provide:'AUTH_SERVICE',
    useClass:UserService
  },],
})
export class UserModule {}
