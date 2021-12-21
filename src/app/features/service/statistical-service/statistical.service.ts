import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticalService {
  statisticalURL = `${environment.baseURL}/parking`;
  // infoURL = `${environment.baseURL}/cap_nhat_tt_nguoi_dung`;
  // resetPassURL = `${environment.baseURL}/reset_password`;

  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();
  get refresh$() {
    return this._refresh$;
  }
  getStatisticals(size, num): Observable<any> {
    return this.http.get<any>(
      `${this.statisticalURL}/?page_size=${size}&page_num=${num}`
    );
  }
  
  // insert(user): Observable<any> {
  //   return this.http.post<any>(`${this.statisticalURL}`, user).pipe(
  //     tap(() => {
  //       this._refresh$.next();
  //     })
  //   );
  // }
  // update(id, user): Observable<any> {
  //   return this.http.put<any>(`${this.statisticalURL}/${id}`, user).pipe(
  //     tap(() => {
  //       this._refresh$.next();
  //     })
  //   );
  // }
  // delete(id): Observable<any> {
  //   return this.http.delete<any>(`${this.statisticalURL}/${id}?force=true`).pipe(
  //     tap(() => {
  //       this._refresh$.next();
  //     })
  //   );
  // }
  // changePassword(pass): Observable<any> {
  //   return this.http.put<any>(`${this.statisticalURL}`, pass);
  // }
  // updateInfo(info): Observable<any> {
  //   return this.http.put<any>(`${this.infoURL}`, info).pipe(
  //     tap(() => {
  //       this._refresh$.next();
  //     })
  //   );
  // }
  // resetPassword(id): Observable<any> {
  //   return this.http.put<any>(`${this.resetPassURL}/${id}`, {});
  // }
  // active(id, status): Observable<any> {
  //   return this.http
  //     .put<any>(`${this.statisticalURL}/block_user/?id=${id}&is_block=${status}`, {})
  //     .pipe(
  //       tap(() => {
  //         console.log('next')
  //         this._refresh$.next();
  //       })
  //     );
  // }
}
