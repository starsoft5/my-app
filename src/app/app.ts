import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStore } from './state/app-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public store = inject(AppStore);

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.saveState);
  }

  ngOnDestroy(): void {
    alert('AppComponent destroyed');
    window.removeEventListener('beforeunload', this.saveState);
  }

  saveState = () => {
    const state = this.store.get(); // 👈 manually grab current store state
    localStorage.setItem('appState', JSON.stringify(state));
  };
}
