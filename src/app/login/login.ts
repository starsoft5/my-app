import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../state/app-store.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
private baseUrl = environment.azureFunctionBaseUrl;
constructor(public store: AppStore, private http: HttpClient) {}

login() {
  const userData = {
    email: this.tempName,
    password: this.tempPassword
  };
  this.http.post(`${this.baseUrl}/LoginUserFunction`, userData)
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
