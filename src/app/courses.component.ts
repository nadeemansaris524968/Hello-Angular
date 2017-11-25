import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        <h2>{{title}}</h2>
        <table>
            <tr>
                <td [attr.colspan]="colspan"></td>
            </tr>
        </table>

    `
})
export class CoursesComponent {
    title = "List of courses";
    colspan = 2;
    courses;

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }
}
