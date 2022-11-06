import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { AuthorComponent } from './components/author/author.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthorCreateComponent } from './components/author/author-create/author-create.component';
import { BookComponent } from './components/book/book.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { LandingPageComponent } from './components/landing-page.component';
import { BookViewComponent } from './components/book/book-view/book-view.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    AuthorComponent,
    AuthorCreateComponent,
    BookComponent ,
    BookCreateComponent,
    BookViewComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatInputModule, 
    MatCardModule ,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
