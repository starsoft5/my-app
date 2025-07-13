import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStore {
  // 🟢 State
  //private readonly _counter = signal(0);
  private readonly _loginName = signal('');

  // 🟣 Computed values (optional)
  //readonly double = computed(() => this._counter() * 2);
  readonly isLoggedIn = computed(() => this._loginName().length > 0);

  // 🟢 Getters (template-friendly)
  //counter = () => this._counter();
  loginName = () => this._loginName();

  // 🔄 Setters
  //increment = () => this._counter.set(this._counter() + 1);
  //decrement = () => this._counter.set(this._counter() - 1);
  //reset = () => this._counter.set(0);

  updateLoginName(name: string) {
    this._loginName.set(name);
  }

  logout() {
    this._loginName.set('');
    //this.reset();
  }

  // Optional: log effects
  constructor() {
    this.restoreState();

    // Save to localStorage when state changes
    effect(() => {
      const state = {
        //counter: this._counter(),
        loginName: this._loginName()
      };
      localStorage.setItem('appState', JSON.stringify(state));
    });
  }

  get() {
  return {
    //counter: this._counter(),
    loginName: this._loginName()
  };
}

private restoreState() {
    const raw = localStorage.getItem('appState');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        //if (typeof parsed.counter === 'number') {
        //  this._counter.set(parsed.counter);
        //}
        if (typeof parsed.loginName === 'string') {
          this._loginName.set(parsed.loginName);
        }
      } catch {
        console.warn('Invalid localStorage data — using defaults');
      }
    }
  }
}
