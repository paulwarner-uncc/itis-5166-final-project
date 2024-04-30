import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, AppSettings } from './appsettings';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private jwt: string|null = null;
  private logoutTimer: number|null = null;

  login(username: string, password: string): Observable<ApiResponse> {
    let resp = this.http.post<ApiResponse>(
      AppSettings.API_ENDPOINT + "/auth/login",
      {username: username, password: password}
    );

    resp.subscribe(data => {
      if (data.success) {
        this.setJwt((data.data as any).jwt);
      }
    });

    return resp.pipe(catchError(this.handleError));
  }

  signup(username: string, password: string): Observable<ApiResponse> {
    let resp = this.http.post<ApiResponse>(
      AppSettings.API_ENDPOINT + "/auth/signup",
      {username: username, password: password}
    );

    return resp.pipe(catchError(this.handleError));
  }

  sentAuthorizedRequest(method: "get" | "post", url: string, body: object|undefined): Observable<ApiResponse> {
    if (method === "get") {
      return this.http.get<ApiResponse>(
        url,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      ).pipe(catchError(this.handleError));
    } else {
      return this.http.post<ApiResponse>(
        url,
        body,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      ).pipe(catchError(this.handleError));
    }
  }

  isAuthenticated() {
    return this.jwt !== null;
  }

  private setJwt(jwt: string) {
    this.jwt = jwt;

    // Set timeout to remove token due to expiration
    this.logoutTimer = window.setTimeout(() => {
      this.jwt = null;
      console.log("nulling");
    }, 60 * 1000);

    // Set timeout to prompt to refresh token
    window.setTimeout(() => {
      this.promptRefresh();
    }, 5 * 1000); // TODO: make this 40 * 1000
  }

  private promptRefresh() {
    // If already signed out, don't prompt for a refresh
    if (this.jwt === null) {
      return;
    }

    if(confirm("Your session is about to expire. Would you like to renew it?")) {
      this.sentAuthorizedRequest("post", AppSettings.API_ENDPOINT + "/auth/refresh", {})
        .subscribe(data => {
          if (data.success) {
            if (this.logoutTimer != null) {
              window.clearTimeout(this.logoutTimer);
            }
            this.setJwt((data.data as any).jwt);
          } else {
            // TODO: handle errors properly
            console.log(`ERROR: ${JSON.stringify(data)}`);
          }
      });
    }
  }

  private handleError(err: any): Observable<ApiResponse> {
    return new Observable((subscriber) => {
      subscriber.next(err.error);
      subscriber.complete();
    });
  }

  constructor(private http: HttpClient) { }
}
