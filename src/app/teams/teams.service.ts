import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Teams } from "./models/teams.model";
@Injectable()

export class TeamsService {

    teamsList$ = new BehaviorSubject<Teams[]>([])

    constructor(private http: HttpClient) { }

    addTeams(data: any): Observable<any> {
        return this.http.post(env.baseUrl + 'teams', data).pipe(catchError(err => { return throwError(err) }))
    }

    getAllTeams() {
        this.http.get(env.baseUrl + 'teams').subscribe({
            next: (resp: any) => {
                if (resp.isSuccess) {
                    this.teamsList$.next(resp.data)
                } else {
                    this.teamsList$.next([])
                }
            }
        })
    }

  updateTeams(data: any): Observable<any> {
    return this.http.put(env.baseUrl + `Teams`, data).pipe(catchError(err => { return throwError(err) }))
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + `Teams/${id}`).pipe(catchError(err => { return throwError(err) }))
  }
}
