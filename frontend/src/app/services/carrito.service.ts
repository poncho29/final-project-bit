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

  constructor() {
    if(localStorage.getItem('cart')){
      this.listaItemsCarrito = JSON.parse(localStorage.getItem('cart') as string);
      this.listaProductos.next(this.listaItemsCarrito);
    }
  }

  getProductos(){
    return this.listaProductos.asObservable();
  }

  agregarAlCarrito(producto : Producto){
    /* Se hace para que si un producto ya esta, no lo agregue sino qee solo sume la cantidad */
    const isProductInCart = this.listaItemsCarrito.find(({code}) => code === producto.code);

    if(isProductInCart){
      isProductInCart.quantity += 1;
      isProductInCart.total += isProductInCart.price;
    }else{
      this.listaItemsCarrito.push({... producto, quantity:1});
    }

    /* Luego de que valide si ya existe o no el producto, actualizamos nuestro observable mandando de nuevo el array */
    this.listaProductos.next(this.listaItemsCarrito);
    this.getPrecioTotal();

    localStorage.setItem('cart',JSON.stringify(this.listaProductos.getValue()));

  }

  getPrecioTotal() : number{
    let subTotal = 0;
    this.listaItemsCarrito.map((a:Producto)=>{
      subTotal += a.total;
    })
    return subTotal;
  }

  eliminarProductoCarrito(producto: Producto){
    this.listaItemsCarrito.map((a:Producto, index:number)=>{
      if(producto.code === a.code){
        this.listaItemsCarrito.splice(index,1);
      }
    })
    this.listaProductos.next(this.listaItemsCarrito);

    localStorage.setItem('cart',JSON.stringify(this.listaProductos.getValue()));

    if(localStorage.getItem('cart') === "[]"){
      localStorage.removeItem('cart');
    }
  }

  eliminarTodosProductosCarrito(){
    this.listaItemsCarrito = []
    this.listaProductos.next(this.listaItemsCarrito);

    localStorage.removeItem('cart');
  }

}
