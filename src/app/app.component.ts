import { AuthenticationService } from './_services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ForceCJ';
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
          this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
        });
  }

}
