import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from './models';
import { LoginService } from './services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.iniciarFormulario();

  }

  iniciarFormulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if (this.form.invalid) {
        return;
    }
    const login: Login =this.form.value;
    this.loginService.logar(login).subscribe(res => {
      console.log(JSON.stringify(res));
      localStorage['token'] = res['data']['token'];
      const usuarioData = JSON.parse(atob(res['data']['token'].split('.')[1]));
      console.log(JSON.stringify(usuarioData));
      if (usuarioData['role'] == 'ROLE_ADMIN') {
        alert('Deve ser direcionado a pagina de ADMIN');
      } else {
        alert('Deve ser direcionado a pagina de FUNCIONARIO');
      }
    },
    err => {
      console.log(JSON.stringify(err));
      let msg: string = "Tente novamente em instantes.";
      if(err['status'] == 401) {
        msg = "Email ou Senha invalidos."
      }
      this.snackBar.open(msg, "Erro", {duration: 5000})
    });
  }
}
