import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'w8-project';

  postList: any[] = [];

  subs = new Subscription();

  constructor(private http: HttpClient){}

  ngOnInit(): void{
    this.getAllPostList();
  }

  getAllPostList(): void{
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').subscribe((list: any[]) =>{
      console.log(list);
      this.postList = list;
    })
  }
}
