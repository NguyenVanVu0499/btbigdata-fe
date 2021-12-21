import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@features/service/authentication-service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  returnUrl: any;
  typePass = true;
  loginStatus = '';
  loginForm: FormGroup;
  mess;
  public hideIcon = 'fas fa-eye';
  public showIcon = 'fas fa-eye-slash';
  constructor(
 
    private router: Router,
    private AuthService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('string', Validators.required),
      password: new FormControl('B@ica0quen', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit(): void {}

  submit(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.AuthService.login(username, password).subscribe(res=>{
      this.router.navigateByUrl(this.returnUrl);
    },
    (error) => {
      this.mess = 'Tên đăng nhập hoặc mật khẩu không đúng';
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  get loginUsernameCtrl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get loginPasswordCtrl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
