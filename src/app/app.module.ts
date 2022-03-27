import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginGuard, AdminGuard } from './common/guard';
import { AuthService, TOASTR_TOKEN } from './common/service';
import { Error404Component } from './error-404.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent, UserProfileComponent, UserService } from './user';
import { appRoutes } from './routes';
import { UserProfileResolver } from './user/profile/user-profile.resolver';
import { UserProfilePopupComponent } from './header/profile-popup/profile-popup.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { RegistrationComponent } from './registration/registration.component';
import { FarmDetailsComponent } from './registration/farm-details/farm-details.component';
import { FarmGuidlinesComponent } from './registration/farm-guidlines/farm-guidlines.component';

declare let toastr: any;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MaterialModule,
        ScrollingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SignupComponent,
        UserProfileComponent,
        Error404Component,
        UserProfilePopupComponent,
        AddUserComponent,
        RegistrationComponent,
        FarmDetailsComponent,
        FarmGuidlinesComponent,
    ],
    providers: [
        AuthService,
        UserService,
        UserProfileResolver,
        LoginGuard,
        { provide: TOASTR_TOKEN, useValue: toastr },
        AdminGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
