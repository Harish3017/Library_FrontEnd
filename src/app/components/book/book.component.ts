import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Book_View } from 'src/app/models/book_view';
import { BookService } from 'src/app/services/book.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookViewComponent } from './book-view/book-view.component';


@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit{

  //public books: Book[] = [];
  public books :Book_View [] = [];

  public authorSub: Subscription | undefined
    constructor(
        private dialog:MatDialog,
        private _snackerBarService: SnackBarService,
        private _loaderService: LoaderService,
        private _bookService: BookService
    ){}
    ngOnInit(): void {
      this._loaderService.setStatus(true);
      this._bookService.gettAll().subscribe(result => {
          if( result.message === 'success'){
              this.books = result.data;
              this._loaderService.setStatus(false);
          }
      }, error => {
          this._loaderService.setStatus(false);
          this._snackerBarService.showMessage(error.error.error);
      });
        
    }

    public onCreate(): void {
        this.dialog.open(BookCreateComponent, {
          width: '500px',
          maxWidth: '90vh',
          maxHeight: '150vh'
        });
      }
    public onView(ID:string):void{
      this.dialog.open(BookViewComponent,{
        width: '500px',
          maxWidth: '90vh',
          maxHeight: '150vh',
          data:{
            _id: ID,
          }
        
      });
    }
    

}