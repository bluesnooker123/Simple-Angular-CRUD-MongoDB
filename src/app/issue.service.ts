import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './issue.model';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public uri = environment.productionurl;
  // public uri = environment.localurl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


getIssues() {
  return this.http.get(`${this.uri}/users`);
}

getIssuesById(id) {
  return this.http.get(`${this.uri}/users/${id}`);
}

addIssue(title, responsible, description, severity) {
  const issue = {
    title: title,
    responsible: responsible,
    description: description,
    severity: severity
  };

  return this.http.post(`${this.uri}/users/add`,issue);

}

updateIssue(id, title, responsible, description, severity, status) {
  const issue = {
    title: title,
    responsible: responsible,
    description: description,
    severity: severity,
    status: status
  };

  return this.http.post(`${this.uri}/users/update/${id}`, issue);

}

deleteIssue(id){

  return this.http.get(`${this.uri}/users/delete/${id}`);

}

login(user: string,password: string) {
   return this.http.post(`${this.uri}/users/login`, {user,password})
  // tslint:disable-next-line: no-shadowed-variable
  .pipe(map(user => {
    // login successful if there's a jwt token in the response
    //if (user && user.token) {
    if (user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(null);
  }

    return user;

  }));

}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}


}
