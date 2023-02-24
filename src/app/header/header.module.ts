import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from './header.component';
import { ProfilePopupComponent } from './profile-popup/profile-popup.component';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent, ProfilePopupComponent],
})
export class AppHeaderModule {}
