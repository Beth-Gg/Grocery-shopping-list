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
      console.log(user.List);
        return user.List;
      }
    
      // async getListById(userId, listId: string): Promise<List> {
      //   // const userId = this.request.user.id; // Assuming you have user information in the request
      //   const user = await this.userModel.findById(userId).populate('List');
      //   console.log(userId);
      //   if (!user) {
      //     throw new NotFoundException('User not found');
      //   }
    
      //   const list = user.List.find((l) => l === listId.toString);
      //   if (!list) {
      //     throw new NotFoundException('List not found');
      //   }
    
      //   return list;
      // }
    
      async updateList(userId: string, listId: string, date: string, content: string): Promise<User> {
        // Find the user by ID
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        // Find the list within the user's lists
        const list = user.List.id(listId);
        if (!list) {
          throw new NotFoundException(`List with ID ${listId} not found`);
        }
    
        // Update the fields
        list.date = date;
        list.content = content;
    
        // Save the user document
        await user.save();
        return user;
      }
      
      //   // const userId = this.request.user.id; // Assuming you have user information in the request
      //   const user = await this.userModel.findById(userId).populate('List');
        
      //   if (!user) {
      //     throw new NotFoundException('User not found');
      //   }
    
      //   const list = user.List.findByIdAndUpdate (listId, { date, content }, {new: true});
      //   // console.log (l._id.toString)
      //   if (!list) {
      //     throw new NotFoundException('List not found');
      //   }

      //   await user.save();
    
      //   // Update the list using the mongoose model
      //   await this.listModel.findByIdAndUpdate(listId, { date, content }, { new: true } );
    
      //   // // Optional: You can fetch the updated list from the database if needed
      //   const updatedList = await this.listModel.findById(listId);
    
      //   // // Return the updated list
      //   return updatedList;
      // }

      // async updateList(userId, listId, date, content) {
      //   // Find the user by userId and populate the 'List' field
      //   const user = await this.userModel.findById(userId).populate('List');
      
      //   if (!user) {
      //     throw new NotFoundException('User not found');
      //   }
      
      //   // Find the specific list within the user's List array
      //   user.List = user.List.find((list) => list._id.toString() === listId);
      
      //   if (!user.List) {
      //     throw new NotFoundException('List not found');
      //   }
      
      //   // Update the properties of the list object
      //   user.List.date = date;
      //   user.List.content = content;
      
      //   // Save the updated user document (which will also update the embedded list)
      //   await user.save();
      
      //   // Return the updated list object
      //   return user.List;
      // }

      // async updateList(userId, listId, date, content) {
      //   // Find the user by userId and populate the 'List' field
      //   const user = await this.userModel.findById(userId).populate('List');
      
      //   if (!user) {
      //     throw new NotFoundException('User not found');
      //   }
      
      //   // Find the specific list within the user's List array

      //   const list = user.List.find(list => list._id.toString() === listId);      
      //   if (!list) {
      //     throw new NotFoundException('List not found');
      //   }
      
      //   // Update the properties of the list object
      //   list.date = date;
      //   list.content = content;
        
      
      //   // Save the updated user document (which will also update the embedded list)
      //   await user.save();
      
      //   // Return the updated list object
      //   return list;
      // }
      
      
      


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
      // async deleteList(userId: string, listId: string): Promise<void> {
      //   const user = await this.userModel.findById(userId);
      //   if (!user) {
      //     throw new NotFoundException('User not found');
      //   }
      
      //   user.List = user.List.filter((list) => list._id.toString() !== listId);
      //   await user.save();
      // }

      async deleteList(userId: string, listId: string): Promise<void> {
        // Find the user by ID
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        // Find the index of the list to be deleted
        const listIndex = user.List.findIndex((list) => list._id.toString() === listId);
        if (listIndex === -1) {
          throw new NotFoundException('List not found');
        }
    
        // Remove the list from the user's lists
        user.List.splice(listIndex, 1);
    
        // Save the updated user document
        await user.save();
      }
      



}
