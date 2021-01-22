import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardListItem } from "../models/card-list-item.model";
import { BACKEND_API_URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class Tab2Service {
  private readonly URL = BACKEND_API_URL + "/api/gcm";

  constructor(private http: HttpClient) {}

  get(): Observable<CardListItem[]> {
    return this.http.get<CardListItem[]>(this.URL + "/all");
  }

  find(id: number): Observable<CardListItem> {
    return this.http.get(this.URL + "/findById/" + id);
  }
}
