import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginGuard, AdminGuard } from './common/guard';
import {
    AuthService,
    TOASTR_TOKEN,
    FarmService,
    UserService,
} from './common/service';
import { Error404Component } from './error-404.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';

declare let toastr: any;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ScrollingModule,
        AppHeaderModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        FooterComponent,
        SignupComponent,
        Error404Component,
    ],
    providers: [
        AuthService,
        UserService,
        FarmService,
        LoginGuard,
        { provide: TOASTR_TOKEN, useValue: toastr },
        AdminGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
