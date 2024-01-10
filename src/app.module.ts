import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { listsModule } from './Lists/lists.module';
import {MongooseModule} from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [listsModule, 
    AuthModule, 
    MongooseModule.forRoot('mongodb+srv://Grocery-Shopping-List:5KUaMvActA4cSSdM@cluster1.xpkz4bk.mongodb.net/?retryWrites=true&w=majority'), 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
