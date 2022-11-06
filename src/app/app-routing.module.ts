import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorComponent } from './components/author/author.component';
import { AuthorCreateComponent } from './components/author/author-create/author-create.component';

import { BookComponent } from './components/book/book.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page.component';
import { BookViewComponent } from './components/book/book-view/book-view.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'author', component: AuthorComponent, children: [
    { path: 'create', component: AuthorCreateComponent }
  ]},
  { path: 'books', component: BookComponent, children:[
    { path: 'create', component: BookCreateComponent },
    { path: 'view/:id', component:BookViewComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
