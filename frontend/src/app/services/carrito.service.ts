import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  listaItemsCarrito: Producto[] = [];

  listaProductos = new BehaviorSubject<Producto []>([]);
  buscar = new BehaviorSubject<string>("");

  constructor() { }

  getProductos(){
    return this.listaProductos.asObservable();
  }

  setProducto(producto : Producto){
    this.listaItemsCarrito.push(producto);
  }

  agregarAlCarrito(producto : Producto){
    /* Se hace para que si un producto ya esta, no lo agregue sino qee solo sume la cantidad */
    const isProductInCart = this.listaItemsCarrito.find(({id}) => id === producto.id);

    if(isProductInCart){
      isProductInCart.quantity += 1;
    }else{
      this.listaItemsCarrito.push({... producto, quantity:1});
    }

    /* Luego de que valide si ya existe o no el producto, actualizamos nuestro observable mandando de nuevo el array */
    this.listaProductos.next(this.listaItemsCarrito);
    this.getPrecioTotal();

  }

  getPrecioTotal() : number{
    let subTotal = 0;
    this.listaItemsCarrito.map((a:Producto)=>{
      subTotal += a.total * a.quantity;
    })
    return subTotal;
  }

  eliminarProductoCarrito(producto: Producto){
    this.listaItemsCarrito.map((a:Producto, index:number)=>{
      if(producto.id === a.id){
        this.listaItemsCarrito.splice(index,1);
      }
    })
    this.listaProductos.next(this.listaItemsCarrito);
  }

  eliminarTodosProductosCarrito(){
    this.listaItemsCarrito = []
    this.listaProductos.next(this.listaItemsCarrito);
  }

}
