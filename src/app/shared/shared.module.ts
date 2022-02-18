import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AddImageComponent } from './compontents/add-image/add-image.component';
import { LoaderDirective } from './directives/loader.directive';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ImageSliderComponent } from './compontents/image-slider/image-slider.component';
import { MatTableModule } from '@angular/material/table';
import { DeleteComponent } from './compontents/delete/delete.component';
import { ActivateComponent } from './compontents/activate/activate.component';
import { LogoComponent } from './compontents/logo/logo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AddImageComponent,
    LoaderDirective,
    ImageSliderComponent,
    DeleteComponent,
    ActivateComponent,
    LogoComponent
  ],
  imports: [
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTreeModule,
    SweetAlert2Module,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    AddImageComponent,
    LoaderDirective,
    MatRadioModule,
    MatSelectModule,
    ImageSliderComponent,
    MatTableModule,
    LogoComponent,
    MatCheckboxModule

  ]
})
export class SharedModule { }
