import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmTypes } from '../data/farmTypes';

@Component({
    selector: 'app-farm-details',
    templateUrl: './farm-details.component.html',
    styleUrls: ['./farm-details.component.scss'],
})
export class FarmDetailsComponent implements OnInit {
    farmTypes = FarmTypes;
    detailsForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        let address = this.fb.group({
            address1: '',
            address2: '',
            taluk: '',
            district: '',
            state: '',
            pincode: ['', [Validators.maxLength(6), Validators.minLength(6)]],
        });
        this.detailsForm = this.fb.group({
            farmName: '',
            phoneNumber: '',
            email: ['', [Validators.email]],
            address: address,
            farmType: '',
            area: '',
            capacity: '',
            waterTable: '',
            waterSource: '',
        });
    }
}
