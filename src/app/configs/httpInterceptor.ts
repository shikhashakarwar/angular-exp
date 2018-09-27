import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpRequests } from "./httpRequest";
import { tap } from "rxjs/operators";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    constructor(private HttpRequests: HttpRequests) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = this.HttpRequests.request(req);
        return next.handle(cloneReq).pipe(
            tap (event => {
                if(event instanceof HttpResponse) {
                    console.log("Intercept response success");
                }
                }, error => {
                    console.log("Intercept response error");
                    this.HttpRequests.responseError(error);
                }
            )
        );
    }
}