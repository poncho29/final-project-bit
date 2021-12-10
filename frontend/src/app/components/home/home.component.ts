import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	listaProductos: Producto[] = [];
	randomProducts: Producto[] = [];

	constructor(private _productoservice: ProductosService) { }
	
	ngOnInit(): void {
		this.obtenerProductos();
		this.getRandomProduct()
	}

	obtenerProductos(){
		this._productoservice.getProductos().subscribe(data => {
			// console.log(data);
			this.listaProductos = data;
			// console.log(this.listaProductos)
		}, error => {
			console.log(error)
		})
	}

	getRandomProduct(){
		this._productoservice.getProductos().subscribe(data => {
			for (let it = 0; it < 4; it++) {
				var random = this.listaProductos[Math.floor(data.length*Math.random())]
				// console.log(it, random)
				this.randomProducts.push(random);
			}
			// console.log(this.randomProducts)
		}, error => {
			console.log(error)
		})
	}

	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			}
		},
		nav: true
	}

	customOptionsTwo: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			}
		},
		nav: true
	}

	customOptionsThree: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			}
		},
		nav: true
	}

	customOptionsFour: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: false,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			}
		},
		nav: true
	}
}
