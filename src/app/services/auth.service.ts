import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    constructor(private myRouter: Router) {


    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         if (!localStorage.getItem('token')) {
            this.myRouter.navigate(['/login'])
            return false

        } else {
            return true

        }

    }
}
