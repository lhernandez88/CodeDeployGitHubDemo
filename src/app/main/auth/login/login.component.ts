import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {email: "", password: ""};
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm(): FormGroup
    {
        return this.formBuilder.group({
            email: new FormControl(this.login.email, [Validators.required]),
            password: new FormControl(this.login.password, [Validators.required])
        });
    }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
    }
    else {
      alert("FILL ALL FIELDS")
    }
  }

}
