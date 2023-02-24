import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './profile/profile.component';
import {
    FarmDetailsComponent,
    FarmGuidlinesComponent,
    FarmRegistrationComponent,
} from './farm-registration';
import { UserProfileResolver } from './profile/user-profile.resolver';
import { UserRoutingModule } from './user-routing.module';
import { ViewFarmsComponent } from './view-farms/view-farms.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        UserProfileComponent,
        FarmRegistrationComponent,
        FarmGuidlinesComponent,
        FarmDetailsComponent,
        ViewFarmsComponent,
    ],
    providers: [UserProfileResolver],
})
export class UserModule {}
