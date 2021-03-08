import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from '../issue.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit  {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public uri = environment.productionurl;
    // public uri = environment.localurl;
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}' ));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // tslint:disable-next-line: contextual-lifecycle
    ngOnInit() {
          // console.log(this.currentUserSubject.value);
          /* jwt.verify('', 'secretKey', (err: any, authData: any) => {
                  if (err) {
                      return err;
                      } else {
                      return authData;
                      }
                    });*/
    }

    login(user: string, password: string) {
      console.log('inside authentication service');
      return this.http.post<any>(`${this.uri}/users/login`, { user, password })
      .pipe(map(auser => {
                // login successful if there's a jwt token in the response
                if (auser) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(auser));
                    this.currentUserSubject.next(auser);
                }
                return auser;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        console.log('Logout !!');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        //this.currentUserSubject = new BehaviorSubject<User>({});
  }

}
