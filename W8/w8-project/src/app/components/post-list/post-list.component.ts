import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: any[] = [];

  subs: Subscription | undefined;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.getAllPostList();
  }

  getAllPostList(): void {
    this.subs = this.service.getAllPost().subscribe((list: any[]) => {
      this.postList = list;
    });
  }

  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }
}
