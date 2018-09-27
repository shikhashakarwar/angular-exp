import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:3000/api/v1/user/";
  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.http.get(this.apiUrl + 'info');
  }
}
