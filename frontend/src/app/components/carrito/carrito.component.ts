import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  productos: Producto[] = [];
  subTotal: number = 0;

  constructor(private carritoSvc:CarritoService) { }

  ngOnInit(): void {
    this.carritoSvc.getProductos().subscribe((res:Producto[]) => {
      this.productos = res;
      this.subTotal = this.carritoSvc.getPrecioTotal();
    });
  }

  eliminarProducto(producto: Producto){
    this.carritoSvc.eliminarProductoCarrito(producto);
  }

  limpiarCarro(){
    this.carritoSvc.eliminarTodosProductosCarrito();
  }

}
