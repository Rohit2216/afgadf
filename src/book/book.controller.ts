import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas'; // Correct import path
import { CreateBookDto } from './dto/create-book-dto'; // Correct import path
import { UpdateBookDto } from './dto/update-book-dto'; // Correct import path and naming convention

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.create(createBookDto);
    }

    @Get(':id')
    async getBook(@Param('id') id: string): Promise<Book | null> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id') id: string,
        @Body() book: UpdateBookDto,
    ): Promise<Book> {
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    async deleteBook(
        @Param('id') id: string,
    ): Promise<Book> {
        return this.bookService.deleteById(id);
    }
}
