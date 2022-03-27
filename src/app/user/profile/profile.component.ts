import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorCodes } from 'src/app/common/error';
import { IHobby, IRole, IUser, Toastr } from 'src/app/common/interface';
import { AuthService, TOASTR_TOKEN } from 'src/app/common/service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    profileForm!: FormGroup;
    editPassword = new FormGroup({
        password: new FormControl(),
        newPassword: new FormControl(),
        confirmPassword: new FormControl(),
    });

    mouseOverSave!: boolean;
    incorrectPassword: boolean = false;
    all_hobbies!: IHobby[];
    all_roles!: IRole[];
    showEditPassword: boolean = false;
    showEditName: boolean = false;

    private user_hobbies!: IHobby[];
    private user_roles!: IRole[];
    user!: IUser;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) {}

    ngOnInit(): void {
        this.user = this.route.snapshot.data['profileData'].user;
        this.user_hobbies = this.route.snapshot.data['profileData'].userHobbies;
        this.user_roles = this.route.snapshot.data['profileData'].userRoles;

        this.all_hobbies = this.route.snapshot.data['profileData'].allHobbies;
        this.all_roles = this.route.snapshot.data['profileData'].allRoles;

        let firstName: FormControl = new FormControl(this.user?.firstName);
        let lastName: FormControl = new FormControl(this.user?.lastName);

        let hobbiesArray = new FormArray([]);
        for (let hobby of this.all_hobbies) {
            hobbiesArray.push(
                new FormControl(
                    !!this.user_hobbies.find(
                        (user_hobby) => user_hobby.id === hobby.id
                    )
                )
            );
        }

        let rolesArray = new FormArray([]);
        for (let role of this.all_roles) {
            rolesArray.push(
                new FormControl(
                    !!this.user_roles.find(
                        (user_role) => user_role.id === role.id
                    )
                )
            );
        }

        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName,
            hobbies: hobbiesArray,
            roles: rolesArray,
        });
    }

    addEditPassword() {
        this.showEditPassword = true;
        this.profileForm.addControl('editPassword', this.editPassword);
        this.profileForm.setValidators(this.passwordMisMatch);
    }
    removeEditPassword() {
        this.editPassword.reset();
        this.profileForm.removeControl('editPassword');
        this.profileForm.removeValidators(this.passwordMisMatch);
        this.showEditPassword = false;
    }

    saveProfile(value: any) {
        if (this.profileForm.invalid) return;

        let userData: any = {};
        if (value.editPassword) {
            value.password = value.editPassword.password;
            value.newPassword = value.editPassword.newPassword;
            delete value.editPassword;
        }

        let add: string[] = [];
        let remove: string[] = [];

        let userHasId = (list: IRole[] | IHobby[], id: string) =>
            list.find((item) => item.id === id);
        if (value.hobbies) {
            value.hobbies.forEach((value: boolean, index: number) => {
                if (userHasId(this.user_hobbies, this.all_hobbies[index].id)) {
                    // if current hobby is present in userHobbies and it is unchecked, add it to remove list
                    if (value === false)
                        remove.push(this.all_hobbies[index].id);
                } else if (value === true) {
                    // if not present in user hobbies and it is checked, add it to add list
                    add.push(this.all_hobbies[index].id);
                }
            });
        }
        delete value.hobbies;
        userData.hobbies = { add, remove };

        add = [];
        remove = [];

        value.roles.forEach((value: boolean, index: number) => {
            if (userHasId(this.user_roles, this.all_roles[index].id)) {
                // if current role is present in userRoles and it is unchecked, add it to remove list
                if (value === false) remove.push(this.all_roles[index].id);
            } else if (value === true) {
                // if not present in userRoles and it is checked, add it to add list
                add.push(this.all_roles[index].id);
            }
        });
        delete value.roles;
        userData.roles = { add, remove };

        userData.details = value;

        this.userService.editUser(this.user.id, userData).subscribe({
            next: (user) => {
                this.authService.currentUser.next(user);
                this.router.navigate(['/home']);
                this.toastr.success('Profile Saved');
            },
            error: (error) => {
                if (error.code === ErrorCodes.InvalidCredentials) {
                    this.editPassword.get('password')?.setValue('');
                    this.incorrectPassword = true;
                    setTimeout(() => {
                        this.incorrectPassword = false;
                    }, 2000);
                }
                if (error.code === ErrorCodes.Unauthorized) {
                    this.router.navigate(['/user/login']);
                }
            },
        });
    }
    passwordMisMatch(control: AbstractControl): ValidationErrors | null {
        if (
            control.get('editPassword')?.get('newPassword')?.value !==
            control.get('editPassword')?.get('confirmPassword')?.value
        ) {
            return { misMatch: true };
        }

        return null;
    }
}
