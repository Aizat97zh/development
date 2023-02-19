import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: any;
  comments: any[] = [];

  subs: Subscription | undefined;

  constructor(private aRoute: ActivatedRoute, private router: Router, private service: PostService) {}

  ngOnInit(): void {
    this.aRoute.params.subscribe((params) => {
      const postId = params['id'];
      this.getPostDetail(postId);
      this.getPostComments(postId);
    });
  }

  getPostDetail(postId: string): void {
    this.subs = this.service.getPostById(postId).subscribe((post) => {
      this.post = post;
    });
  }

  getPostComments(postId: string): void {
    this.subs = this.service
      .getPostCommentsById(postId)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  goBack(): void{
    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
