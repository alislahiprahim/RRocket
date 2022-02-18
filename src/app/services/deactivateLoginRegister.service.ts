import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
    providedIn: 'root'
})
export class DeactivateLoginRegister implements CanDeactivate<CanComponentDeactivate> {
    
    constructor(private myRouter: Router) {}

    canDeactivate(component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

        if (localStorage.getItem('token')) {
            this.myRouter.navigate(['/login'])
            return false

        } else {
            return true

        }
    }
}
