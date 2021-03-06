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
    // Data Service converts response to JavaScript Array
    this.service.getAll()
      .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(post)
      .subscribe(
        (newPost) => {
          post['id'] = newPost.id;
        },
        (error: AppError) => {
          this.posts.splice(0, 1);

          if (error instanceof BadInputError) {
            // this.form.setErrors(error.originalError);
          }
          else throw error;
        }
      );
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true})).subscribe((response) => {
    //   console.log(response.json());
    // });
    this.service.update(post)
      .subscribe(
        (updatedPost) => {
          console.log(updatedPost.json());
        });
  }

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {
          this.posts.splice(index, 0, post);
          
          if (error instanceof NotFoundError)
            alert('Post has already been deleted')
          else throw error;
        }
      );
  }

}
