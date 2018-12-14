import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequests {
    public authToken = null;

    constructor(private router: Router) {}

    public setToken(token) {
        this.authToken = 'Bearer ' + token;
    }

    public request(request) {
        if (this.authToken) {
            const reqHeader = request.clone(
                {headers: request.headers.set('Authorization', this.authToken)});
                reqHeader.headers.set('Content-Type', 'Application/json');
            return reqHeader;
        } else {
            return request;
        }
    }

    public responseError(error) {
        if (error && error.status === 401) {
            console.log('Unauthorized request in HttRequest');
            this.router.navigate(['./logout']);
            return;
        }
        console.log('Response error');
        console.log(error);
    }
}
