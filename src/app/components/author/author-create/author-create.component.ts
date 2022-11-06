import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorService } from 'src/app/services/author.service';
import { NgForm } from '@angular/forms';
import { Author } from 'src/app/models/author';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
    selector:'app-author-create',
    templateUrl:'./author-create.component.html',
    styleUrls:['./author-create.component.scss']
})
export class AuthorCreateComponent implements OnInit{

    public isEdit: boolean = false;
    public author: Author = {
        firstName: '',
        lastName: '',
        _id: ''
    }
    public error = {
        firstName:false,
        lastName:false,
    }

    public isLoading: boolean = true;

    constructor(
        @Inject (MAT_DIALOG_DATA) public data:any,
        private dialog:MatDialog,
        private router:Router,
        private _snackerBarService: SnackBarService,
        private _loaderService: LoaderService,
        private snackBar: MatSnackBar,
        private _authorService: AuthorService
    ){}
    ngOnInit(): void {
        this.isEdit = this.data.isEdit;

        if( this.isEdit === true){
            this._authorService.getSingle(this.data._id).subscribe(result =>{
                if(result.message === 'success'){
                    this.author = result.data;
                    this._loaderService.setStatus(false);
                }
            }, error =>{
                this._loaderService.setStatus(false);
                this._snackerBarService.showMessage(error.error.error);
            });
        }
    }
    public onClose(): void{
        this.dialog.closeAll();
    }
    
    onSubmit(form:NgForm){
        if(this.isFormValid() === false){
            return;
        }
        if(this.isEdit === true){
            this._authorService.update(this.data._id,form.value).subscribe(result => {
                if(result.message === 'success'){
                    this.dialog.closeAll();
                    this._loaderService.setStatus(false);
                    this._snackerBarService.showMessage('Author Updated Successfully');
                }
            },error =>{
                this._loaderService.setStatus(false);
                this._snackerBarService.showMessage(error.error.error);
            })
        } else{
        this._authorService.create(this.author).subscribe (result => {
            if(result.message === 'success'){
                this.router.navigate(['/author']);
                this.dialog.closeAll();
                this._snackerBarService.showMessage('Author Created Successfully');
                this._loaderService.setStatus(false);
            }
        }, error =>{
            this._loaderService.setStatus(false);
            this._snackerBarService.showMessage(error.error.eroor)
        });
       } 
    }

    public isFormValid(): boolean{
        if(this.author.firstName === ''){
            this._snackerBarService.showMessage(`First Name is Required`);
            return false;
        }else if (this.author.lastName === ''){
            this._snackerBarService.showMessage(`Last Name is Required`);
            return false;
        }else{
            return true;
        }
    }
    
}