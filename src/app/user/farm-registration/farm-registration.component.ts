import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './farm-registration.component.html',
    styleUrls: ['./farm-registration.component.scss'],
})
export class FarmRegistrationComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    cancel() {
        console.log('registration canceled');
        this.router.navigate(['/home']);
    }

    pay() {
        console.log('payment in process...');
        this.router.navigate(['/home']);
    }
}
