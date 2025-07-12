import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../state/app-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
tempName: any;
  constructor(public store: AppStore) {}
}
