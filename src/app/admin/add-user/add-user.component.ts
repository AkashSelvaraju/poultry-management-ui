import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { IUser } from 'src/app/common/interface';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
    userFields = ['firstName', 'lastName', 'email', 'password'];
    displayColumns = [...this.userFields, 'action'];
    addUserForm!: FormGroup;
    userArray!: FormArray;
    constructor(private fb: FormBuilder) {}

    @ViewChild(MatTable) table!: MatTable<IUser>;

    ngOnInit(): void {
        this.userArray = this.fb.array([
            this.fb.group({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }),
        ]);
        this.addUserForm = new FormGroup({ userArray: this.userArray });
    }

    addUser() {
        this.userArray.push(
            this.fb.group({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            })
        );
        this.table.renderRows();
    }

    remove(i: number) {
        this.userArray.removeAt(i);
        this.table.renderRows();
    }

    save() {
        console.log(this.addUserForm.value);
    }
}
