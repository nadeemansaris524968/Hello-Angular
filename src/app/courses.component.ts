import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        <h2>{{title}}</h2>
        <img [src]="imageURL" />
    `
})
export class CoursesComponent {
    title = "List of courses";
    imageURL = "http://google.com/images/cats.png";
    courses;

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }
}
