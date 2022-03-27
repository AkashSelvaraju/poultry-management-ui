import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, forkJoin, Observable, of, zip } from 'rxjs';

import { UserService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class UserProfileResolver implements Resolve<any> {
    constructor(private userService: UserService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let user = this.userService.getUser(route.params['id']);
        let userHobbies = this.userService.getHobbies(route.params['id']);
        let allHobbies = this.userService.getAllHobbies();
        let userRoles = this.userService.getRoles(route.params['id']);
        let allRoles = this.userService.getAllRoles();

        return zip(
            [user, userHobbies, allHobbies, userRoles, allRoles],
            (user, userHobbies, allHobbies, userRoles, allRoles) => ({
                user,
                userHobbies,
                allHobbies,
                userRoles,
                allRoles,
            })
        ).pipe(
            catchError(() => {
                console.log(
                    'error resolving user profile data,., redirecting to home'
                );
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
