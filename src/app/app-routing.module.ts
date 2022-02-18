import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MainComponent } from './home/main/main.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'aboutInfo', loadChildren: () => import('./about-info/about-info.module').then(m => m.AboutInfoModule) },
      { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) },
      { path: 'brand', loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule) },
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
      { path: 'product', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },


    ], canActivate: [AuthService]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
