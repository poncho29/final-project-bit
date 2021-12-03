import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  loading:boolean = true;

  listaProductos!: Producto[];
  filtroCategoria!: Producto[];
  llaveBusqueda: string = '';

  infoProductoModal:Producto = {
    category:    "",
    description: "",
    id:          0,
    image:       "",
    price:       0,
    quantity:    0,
    title:       "",
    total:       0
  };

  terminoBusqueda:string = '';

  constructor(private productosSvc: ProductosService, private carritoSvc: CarritoService) { }

  ngOnInit(): void {
    this.productosSvc.getProductos().subscribe((res: Producto[]) => {
      this.listaProductos = res;
      this.filtroCategoria = res;
      this.listaProductos.forEach((a:Producto) => {
        if(a.category === "women's clothing" || a.category ==="men's clothing"){
          a.category ="moda";
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      this.loading = false;
    });

    this.carritoSvc.buscar.subscribe((valor:string) => {
      this.llaveBusqueda = valor;
    })
  }

  agregarAlCarro(producto: Producto){
    this.carritoSvc.agregarAlCarrito(producto);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado!!!',
      showConfirmButton: false,
      timer: 1200
    });
  }

  busqueda(palabra:any){
    this.terminoBusqueda = (palabra.target as HTMLInputElement).value;
    this.carritoSvc.buscar.next(this.terminoBusqueda);
  }

  filtrar(categoria: string){
    this.filtroCategoria = this.listaProductos.filter((a:any) => {
      if(a.category == categoria || categoria == ''){
        return a;
      }
    });
  }

  mostrarInfoModal(producto: Producto){
    this.infoProductoModal = producto;
  }

}
