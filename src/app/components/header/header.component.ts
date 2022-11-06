import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit  {
  public Background:boolean = false;
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(result =>{
      if(result.length > 0){
        if(result[0].path === 'author' || result[0].path === 'book'){
          this.Background = true;
        }else{
          this.Background = false;
        }
      }
    })
  }
  
}
