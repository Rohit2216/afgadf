import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schemas'; // Correct import path

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    ) { }

    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find().exec();
        return books;
    }

    async create(book: Book): Promise<Book> {
        const createdBook = new this.bookModel(book);
        return await createdBook.save();
    }

    async findById(id: string): Promise<Book | null> {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateById(id: string, updateData: Partial<Book>): Promise<Book | null> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).exec();

        if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${id} not found.`);
        }

        return updatedBook;
    }

    async deleteById(id: string): Promise<Book | null> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        if (!deletedBook) {
            throw new NotFoundException(`Book with ID ${id} not found.`);
        }
        return deletedBook;
    }
}
