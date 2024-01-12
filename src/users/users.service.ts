import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.model'
import { List, ListDocument } from 'src/Lists/lists.model';
import { Mongoose } from 'mongoose';



@Injectable()
export class UsersService {
    constructor (
        @InjectModel('user') private readonly userModel: Model<UserDocument>,
        @InjectModel('List') private readonly listModel: Model<ListDocument>,
    ) {}
   

    async getUser(query: object ): Promise <User> {
        return this.userModel.findOne(query);
    }



    async getUserById(userId): Promise<User> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  


    async editUser(userId: string, updatedUser: Partial<User>): Promise<User> {
      const user = await this.userModel.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  


    async deleteUser(userId: string): Promise<void> {
      const user = await this.userModel.findByIdAndDelete(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }
  
    

    async getAllUsers(): Promise<any> {
      const users = await this.userModel.find();
      return users;
    }



   
    async createList(userId: string, date: string, content: string): Promise<any> {
        const user = await this.userModel.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
              


        const list = new this.listModel({
          date,
          content,
        });

      
        user.List.push(list);
        await user.save();
      
        return list;
      }

      

      async getLists(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId).populate('List');
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        return user.List;
      }
      


      async getListById(userId, listId: string): Promise<List> {
        
        // console.log(userId);
        // console.log(listId);


        const user = await this.userModel.findById(userId);
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const list = user.List.find((l) => l._id.toString() === listId);
        if (!list) {
          throw new NotFoundException('List not found');
        }
    
        return list.toJSON();
      }
    

      async updateList(userId, listId: string, date: string, content: string): Promise<List> {

        console.log(userId);
        console.log(listId);
      
        const user = await this.userModel.findById(userId);
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
        console.log(user.List);
        const list = user.List.find((l) => l._id.toString() === listId);
        if (!list) {
          throw new NotFoundException('List not found');
        }
    
        const updatedList = await this.listModel.findByIdAndUpdate(
          listId,
          {$set: {date: date, content: content}},
          { new: true }
        );
      
        if (!updatedList) {
          throw new NotFoundException('Updated list not found');
        }
      
        return updatedList;
      
      }


      async deleteList(userId: string, listId: string): Promise<void> {

        console.log(userId);
        console.log(listId);

        try {
          const user = await this.userModel.findById(userId);
    
          if (!user) {
            throw new NotFoundException('User not found');
          }
    
          user.List = user.List.filter((list) => list._id.toString() !== listId);
          await user.save();
        } catch (error) {
          throw new NotFoundException('List not found');
        }
      }
      



}
