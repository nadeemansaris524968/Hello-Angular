import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from './../common/app.error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

    constructor(private http: Http, private url: string) { }

    getAll() {
        return this.http.get(this.url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    create(resource) {
        // Uncomment this to test fail scenario for optimistic approach
        // return Observable.throw(new AppError());

        return this.http.post(this.url, JSON.stringify(resource))
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(resource) {
        return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id) {
        // Uncomment this to test fail scenario for optimistic approach
        // return Observable.throw(new AppError());

        return this.http.delete(this.url + '/' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        if (error.status === 400)
            return Observable.throw(new BadInputError(error.json()));

        if (error.status === 404)
            return Observable.throw(new NotFoundError()); // Legitimate error, not saving

        return Observable.throw(new AppError(error));
    }
}
