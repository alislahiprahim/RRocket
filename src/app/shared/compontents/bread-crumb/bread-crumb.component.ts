import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, Observable } from 'rxjs';
 
export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styles: [
    `
    a{
      color:var(--primary)
    }
    li:nth-last-child(1) {
    a {
        color: #000 !important;
        cursor: auto;
    }
}`
  ]
})
export class BreadCrumbComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];

  constructor(public router: Router, private route: ActivatedRoute) { this.breadcrumbs = [] }

  ngOnInit() {
    this.breadcrumbs = this.getBreadcrumbs(this.route.root);
    this.breadcrumbs.splice(1, 1)

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        let root: ActivatedRoute = this.route.root;
        // root.component = MainComponent
        // console.log(root.component)
        this.breadcrumbs = this.getBreadcrumbs(root);
        this.breadcrumbs.splice(2, 1)
        this.breadcrumbs.forEach((element: any) => console.log(''))

      });

  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {

    const ROUTE_DATA_BREADCRUMB = 'title';
    //get the child routes
    let children: any[] = route.children;
    // console.log(route);
    // console.log(route.children);

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {

      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot._urlSegment.segments.length == 0) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url
      // .map((segment:any) => segment.path)
      // .join('/');

      //append route URL to URL
      url += `${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url,
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}


