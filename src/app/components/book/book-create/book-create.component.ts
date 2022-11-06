import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
    selector:'app-book-create',
    templateUrl:'./book-create.component.html',
    styleUrls:['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit{

    public authors: Author [] = [];
    @Input() author: Author | undefined;
    public book: Book = {
        author: '',
        title: '',
        isbn: ''
    }
    public error = {
        author:false,
        title:false,
        isbn:false
    }

    public isLoading:boolean = true;
    private isLoadingSub: Subscription | undefined;

    constructor(
        private dialog:MatDialog,
        private _authorService: AuthorService,
        private _bookService: BookService,
        private _snackBarService: SnackBarService,
        private _loaderService: LoaderService,
        private router:Router,

    ){}
    ngOnInit(): void {
        this._loaderService.setStatus(true);
        this._authorService.gettAll().subscribe(result => {
            if(result.message === 'success'){
                this.authors = result.data;
                this._loaderService.setStatus(false);
                console.log(this.authors);
            }
        }, error=>{
            this._loaderService.setStatus(false);
            this._snackBarService.showMessage(error.error.error);
        });
        this.isLoadingSub = this._loaderService.getStatus().subscribe(result => {
            this.isLoading = result;
        });
    }
    public onClose(): void{
        this.dialog.closeAll();
    }
    public onSubmit(): void{
        if(this.isFormValid() === false){
            return;
        }
        this._bookService.create(this.book).subscribe (result => {
            if(result.message === 'success'){
                this.router.navigate(['/books']);
                this.dialog.closeAll();
                this._snackBarService.showMessage('Book Created Successfully');
                this._loaderService.setStatus(false);
            }
        }, error =>{
            this._loaderService.setStatus(false);
            this._snackBarService.showMessage(error.error.eroor)
        });
        
    }

    public isFormValid(): boolean{
        if(this.book.author === ''){
            this._snackBarService.showMessage(`Author is Required`);
            return false;
        }else if (this.book.title === ''){
            this._snackBarService.showMessage(`Title is Required`);
            return false;
        }else if (this.book.isbn === ''){
            this._snackBarService.showMessage(`isbn is Required`);
            return false;
        }else{
            return true;
        }
    }
    
}