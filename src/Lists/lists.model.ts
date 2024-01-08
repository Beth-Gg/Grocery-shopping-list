import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
    date: String,
    content: String
});

export interface List extends mongoose.Document {
    id: string;
    date: string;
    content: string;
}