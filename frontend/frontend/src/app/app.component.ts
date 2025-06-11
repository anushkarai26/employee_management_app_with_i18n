import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  isLoggedIn: boolean = false;
  private loginStatusSubscription: Subscription | undefined;

 
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  
  onLogoutClick(): void {
    this.authService.logout();
    alert('You are logged out');
    this.router.navigate(['/login']);
  }

  
  ngOnInit(): void {
    this.loginStatusSubscription = this.authService.loginStatus$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }


  ngOnDestroy(): void {
    this.loginStatusSubscription?.unsubscribe();
  }

  //switch between English,Dutch and French
  switchLanguage(language: string): void {
    if (language === 'fr') {
      window.location.href = 'http://localhost:4201'; //French
    } else if(language==='nl'){
      window.location.href = 'http://localhost:4202'; //Dutch
    }else {
      window.location.href = 'http://localhost:4200'; //Back to English
    }
  }
 
}


