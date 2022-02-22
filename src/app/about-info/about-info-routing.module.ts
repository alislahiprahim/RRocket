import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutInfoComponent } from './about-info.component';
import { AddAboutComponent } from './add-about/add-about.component';
import { ViewAboutComponent } from './view-about/view-about.component';

const routes: Routes = [
  {
    path: '', component: AboutInfoComponent, children: [
      { path: '', component: ViewAboutComponent },
      { path: 'add', component: AddAboutComponent ,data: { title: 'اضافة' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutInfoRoutingModule { }
