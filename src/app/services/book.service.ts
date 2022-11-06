import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../models/ServiceResponse';
import { Book } from '../models/book';


const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})

export class BookService{

    private book: Book[] =[];

    private bookSub = new Subject<Book[]>();
    
    private loadingStatus = new Subject<boolean>();

    constructor(        
        private http: HttpClient,
    ){}

    public setLoadingStatus(status: boolean): void {
        this.loadingStatus.next(status);
    }
        
    public getLoadingStatus(): Observable<boolean> {
        return this.loadingStatus.asObservable();
    }
   
    public getBooks(): Book[] {
        this.bookSub.next(this.book);
        return this.book;
    }
     //Create Book
    public create(data: any): Observable<ServiceResponse> {
        return this.http.post<ServiceResponse>(`${API_URL}/book/`, data);
    }
     //Get All Books
    public gettAll(): Observable<ServiceResponse>{
        return this.http.get<ServiceResponse>(`${API_URL}/book/`)
    }

    public getAllSub(): Observable<Book[]>{
        return this.bookSub.asObservable();
    }
    //Get Single Book
    public getSingle(ID: string):Observable<ServiceResponse>{
        return this.http.get<ServiceResponse>(`${API_URL}/book/${ID}`);
    }
    
}