import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app.error';
import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe((response) => {
        this.posts = response.json();
      }, (error) => {
        console.log(error);
      });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';

    this.service.createPost(post)
      .subscribe(
      (response) => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
      },
      (error: AppError) => {
        if (error instanceof BadInputError) {
          // this.form.setErrors(error.originalError);
        }
        else {
          alert('Something unexpected occured.');
          console.log(error);
        }
      }
      );
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true})).subscribe((response) => {
    //   console.log(response.json());
    // });
    this.service.updatePost(post)
      .subscribe(
      (response) => {
        console.log(response.json());
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('Post not found.');

        console.log(error);
      }
      );
  }

  deletePost(post) {

    this.service.deletePost(post.id)
      .subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('Post has already been deleted')

        console.log(error);
      }
      );
  }

}
