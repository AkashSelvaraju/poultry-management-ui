import { Routes } from '@angular/router';

import { AdminGuard, LoginGuard } from './common/guard';
import { Error404Component } from './error-404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignupComponent, UserProfileComponent } from './user';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserProfileResolver } from './user/profile/user-profile.resolver';

export const appRoutes: Routes = [
    { path: 'user/login', component: LoginComponent },
    { path: 'user/signup', component: SignupComponent },
    {
        path: 'user/profile/:id',
        component: UserProfileComponent,
        canActivate: [LoginGuard],
        resolve: { profileData: UserProfileResolver },
    },
    {
        path: 'admin/add-users',
        component: AddUserComponent,
        canActivate: [LoginGuard, AdminGuard],
    },
    {
        path: 'register-farm',
        component: RegistrationComponent,
    },
    { path: 'home', component: HomeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '404', component: Error404Component },
    { path: '**', redirectTo: '404' },
];
