import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../common/service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
    username!: FormControl;
    password!: FormControl;
    loginForm!: FormGroup;
    mouseOverLogin: boolean = false;
    loginFailed?: boolean;
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.username = new FormControl();
        this.password = new FormControl();

        this.loginForm = new FormGroup({
            username: this.username,
            password: this.password,
        });
    }

    login(formValues: any) {
        this.authService
            .loginUser(formValues.username, formValues.password)
            .subscribe({
                next: (result) => {
                    if (result) {
                        this.router.navigate(['/home']);
                    }
                },
                error: (err) => {
                    this.loginFailed = true;
                    this.loginForm.reset();
                },
            });
    }
}
