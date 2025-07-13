import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../state/app-store.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
tempName: any;
tempPassword: any;
constructor(public store: AppStore, private http: HttpClient) {}

login() {
  const userData = {
    email: this.tempName,
    password: this.tempPassword
  };
  this.http.post('http://localhost:7112/api/LoginUserFunction', userData)
    .subscribe({
      next: () => {
        alert('Login successful');
        this.store.updateLoginName(this.tempName);
        this.tempName = '';
        this.tempPassword = '';
      },
      error: (err) => {
        alert('Invalid email or password');
        console.error(err);
      }
    });
}
}
