import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardData } from "../models/dashboard-data.model";
import { BACKEND_API_URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class Tab1Service {
  private readonly URL = BACKEND_API_URL + '/api/gcm';

  constructor(private http: HttpClient) {}

  public getDashboardData(): Observable<DashboardData> {
    return this.http.get(this.URL + '/overview');
  }
}
