import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
    `
    ::ng-deep.mat-expansion-panel:not([class*=mat-elevation-z]) {
    box-shadow: none;
    background-color: transparent;
}

::ng-deep.mat-expansion-indicator::after {
    color: #fff !important;
}

.sideNav {
    width: 250px;
    background-color: var(--accent);
    color: #fff;
    text-align: center;
    padding-top: 20px;
}
.example-sidenav2 {
    width: 55px;
 background-color: var(--accent);
    color: #fff;
    overflow:hidden !important;
}
.navs {
    transition: all .3s ease-in-out;
}

.navs ul {
    list-style: none;
    font-weight: 800;
}

.navs a {
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-size: medium !important;
    font-weight: 600 !important;
}

.navs i {
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-size: small !important;
}

.active a {
    color: #fff
}

.active i {
    color: #fff
}

.active {
    transition: all .3s ease-in-out;
    color: #fff;
    background-color: var(--primary);
    margin: 10px 0px;
    border-radius: 3px;
}

.progressbar {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
}`
  ]
})
export class SideBarComponent implements OnInit {

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private cdr: ChangeDetectorRef, private router: Router) {
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
    this.cdr.detectChanges();
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('login')
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
