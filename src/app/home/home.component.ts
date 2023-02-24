import { Component, Inject } from '@angular/core';
import { Toastr } from '../common/interface';
import { TOASTR_TOKEN } from '../common/service';

@Component({
    template: `
        <div class="mat-title">Home</div>
        <br />
        <br />
        <p>Welcome to Poultry Regulation board's website</p>
        <p>login to register user poultry farm</p>
    `,
})
export class HomeComponent {}
