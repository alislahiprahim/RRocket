import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutInfoRoutingModule } from './about-info-routing.module';
import { AboutInfoComponent } from './about-info.component';
import { SharedModule } from '../shared/shared.module';
import { AboutInfoService } from './about-info.service';
import { ViewAboutComponent } from './view-about/view-about.component';
import { AddAboutComponent } from './add-about/add-about.component';
import { EditAboutComponent } from './edit-about/edit-about.component';


@NgModule({
  declarations: [
    AboutInfoComponent,
    ViewAboutComponent,
    AddAboutComponent,
    EditAboutComponent
  ],
  imports: [
    SharedModule,
    AboutInfoRoutingModule
  ],
  providers:[AboutInfoService]
})
export class AboutInfoModule { }
