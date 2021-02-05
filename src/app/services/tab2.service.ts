import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { CardListItem } from "../models/card-list-item.model";
import { BACKEND_API_URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class Tab2Service {
  private readonly URL = BACKEND_API_URL + "/api/gcm";

  constructor(private http: HttpClient, private storage: Storage) {}

  get(): Observable<CardListItem[]> {
    return this.http.get<CardListItem[]>(this.URL + "/all");
  }

  find(id: number): Observable<CardListItem> {
    return this.http.get(this.URL + "/findById/" + id);
  }

  redeem(id: number, newAmount: number): Observable<CardListItem> {
    return this.http.put(this.URL + "/redeem/" + id, { newAmount });
  }

  topUp(id: number, newAmount: number): Observable<CardListItem> {
    return this.http.put(this.URL + "/topup/" + id, {
      setAmount: true,
      amount: newAmount,
    });
  }

  issue(
    amount: number,
    shareAsAddress?: string,
    shareAsType?: string
  ): Observable<CardListItem> {
    return this.http.post(this.URL + "/issue", {
      amount,
      shareAsAddress,
      shareAsType,
    });
  }
}
