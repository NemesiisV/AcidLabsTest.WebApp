import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@app/models/user.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private _httpClient: HttpClient) { }
  private readonly usersEndpoint = `${environment.urlApi}/users`;

  getUsers(): Observable<Array<UserModel>> {
    return this._httpClient.get<Array<UserModel>>(this.usersEndpoint);
  }

  getUser(userId: string): Observable<UserModel> {
    return this._httpClient.get<UserModel>(`${this.usersEndpoint}/${userId}`);
  }

  putUser(request: UserModel): Observable<any> {
    return this._httpClient.put(`${this.usersEndpoint}/${request.id}`, request);
  }

  postUser(request: UserModel): Observable<string> {
    return this._httpClient.post<string>(`${this.usersEndpoint}`, request);
  }

  deleteUser(userId: string): Observable<any> {
    return this._httpClient.delete(`${this.usersEndpoint}/${userId}`);
  }
}
