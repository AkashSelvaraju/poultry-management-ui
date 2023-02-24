import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, forkJoin, Observable, of, zip } from 'rxjs';
import { FarmService } from 'src/app/common/service';

import { UserService } from '../../common/service/user.service';

@Injectable({ providedIn: 'root' })
export class UserProfileResolver implements Resolve<any> {
    constructor(
        private userService: UserService,
        private farmService: FarmService,
        private router: Router
    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let user = this.userService.getUser(route.params['id']);
        let userFarms = this.farmService.getFarms(route.params['id']);
        return zip([user, userFarms], (user, userFarms) => {
            return { user: user, userFarms: userFarms };
        }).pipe(
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
