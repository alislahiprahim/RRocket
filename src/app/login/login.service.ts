import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError, map } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Login } from "./login.model";

@Injectable()

export class LoginService {

    constructor(private http: HttpClient, private router: Router) { }

    login(data: Login): Observable<any> {
        return this.http.post(env.baseUrl + 'Identities/login', data).pipe(catchError((err) => { return throwError(err) }))
    }

    getToken() {
        return localStorage.getItem('token');
    }


    TokenIsExist() {
        let expire: any = localStorage.getItem("expire")
        if (expire) {
            if (expire < new Date().getTime() / 1000) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    logOut() {
        localStorage.clear()
        this.router.navigate(["/login"])
    }
}