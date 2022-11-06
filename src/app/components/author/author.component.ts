import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthorService } from 'src/app/services/author.service';

import { Author } from 'src/app/models/author';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.scss']
})

export class AuthorComponent implements OnInit{
    public authors: Author[] = [];
    public authorSub: Subscription | undefined
    constructor(
        private dialog:MatDialog,
        private _snackerBarService: SnackBarService,
        private _loaderService: LoaderService,
        private _authorService: AuthorService
    ){}
    ngOnInit(): void {
        this._loaderService.setStatus(true);
        this._authorService.gettAll().subscribe(result => {
            if( result.message === 'success'){
                this.authors = result.data;
                this._loaderService.setStatus(false);
            }
        }, error => {
            this._loaderService.setStatus(false);
            this._snackerBarService.showMessage(error.error.error);
        });
    }
    public onCreate(): void {
        this.dialog.open(AuthorCreateComponent, {
          width: '500px',
          maxWidth: '90vh',
          maxHeight: '150vh'
        });
      }
    
      public onEdit(ID:string): void {
        this.dialog.open(AuthorCreateComponent, {
          width: '500px',
          maxWidth: '90vh',
          maxHeight: '150vh',
          data:{
            isEdit:true,
            _id:ID
          }
        });
      }


}