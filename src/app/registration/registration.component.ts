import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    step2!: FormGroup;

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
