import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        <h2>{{title}}</h2>
        <button class="btn btn-primary" [class.active]="isActive">Click Me!</button>
        <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />
    `
})
export class CoursesComponent {
    title = "List of courses";
    colspan = 2;
    courses;
    isActive = true;
    email = "me@example.com";

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }

    onKeyUp() {
        console.log(this.email);
    }
}
