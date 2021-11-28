import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.myForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loginUsuario():void{
    this.authService.loginUsuario(this.myForm.value).subscribe((res:Token) =>{
      localStorage.setItem('token',res.token);
      this.router.navigate(['/']);
    },err => {
      console.log(err);
    });
  }

}
