import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStore } from './state/app-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private store = inject(AppStore);

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
