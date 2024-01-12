import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ListService } from './lists.service';

@Controller()

export class ListsController {
    constructor(private readonly listsService: ListService) {}

    @Post('create')
    async createList(
        @Body('date') listDate: string, 
        @Body('content') listContent:string   
    ): Promise<{ id: any; }> {
        const generatedId = await this.listsService.insertList(listDate, listContent);
        return {id: generatedId};
    }

    @Get('allLists')
    async getAllLists()  {  
    const lists = await this.listsService.getLists();
    return lists;
    }

    @Get(':id')
    async getSingleList(@Param ('id') listId: string) {
        const List = await this.listsService.getList(listId);
        return List; 
    }

    @Patch(':id') 
    async editList(@Param('id') listId: string, 
    @Body('date') date: string, 
    @Body ('content') listContent: string) {

        const edited = await this.listsService.editList(listId, date, listContent);
        return null;
    }

    @Delete(':id')
    async deleteList(@Param('id') listId: string) {
        await this.listsService.deleteList(listId);
        return null;
    }
}
