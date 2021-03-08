import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    public uri = environment.productionurl;
    // public uri = environment.localurl;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.uri}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.uri}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.uri}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.uri}/users/${user}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.uri}/users/${id}`);
    }
}
