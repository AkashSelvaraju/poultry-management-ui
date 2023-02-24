import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { errorHandler } from '../error/errorhandler';
import { IHobby, IRole, IUser } from '../interface/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    addUser(user: IUser): Observable<IUser> {
        return this.http
            .post<any>('/api/users/signup/', user, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                map((response) => response.user),
                catchError(errorHandler<IUser>('addUser'))
            );
    }

    editUser(
        userId: string,
        userData: {
            details?: {
                firstName?: string;
                lastName?: string;
                password?: string;
                newPassword?: string;
            };
            hobbies?: { add?: []; remove?: [] };
        }
    ): Observable<IUser> {
        return this.http
            .patch<IUser>(`/api/users/${userId}`, userData)
            .pipe(catchError(errorHandler<IUser>('editUser')));
    }
    getUser(userId: string): Observable<IUser> {
        return this.http
            .get<IUser>(`/api/users/${userId}`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<IUser>(`getUser:${userId}`)));
    }

    getUserList(): Observable<IUser[]> {
        return this.http
            .get<IUser[]>(`/api/users/all`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<IUser[]>('getAllUsers')));
    }

    getRoles(userId: string): Observable<IRole[]> {
        return this.http
            .get<IRole[]>(`/api/users/${userId}/roles`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<IRole[]>(`getRoles:${userId}`)));
    }
    getAllRoles(): Observable<IRole[]> {
        return this.http
            .get<IRole[]>(`/api/users/roles/all`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<IRole[]>('getAllRoles')));
    }

    deleteUser(userId: string): Observable<boolean> {
        return this.http
            .delete<boolean>(`/api/users/${userId}`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<boolean>('deleteUser')));
    }
}
