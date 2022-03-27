import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!(await this.authService.checkAuthentication().toPromise()))
            this.router.navigate(['/user/login']);
        return this.authService.isLoggedin;
    }
}
