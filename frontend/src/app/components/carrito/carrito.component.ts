import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

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

  procesarPago():void{
    this.limpiarCarro();
    Swal.fire({
      title: 'Felicidades, muy pronto recibiras tu pedido DISFRUTALO!!!!',
      width: 600,
      padding: '3em',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
      `
    });
  }

}
