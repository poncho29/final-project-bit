import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  /* private API = 'https://fakestoreapi.com/products/'; */

  private API = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API);
  }

  postProducto(producto: any): Observable<Producto>{
		return this.http.post<Producto>(this.API, producto);
	}

  deleteProducto(id: String): Observable<any>{
		return this.http.delete(`${this.API}/${id}`);
	}

  putProducto(id: string, producto:any):Observable<any>{
		return this.http.put(`${this.API}/${id}`, producto);
	}

  getProducto(id: string):Observable<any>{
		return this.http.get(`${this.API}/${id}`)
	}


}
