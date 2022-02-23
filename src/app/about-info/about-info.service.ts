import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutInfo, AboutInfoResponse } from './models/aboutInfo.model';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject, catchError, delay, map, Observable, shareReplay } from 'rxjs';
@Injectable()
export class AboutInfoService {

  aboutInfoList$ = new BehaviorSubject<AboutInfo[]>([]);

  constructor(private http: HttpClient) { }

  addAboutInfo(data: any): Observable<any> {
    return this.http.post(env.baseUrl + 'AboutInfos', data).pipe(catchError(err => { return err }));
  }

  getAllAboutInfo(): Observable<AboutInfo[]> {
    return this.http.get<AboutInfo[]>(env.baseUrl + 'AboutInfos').pipe(
      map((res: any) => res['data']),
      shareReplay()
    )
  }

  aboutInfoActivation(id: number): Observable<any> {
    return this.http.put(env.baseUrl + `AboutInfos/Activation/${id}`, null).pipe(catchError(err => { return err }));
  }

  editAboutInfo(data: AboutInfo): Observable<any> {
    return this.http.put(env.baseUrl + `AboutInfos`, data).pipe(catchError(err => { return err }));
  }
}
