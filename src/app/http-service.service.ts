import { Injectable } from '@angular/core';
import { Constants } from "./constants";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  };

  Upload(url: string, file: any):Observable<any>{
    let formData = new FormData();
    formData.append('upload', file);
    return this.http.post<any>(url,formData).pipe(
      map(this.extractData),
      catchError(this.handleError<any>(url + " post failed"))
    );
  }

  Post(url: string, param: any):Observable<any>{
    return this.http.post<any>(url, param).pipe(
      map(this.extractData),
      catchError(this.handleError<any>(url + " post failed"))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
