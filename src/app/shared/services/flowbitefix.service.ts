import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowbitefixService {
  private navbarOpenSubject = new BehaviorSubject<boolean>(false);
  navbarOpen$ = this.navbarOpenSubject.asObservable();

  constructor() { }

  toggleNavbar() {
    this.navbarOpenSubject.next(!this.navbarOpenSubject.value);
  }

  openNavbar() {
    this.navbarOpenSubject.next(true);
  }

  closeNavbar() {
    this.navbarOpenSubject.next(false);
  }
}
