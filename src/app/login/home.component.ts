import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {

       // redirect to home if not logged in
       const currentUser = this.authenticationService.currentUserValue;
       const isUserLogin = currentUser !== null ? true : false;
       if (isUserLogin && currentUser.token) {
          // authorised so return true
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
       this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
              this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
