import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPost(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostById(postId: string): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts', {
        params: { id: postId },
      })
      .pipe(map((response) => response[0]));
  }

  getPostCommentsById(postId: string): Observable<any[]> {
    return this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/comments',
      {
        params: { postId: postId },
      }
    );
  }
}
