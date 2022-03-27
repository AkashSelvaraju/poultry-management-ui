import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

import { errorHandler } from '../error';
import { IUser } from '../interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUser: BehaviorSubject<IUser | undefined>;
    isLoggedin: boolean = false;

    constructor(private http: HttpClient) {
        this.currentUser = new BehaviorSubject<IUser | undefined>(undefined);
    }

    private setCurrentUser(user?: IUser) {
        this.currentUser.next(user);
        this.isLoggedin = this.currentUser.value ? true : false;
    }

    isAuthenticated() {
        return this.isLoggedin;
    }

    isAdmin(): boolean {
        if (this.currentUser.value)
            return !!(this.currentUser.value.permission & 2);
        return false;
    }

    loginUser(username: string, password: string): Observable<boolean> {
        if (this.isLoggedin) this.logoutUser().subscribe();

        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let userCredential = { username: username, password: password };

        return this.http
            .post<IUser>('/api/auth/login', userCredential, options)
            .pipe(
                map((user: IUser) => {
                    this.setCurrentUser(user);
                    return this.isLoggedin;
                }),
                catchError(errorHandler<boolean>('loginUser'))
            );
    }

    logoutUser(): Observable<boolean> {
        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.post<any>('/api/auth/logout', {}, options).pipe(
            map((response: any) => {
                if (response.done) {
                    this.setCurrentUser();
                }
                return response.done;
            }),
            catchError(errorHandler('logoutUser', false))
        );
    }

    checkAuthentication(): Observable<boolean> {
        return this.http.get<IUser>('/api/auth/currentuser').pipe(
            tap((user: IUser) => {
                if (user instanceof Object) this.setCurrentUser(user);
            }),
            map((user) => !!user),
            catchError(errorHandler('checkAuthentication', false))
        );
    }
}
