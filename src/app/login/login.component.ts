import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { IssueService } from '../issue.service';
import { Subscription } from 'rxjs';
import { User } from '../issue.model';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private issueService: IssueService,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router)
    {

      // redirect to home if already logged in
      const currentUser = this.authenticationService.currentUserValue;
      const isUserLogin = currentUser !== null ? true : false;
      if (isUserLogin && currentUser.token) {
         // authorised so return true
         this.router.navigate(['/dashboard']);
       } else {
         this.router.navigate(['/']);
       }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

     // convenience getter for easy access to form fields
     get f() { return this.loginForm.controls; }

     onSubmit() {
        this.submitted = true;
        /*----------------------------------- Need to fix below code to check the error ar form level
        // stop here if form is invalid
        //console.log(this.loginForm.getError);
        -------------------------------------------------------------------------------------------------*/

        if (this.loginForm.invalid) {
          this.alertService.success('Invalid Data, Please Check!');
          return;
        }

        this.returnUrl = '/dashboard';
        this.loading = true;
        console.log('insidelogin');
        this.authenticationService.login(this.f.user.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.alertService.success('Login Sucessful');
                  this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    // this.router.navigate(['/']);
                });
    }
}
