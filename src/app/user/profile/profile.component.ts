import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IRole, IUser } from 'src/app/common/interface';
import { UserFarms } from '../data/user_farms';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    profileForm!: FormGroup;
    user_roles!: IRole[];

    userFarms!: any[];

    user!: IUser;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.user = this.route.snapshot.data['profileData'].user;
        this.userFarms = this.route.snapshot.data['profileData'].userFarms;
        let firstName: FormControl = new FormControl(this.user?.firstName);
        let lastName: FormControl = new FormControl(this.user?.lastName);

        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName,
        });
    }
}
