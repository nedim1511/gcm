import { Injectable } from '@angular/core';
import { AUTH_API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly URL = AUTH_API_URL + '/dbconnections/signup';

  constructor() { }

  register() {}
}
