import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User, UserLogin } from '../models/user';
import { environment } from '../../environments/environment';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http:HttpClient,
    private authService: AuthService,
  ) { }

  async login(login:UserLogin):Promise<User>{
    return this.http.post<User>(`${environment.url}/users/login`, login).toPromise();
  }

  async addUser(user:User):Promise<User>{
    return this.http.post<User>(`${environment.url}/users`, user).toPromise();
  }

  listUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.url}/users`);
  }

  async getMe():Promise<User>{
    return this.http.get<User>(`${environment.url}/users/me`).toPromise();
  }

  async getUser(id):Promise<User>{
    return this.http.get<User>(`${environment.url}/users/${id}`).toPromise();
  }

  async updateUser(user:User):Promise<User>{
    return this.http.put<User>(`${environment.url}/users`, user).toPromise();
  }
  
  async delUser(user:User):Promise<User>{
    return this.http.delete<User>(`${environment.url}/users/${user.id}`).toPromise();
  }

}
