import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.css']
})
export class RegistroProductosComponent implements OnInit {

  myForm:FormGroup;
  titulo_formulario = 'Registro producto';
  id: string | null;

  constructor(private fb:FormBuilder, private router: Router, private productoSvc:ProductosService, private idRuta: ActivatedRoute){
    this.myForm = this.fb.group({
      code: ['',Validators.required],
      title: ['',[Validators.required,Validators.maxLength(40)]],
      description: ['',[Validators.required, Validators.maxLength(70)]],
      price: ['', Validators.required],
      category: ['',Validators.required],
      image: ['',Validators.required]
    });
    this.id = this.idRuta.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.accionFormulario();
  }

  registrarProducto():void{

    const PRODUCTO = {
      code: this.myForm.get('code')?.value,
      title: this.myForm.get('title')?.value,
      description: this.myForm.get('description')?.value,
      price: this.myForm.get('price')?.value,
      category: this.myForm.get('category')?.value,
      image: this.myForm.get('image')?.value
		}

    if(this.id == null){
      this.productoSvc.postProducto(PRODUCTO).subscribe( data => {
        this.router.navigate(['/admin-productos']);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El producto quedo dentro del inventario'
        });

      },err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error}!`
        });
      });

    }else{
      this.productoSvc.putProducto(this.id, PRODUCTO).subscribe( data => {
				this.router.navigate(['/admin-productos'])
				Swal.fire({
					icon: 'success',
					title: 'Actualización exitosa',
					text: 'El producto quedo modificado en el inventario'
				})
			})
    }

  }

  accionFormulario(){
		if(this.id !== null){
			this.titulo_formulario = "Actualización del producto";
			this.productoSvc.getProducto(this.id).subscribe(data =>{
				this.myForm.setValue({
					code: data.code,
					title: data.title,
					description: data.description,
					price: data.price,
					category: data.category,
          image: data.image
				});
			});
		}
	}

}
