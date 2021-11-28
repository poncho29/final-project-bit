import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from 'src/app/models/token';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  myForm:FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.myForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  registrarUsuario():void{
    this.authService.registrarUsuario(this.myForm.value).subscribe((res:Token) => {
      localStorage.setItem('token',res.token);
      this.router.navigate(['/']);
    },err => {
      console.log(err);
    });

  }

}
