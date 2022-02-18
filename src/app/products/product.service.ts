import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Product } from "./models/product.model";
@Injectable()

export class ProductService {

    productList$ = new BehaviorSubject<Product[]>([])
    filteredProductList$ = new BehaviorSubject<Product[]>([])

    constructor(private http: HttpClient) { }


    getAllProducts() {
        this.http.get(env.baseUrl + 'products').subscribe({
            next: (resp: any) => {
                if (resp.isSuccess) {
                    this.productList$.next(resp.data)
                    this.filteredProductList$.next(resp.data)
                } else {
                    this.productList$.next([])
                    this.filteredProductList$.next([])
                }
            }
        })
    }

    addProduct(data: any): Observable<any> {
        return this.http.post(env.baseUrl + 'products', data).pipe(catchError(err => { return throwError(err) }))
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(env.baseUrl + `products/${id}`).pipe(catchError(err => { return throwError(err) }))
    }

}