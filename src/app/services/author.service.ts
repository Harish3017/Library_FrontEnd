import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from '../models/author';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../models/ServiceResponse';

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthorService{

    private author: Author[] = [];

    private authorSub = new Subject<Author[]>();

    private loadingStatus = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,

    ){}

    public setLoadingStatus(status: boolean): void {
        this.loadingStatus.next(status);
      }
    
    public getLoadingStatus(): Observable<boolean> {
        return this.loadingStatus.asObservable();
      }    

    public getAuthors(): Author[] {
        this.authorSub.next(this.author);
        return this.author;
    }
    //Author Create
    public create(data: any): Observable<ServiceResponse> {
      return this.http.post<ServiceResponse>(`${API_URL}/author/`, data);
    }
    //Authors Get All
    public gettAll(): Observable<ServiceResponse>{
        return this.http.get<ServiceResponse>(`${API_URL}/author/`)
    }

    public getAllSub(): Observable<Author[]>{
        return this.authorSub.asObservable();
    }
    //Author Get Single
    public getSingle(ID: string):Observable<ServiceResponse>{
      return this.http.get<ServiceResponse>(`${API_URL}/author/${ID}`);
    }
    //Author Update
    public update(ID: string, data: any): Observable<ServiceResponse> {
    return this.http.patch<ServiceResponse>(`${API_URL}/author/${ID}`, data);
    }
}