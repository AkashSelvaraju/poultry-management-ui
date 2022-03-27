import { Observable, of } from 'rxjs';

export enum ErrorCodes {
    Unauthorized = 1,
    UserNotFound,
    InvalidCredentials,
    Username_Taken,
    InvalidOperation,
}

export function errorHandler<T>(
    operation: string,
    returnval?: T,
    options?: {
        apiErrorCallback?: (err: any) => Observable<T>;
        httpErrorCallback?: (err: any) => Observable<T>;
    }
) {
    return (err: any): Observable<T> => {
        if (err.error.type === 'api_error') {
            console.log(operation, 'API_ERROR', err.error);
            if (options?.apiErrorCallback)
                return options.apiErrorCallback(err.error);
            if (returnval === undefined) throw err.error;
        } else if (err.error.type === 'http_error') {
            console.log(operation, 'HTTP_ERROR', err);
            if (options?.httpErrorCallback)
                return options.httpErrorCallback(err);
            if (returnval === undefined) throw err;
        } else {
            console.log(operation, err);
            throw err;
        }
        return of(returnval as T);
    };
}
