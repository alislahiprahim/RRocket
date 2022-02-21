import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutInfo, AboutInfoResponse } from './models/aboutInfo.model';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject, catchError, delay, Observable } from 'rxjs';
@Injectable()
export class AboutInfoService {

  aboutInfoList$ = new BehaviorSubject<AboutInfo[]>([]);

  constructor(private http: HttpClient) { }

  addAboutInfo(data: any): Observable<any> {
    return this.http.post(env.baseUrl + 'AboutInfos', data).pipe(catchError(err => { return err }));
  }

  getAllAboutInfo() {
    this.http.get(env.baseUrl + 'AboutInfos').subscribe({
      next: (resp: any) => {
        if (resp.isSuccess) {
          this.aboutInfoList$.next(resp.data)
        } else {
          this.aboutInfoList$.next([])
        }
      }
    })
  }

  aboutInfoActivation(id: number): Observable<any> {
    return this.http.put(env.baseUrl + `AboutInfos/Activation/${id}`, null).pipe(catchError(err => { return err }));
  }

  editAboutInfo( data: AboutInfo): Observable<any> {
    return this.http.put(env.baseUrl + `AboutInfos`, data).pipe(catchError(err => { return err }));
  }
}
