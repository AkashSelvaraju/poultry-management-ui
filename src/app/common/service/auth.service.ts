import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

import { errorHandler } from '../error';
import { IUser } from '../interface';

const PERMISSIONS = { ADMIN: 4, DOCTOR: 1, USER: 2 };

@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUser: BehaviorSubject<IUser | undefined>;

    constructor(private http: HttpClient) {
        this.currentUser = new BehaviorSubject<IUser | undefined>(undefined);
    }

    private setCurrentUser(user?: IUser) {
        this.currentUser.next(user);
    }

    isAuthenticated() {
        return !!this.currentUser.value;
    }

    isAdmin(): boolean {
        if (this.currentUser.value)
            return !!(this.currentUser.value.permission & PERMISSIONS.ADMIN);
        return false;
    }

    isUser(): boolean {
        if (this.currentUser.value)
            return !!(this.currentUser.value.permission & PERMISSIONS.USER);
        return false;
    }

    isDoctor(): boolean {
        if (this.currentUser.value)
            return !!(this.currentUser.value.permission & PERMISSIONS.DOCTOR);
        return false;
    }

    loginUser(username: string, password: string): Observable<boolean> {
        if (this.isAuthenticated()) this.logoutUser().subscribe();

        let options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let userCredential = { username: username, password: password };

        return this.http
            .post<IUser>('/api/auth/login', userCredential, options)
            .pipe(
                map((user: IUser) => {
                    this.setCurrentUser(user);
                    return this.isAuthenticated();
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
            map(() => this.isAuthenticated()),
            catchError(errorHandler('checkAuthentication', false))
        );
    }
}
