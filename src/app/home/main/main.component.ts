import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatAccordion } from '@angular/material/expansion';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  sideNavData = [
    { path: '/', label: 'الرئيسية', multi: false, icon: 'fa fa-home', subs: [] },
    { path: '/aboutInfo', label: 'عن الشركة', multi: true, icon: 'fas fa-info-circle', subs: [{ path: '/aboutInfo', label: 'عن الشركة', icon: 'fas fa-info-circle', }, { path: '/aboutInfo/add', label: 'إضافة عن الشركة', icon: 'fas fa-plus', }] },
    { path: '/teams', label: 'الفرق', multi: true, icon: 'fas fa-users', subs: [{ path: '/teams', label: 'الفرق', icon: 'fas fa-users', }, { path: '/teams/add', label: 'إضافة فريق ', icon: 'fas fa-plus', }] },
    { path: '/brand', label: 'الماركة التجارية', multi: true, icon: 'fas fa-store', subs: [{ path: '/brand', label: 'الماركات التجارية', icon: 'fas fa-store', }, { path: '/brand/add', label: 'إضافة ماركة تجارية ', icon: 'fas fa-plus', }] },
    { path: '/category', label: 'قوائم التصنيف  ', multi: true, icon: 'fa fa-list-alt', subs: [{ path: '/category', label: 'قوائم التصنيف', icon: 'fa fa-list-alt', }, { path: '/category/add', label: 'إضافة فئة  ', icon: 'fas fa-plus', }] },
    { path: '/product', label: 'المنتجات', multi: true, icon: 'fas fa-shopping-cart', subs: [{ path: '/product', label: 'المنتجات', icon: 'fas fa-shopping-cart', }, { path: '/product/add', label: 'إضافة منتج  ', icon: 'fas fa-plus', }] },
  ]
  mwidth = true;
  mode: MatDrawerMode = 'side';
  isFullScreen: boolean | undefined;
  mobileQuery: MediaQueryList;
  isLoading: Subject<boolean> | undefined;
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 1077) {
      this.mwidth = true;
      this.mode = 'side';
    } else {
      this.mwidth = false;
      this.mode = 'over';
    }
  }

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loaderService: LoaderService, private cdr: ChangeDetectorRef, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    if (window.innerWidth > 900) {
      this.mwidth = true;
      this.mode = 'side';
    } else {
      this.mwidth = false;
      this.mode = 'over';
    }

  }

  ngAfterViewChecked(): void {
    this.isLoading = this.loaderService.isLoading;
     this.cdr.detectChanges();
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('login')
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
