import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Book_View } from 'src/app/models/book_view';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector: 'app-book-view',
    templateUrl: './book-view.component.html',
    styleUrls: ['./book-view.component.scss']
})

export class BookViewComponent implements OnInit{

    //public books: Book_View[] = [] ;
    public book: Book = {
        author: '',
        title: '',
        isbn: ''
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _snackBarService: SnackBarService,
        private _bookService: BookService,
        private dialog: MatDialog,
        private _loaderService: LoaderService,
        

    ){}
  
    ngOnInit(): void {
        this._bookService.getSingle(this.data._id).subscribe(result =>{
            if(result.message === 'success'){
                this.book = result.data;
                this._loaderService.setStatus(false);
                console.log(this.book);
            }
        }, error =>{
            this._loaderService.setStatus(false);
            this._snackBarService.showMessage(error.error.error);
        })
    }
    onClose(){
        this.dialog.closeAll();
    }
}