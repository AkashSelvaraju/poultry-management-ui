import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (!this.authService.isAdmin()) {
            this.router.navigate(['/user/login']);
            return false;
        }
        return true;
    }
}
