import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
@Injectable()

export class RegisterService {

    constructor(private http: HttpClient) { }


    registerUser(data: any) {
        return this.http.post(env.baseUrl + 'Identities/register', data).pipe(catchError(err => { return throwError(err) }));
    }

    checkUserCode(teamCode: string, userCode: string): Observable<any> {
        return this.http.get(env.baseUrl + `Users/CheckUserCode?teamCode=${teamCode}&userCode=${userCode}`).pipe(catchError(err => { return throwError(err) }))
    }

    checkParentCode(parentCode: string): Observable<any> {
        return this.http.get(env.baseUrl + `Users/CheckUserCode`, { params: { parentCode: parentCode } }).pipe(catchError(err => { return throwError(err) }))
    }

}