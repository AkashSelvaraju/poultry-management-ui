import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FarmRegistrationComponent } from './farm-registration';
import { UserProfileComponent } from './profile/profile.component';
import { UserProfileResolver } from './profile/user-profile.resolver';
import { ViewFarmsComponent } from './view-farms/view-farms.component';

export const routes: Routes = [
    {
        path: 'profile/:id',
        component: UserProfileComponent,
        resolve: { profileData: UserProfileResolver },
    },
    {
        path: 'register-farm',
        component: FarmRegistrationComponent,
    },
    {
        path: 'myfarms',
        component: ViewFarmsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
