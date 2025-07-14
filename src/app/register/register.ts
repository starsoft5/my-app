import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../state/app-store.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
 
tempName: string = '';
password: string = '';
confirmPassword: string = '';
 private baseUrl = environment.azureFunctionBaseUrl;
  constructor(public store: AppStore, private http: HttpClient) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

  

    const userData = {
      email: this.tempName,
      password: this.password
    };
    this.http.post(`${this.baseUrl}/CreateUserFunction`, userData)
      .subscribe({
        next: () => {
          alert('Registration successful');
          this.store.updateLoginName('');
          this.tempName = '';
          this.password = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          alert('Invalid email or password');
          console.error(err);
        }
      });

  }
}
