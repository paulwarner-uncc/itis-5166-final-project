import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, AppSettings } from './appsettings';
import { Observable, Subject, catchError } from 'rxjs';

type HttpVerb = "get" | "post" | "patch" | "delete";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated: Subject<boolean> = new Subject<boolean>();

  // TODO: replace with non-debug jwt
  //private jwt: string|null = null;
  private jwt: string|null = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIn0.Q-Do1hG5vqhGlMtbuCrCQygPC1zBQWe7KkbC4bOVRu8";
  private promptTimer: number|null = null;
  private logoutTimer: number|null = null;

  constructor(private http: HttpClient) { }

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

  logout() {
    this.setJwt(null);
  }

  sendAuthorizedRequest(method: HttpVerb, url: string, body?: object): Observable<ApiResponse> {
    let response: Observable<ApiResponse>;
    if (method === "get") {
      response = this.http.get<ApiResponse>(
        url,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      );
    } else if (method === "post") {
      response = this.http.post<ApiResponse>(
        url,
        body,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      );
    } else if (method === "patch") {
      response = this.http.patch<ApiResponse>(
        url,
        body,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      );
    } else if (method === "delete") {
      response = this.http.delete<ApiResponse>(
        url,
        {
          headers: {
            "Authorization": `Bearer ${this.jwt}`
          }
        }
      );
    }
    else {
      response = null as any;
    }

    return response.pipe(catchError(this.handleError));;
  }

  private setJwt(jwt: string|null) {
    this.jwt = jwt;

    // Push the new authenticated status out
    this.isAuthenticated.next(jwt !== null);

    // If the jwt is getting unset, no need to set timeouts to prompt for renewal, just return
    if (jwt === null) {
      // Clear any remaining timers if necessary
      if (this.promptTimer !== null) {
        window.clearTimeout(this.promptTimer);
      }
      if (this.logoutTimer !== null) {
        window.clearTimeout(this.logoutTimer);
      }

      return;
    }

    // Set timeout to remove token due to expiration
    this.logoutTimer = window.setTimeout(() => {
      //this.jwt = null;
      this.setJwt(null);
      console.log("nulling");
    }, 60 * 1000);

    // Set timeout to prompt to refresh token
    this.promptTimer = window.setTimeout(() => {
      this.promptRefresh();
    }, 40 * 1000);
  }

  private promptRefresh() {
    // If already signed out, don't prompt for a refresh
    if (this.jwt === null) {
      return;
    }

    if(confirm("Your session is about to expire. Would you like to renew it?")) {
      this.sendAuthorizedRequest("post", AppSettings.API_ENDPOINT + "/auth/refresh", {})
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
}
