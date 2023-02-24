import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IUser, Toastr } from '../common/interface';
import { AuthService, TOASTR_TOKEN } from '../common/service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSubscription!: Subscription;
    currentUser?: IUser;
    menuItems: { name: string; link: string[] }[] = [];
    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.currentUser.subscribe({
            next: (user) => {
                this.currentUser = user;
                this.loadUserMenu();
            },
        });
    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    loadUserMenu() {
        console.log('this.authService.isUser()', this.authService.isUser());
        if (this.authService.isUser()) {
            this.menuItems = [
                { link: ['/user/register-farm'], name: 'Register' },
                { link: ['/user/myfarms'], name: 'My Farms' },
            ];
        } else this.menuItems = [];
    }

    logout() {
        this.authService.logoutUser().subscribe((result) => {
            if (result) {
                this.router.navigate(['/home']);
                this.toastr.success('logged out');
            }
        });
    }
}
