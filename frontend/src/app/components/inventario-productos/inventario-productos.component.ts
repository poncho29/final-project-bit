import { ProductosService } from 'src/app/services/productos.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario-productos',
  templateUrl: './inventario-productos.component.html',
  styleUrls: ['./inventario-productos.component.css']
})
export class InventarioProductosComponent implements OnInit {

  listarProductos: Producto[] = [];

  constructor(private productosSvc: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos():void {
    this.productosSvc.getProductos().subscribe(data => {
			this.listarProductos = data;
		}, error => {
			console.log(error);
		});
  }

  eliminarProducto(id: string) {
		Swal.fire({
			title: 'Seguro desea eliminar el producto?',
			text: "Este producto ya no podra recuperarse !!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#FFC107',
			cancelButtonColor: '#000',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {
			if (result.isConfirmed) {
				this.productosSvc.deleteProducto(id).subscribe( data => {
					Swal.fire({
						icon: 'success',
  				  title: 'Producto eliminado',
					})
					this.obtenerProductos();
				}, error => {
					console.log(error)
				});
			}
		})
	}

}
