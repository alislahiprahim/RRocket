import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Brand } from "./models/brand.model";
@Injectable()

export class BrandService {

    brandList$ = new BehaviorSubject<Brand[]>([])

    constructor(private http: HttpClient) { }

    getAllBrands() {
        this.http.get(env.baseUrl + 'brands').subscribe({
            next: (resp: any) => {
                if (resp.isSuccess) {
                    this.brandList$.next(resp.data)
                } else {
                    this.brandList$.next([])
                }
            }
        })
    }

    addBrand(data: any): Observable<any> {
        return this.http.post(env.baseUrl + 'brands', data).pipe(catchError(err => { return throwError(err) }))
    }

  UpdateBrand(data: any): Observable<any> {
    return this.http.put(env.baseUrl + 'brands', data).pipe(catchError(err => { return throwError(err) }))
  }


  deleteBrand(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + `brands/${id}`).pipe(catchError(err => { return throwError(err) }))
  }
}
