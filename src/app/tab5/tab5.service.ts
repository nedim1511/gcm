import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_API_URL} from '../shared/constants';
import {Observable} from 'rxjs';
import {UserModel} from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class Tab5Service {

  private readonly URL = BACKEND_API_URL + '/api/um/account';

  constructor(
      private http: HttpClient
  ) { }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post(this.URL, user);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.patch(this.URL + '/' + user.id, user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.URL + '/all');
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get(this.URL + '/' + id);
  }

  deleteUser(id?: string) {
    return this.http.delete(this.URL + '/' + id);
  }
}
