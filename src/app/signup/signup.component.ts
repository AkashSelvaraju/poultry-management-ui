import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorCodes } from 'src/app/common/error';
import { AuthService } from 'src/app/common/service';
import { UserService } from '../common/service/user.service';

@Component({
    templateUrl: './signup.component.html',
    styles: [
        `
            mat-card {
                padding: 60px 50px 40px 50px;
                border-radius: 10px;
                width: 380px;
                box-shadow: 1px 1px 10px 1px rgb(0 0 0 / 20%) !important;
            }

            mat-form-field {
                min-width: 100%;
                max-width: 300px;
                width: 100%;
            }
        `,
    ],
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    firstName?: FormControl;
    lastName?: FormControl;
    email?: FormControl;
    password?: FormControl;
    confirmPassword?: FormControl;

    mouseOverSignUp: boolean = false;
    signupFailed: any = {};
    constructor(
        private userService: UserService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.firstName = new FormControl('', Validators.required);
        this.lastName = new FormControl('', Validators.required);
        this.email = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.password = new FormControl('', Validators.required);
        this.confirmPassword = new FormControl('', [Validators.required]);

        this.signupForm = new FormGroup(
            {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
            },
            [this.passwordMisMatch]
        );
    }

    cancel() {
        this.router.navigate(['/home']);
    }

    signup(values: any) {
        if (this.signupForm.invalid) return;
        delete values.confirmPassword;
        this.userService.addUser(values).subscribe({
            next: (user) => {
                if (user) {
                    this.authService
                        .loginUser(user.email, values.password)
                        .subscribe(() => {
                            this.router.navigate(['/home']);
                        });
                }
            },
            error: (err) => {
                if (err.code === ErrorCodes.Username_Taken) {
                    console.log(err);
                    this.signupFailed['userTaken'] = true;
                }
                this.signupForm.reset();
            },
        });
    }
    passwordMisMatch(control: AbstractControl): ValidationErrors | null {
        if (
            control.get('password')!.value ===
            control.get('confirmPassword')!.value
        ) {
            return null;
        }
        return { misMatch: true };
    }

    getControl(name: string) {
        return this.signupForm.get(name);
    }
}
