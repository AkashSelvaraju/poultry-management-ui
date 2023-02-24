import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { errorHandler } from '../error/errorhandler';
import { IFarm } from '../interface';
import { IUser } from '../interface/user';

@Injectable()
export class FarmService {
    constructor(private http: HttpClient) {}

    addFarm(userId: string, farmData: {}): Observable<IUser> {
        return this.http
            .post<any>('/api/...', userId, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                map((response) => response.user),
                catchError(errorHandler<IUser>(`addFarm:${userId}`))
            );
    }

    updateFarm(userId: string, farmData: {}): Observable<IUser> {
        return this.http
            .patch<IUser>(`/api/users/${userId}`, farmData)
            .pipe(catchError(errorHandler<IUser>('editUser')));
    }
    getFarms(userId: string): Observable<IFarm[]> {
        return this.http
            .get<IFarm[]>(`/api/users/${userId}`, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(catchError(errorHandler<IFarm[]>(`getFarm:${userId}`)));
    }
}
