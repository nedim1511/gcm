import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterModel } from "src/app/models/register.model";
import { AUTH_API_URL } from "src/app/shared/constants";
import { SafariViewController } from "@ionic-native/safari-view-controller/ngx";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private readonly URL = AUTH_API_URL + "/dbconnections/signup";

  constructor(private http: HttpClient) {}

  register(registerModel: RegisterModel): Observable<RegisterModel> {
    return this.http.post(this.URL, registerModel);
  }
}
