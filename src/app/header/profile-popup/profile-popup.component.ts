import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/common/interface';

@Component({
    selector: 'user-profile-popup',
    templateUrl: './profile-popup.component.html',
    styleUrls: ['./profile-popup.component.css'],
})
export class UserProfilePopupComponent implements OnInit {
    @Input() user!: IUser;
    @Output() logout: EventEmitter<void> = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}
}
