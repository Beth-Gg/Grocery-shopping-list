import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.model'
import { List, ListDocument } from 'src/Lists/lists.model';



@Injectable()
export class UsersService {
    constructor (
        @InjectModel('user') private readonly userModel: Model<UserDocument>,
        @InjectModel('List') private readonly listModel: Model<ListDocument>,
    ) {}

    async createUser(username: string, password: string, role: string): Promise<User> {
        //await maybe
        return this.userModel.create({
            username,
            password,
            role,
        });
    }

    async getUser(query: object ): Promise <User> {
        return this.userModel.findOne(query);
    }

    /////


    async getUserById(userId): Promise<User> {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  //needs author
    async editUser(userId: string, updatedUser: Partial<User>): Promise<User> {
      const user = await this.userModel.findByIdAndUpdate(userId, updatedUser, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  //needs author
    async deleteUser(userId: string): Promise<void> {
      const user = await this.userModel.findByIdAndDelete(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }
  
    // this isnot working

    async getAllUsers(): Promise<any> {
      const users = await this.userModel.find().exec();
      return users.map(li => ({
        id: li.id,
        username: li.username,
        password: li.password,
    }));
    }



    //// list functions


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
        // const userId = this.request.user.id; // Assuming you have user information in the request
        const user = await this.userModel.findById(userId).populate('List');
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const list = user.List.find((l) => l._id.toString() === listId);
        if (!list) {
          throw new NotFoundException('List not found');
        }
    
        return list;
      }
    
      async updateList(userId, listId: string, date: string, content: string): Promise<List> {
      
        // const userId = this.request.user.id; // Assuming you have user information in the request
        const user = await this.userModel.findById(userId).populate('List');
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const list = user.List.find((l) => l._id.toString() === listId);
        if (!list) {
          throw new NotFoundException('List not found');
        }
    
        // Update the list using the mongoose model
        await this.listModel.findByIdAndUpdate(listId, { date, content });
    
        // Optional: You can fetch the updated list from the database if needed
        const updatedList = await this.listModel.findById(listId);
    
        // Return the updated list
        return updatedList;
      }


    //   private async findList(id): Promise<List> {
    //     let list;
    //     try {
    //         list = await this.listModel.findById(id);
    //     }
    //     catch(error) {
    //         throw new NotFoundException('No such list!')
    //     }
    //     if(!list) {
    //         throw new NotFoundException('No such List!');
    //     }
    //     return list;
    // }


    //   async updateList (listId, date: string, listContent: string) {
    //     const editedList = await this.findList(listId);
    //     if(date) {
    //         editedList.date = date;
    //     }
    //     if(listContent) {
    //         editedList.content = listContent;  
    //     }

    //     return editedList;
    // }
      
      //
      async deleteList(userId: string, listId: string): Promise<void> {
        const user = await this.userModel.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        user.List = user.List.filter((list) => list._id.toString() !== listId);
        await user.save();
      }
      



}
