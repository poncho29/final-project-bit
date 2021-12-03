import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cantidadProductos:number = 0;

  constructor(public authService:AuthService, private carritoSvc:CarritoService) {}

  ngOnInit(): void {
    this.carritoSvc.getProductos().subscribe((res: Producto[]) => {
      const cantidad = res.reduce((acc,prod) => acc += prod.quantity,0);
      this.cantidadProductos = cantidad;
    });
  }
}
