import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CardListItem } from "../models/card-list-item.model";
import { BACKEND_API_URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class Tab3Service {
  private readonly URL = BACKEND_API_URL + "/api/gcm";

  constructor(private http: HttpClient) {}

  public getScannedData(code: string): Observable<CardListItem> {
    return this.http.get<CardListItem>(this.URL + "/findByCode/" + code);
  }

  public getScannedDataByUrl(url: string): Observable<CardListItem> {
    return this.http.get<CardListItem>(url);
  }
}
