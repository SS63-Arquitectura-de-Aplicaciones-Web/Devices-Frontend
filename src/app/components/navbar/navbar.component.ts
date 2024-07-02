import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authUser$: Observable<User | null>;

  constructor(private authService: AuthService){
    this.authUser$ = this.authService.authUser$;
  }

  OnLogout(){
    this.authService.logOut();
  }
}
