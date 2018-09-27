import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { qLocalForage } from "../services/quizStorage.service";

@Injectable() 
export class routeGuardService implements CanActivate {

    constructor(private localForage: qLocalForage, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let url = state.url;
        let _this = this;
        return this.validateRoute().then(function (valid: boolean) {
            // if route is valid, navigate to that url else to login
            if(valid) {
                // _this.router.navigate([url]);
            } else {
                _this.router.navigate(['/getStarted']);
            }
            return valid;
        });
    }

    validateRoute():Promise<boolean> {
        return this.localForage.getItem('user').then(function (value) {
            if (value && (value !== null || typeof(value)!= 'undefined')) {
                var keys = Object.keys(value);
                if (keys && keys.length) {
                    return true;
                } 
                return false;
            }
            return false;
        });
    }
}