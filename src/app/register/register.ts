import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../state/app-store.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    this.http.post('http://localhost:7112/api/CreateUserFunction', userData)
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
