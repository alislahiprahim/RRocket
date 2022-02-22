import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Category } from "./models/category.model";
@Injectable()

export class CategoryService {

    categoryList$ = new BehaviorSubject<Category[]>([])
    filteredCategoryList$ = new BehaviorSubject<Category[]>([])

    constructor(private http: HttpClient) { }


    addCategory(data: any): Observable<any> {
        return this.http.post(env.baseUrl + 'categories', data).pipe(catchError(err => { return throwError(err) }))
    }

    getAllCategory() {
        this.http.get(env.baseUrl + 'categories').subscribe({
            next: (resp: any) => {
                if (resp.isSuccess) {
                    this.categoryList$.next(resp.data)
                    this.filteredCategoryList$.next(resp.data)
                } else {
                    this.categoryList$.next([])
                    this.filteredCategoryList$.next([])
                }
            }
        })
    }

  UpdateCategory(data: any): Observable<any> {
    return this.http.put(env.baseUrl + 'categories', data).pipe(catchError(err => { return throwError(err) }))
  }


  deleteCategory(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + `categories/${id}`).pipe(catchError(err => { return throwError(err) }))
  }

}
