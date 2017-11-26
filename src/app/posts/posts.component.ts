import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  posts = [];

  constructor(private http: Http) {
    http.get(this.url).subscribe((response) => {
      this.posts = response.json();
    }, (error) => {
      console.log(error);
    });
   }

  createPost(input: HTMLInputElement){
    let post = { title: input.value };
    input.value = '';
    
    this.http.post(this.url, JSON.stringify(post)).subscribe((response) => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
    });
  }

  updatePost(post){
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true})).subscribe((response) => {
    //   console.log(response.json());
    // });
    this.http.put(this.url + '/' + post.id, JSON.stringify(post)).subscribe((response) => {
      console.log(response.json());
    });
  }

  ngOnInit() {
  }

}
