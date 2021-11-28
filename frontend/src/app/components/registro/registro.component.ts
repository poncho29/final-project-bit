import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from 'src/app/models/token';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  myForm:FormGroup;

  name!:string;

  validacionEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.myForm = this.fb.group({
      name: ['',Validators.required],
      lastnameone: ['',Validators.required],
      lastnametwo: ['',Validators.required],
      email: ['',[Validators.required,Validators.email,Validators.pattern(this.validacionEmail)]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  registrarUsuario():void{
    this.authService.registrarUsuario(this.myForm.value).subscribe((res:Token) => {
      localStorage.setItem('token',res.token);
      this.authService.setNameUser(res.name);

      Swal.fire(
        'Buen trabajo!',
        'Te haz registrado de forma exitosa!',
        'success'
      );
      this.router.navigate(['/']);
    },err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error}!`
      });
    });

  }

}
