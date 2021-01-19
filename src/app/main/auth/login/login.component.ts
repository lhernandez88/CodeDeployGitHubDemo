import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequest } from 'src/app/services/service-proxies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: LoginRequest = new LoginRequest();
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      this.login = this.loginForm.value;
      this.authService.login(this.login).subscribe(
        data => {
          console.log("del serv", data);
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        }
      );
    }
    else {
      alert("FILL ALL FIELDS")
    }
  }

}
