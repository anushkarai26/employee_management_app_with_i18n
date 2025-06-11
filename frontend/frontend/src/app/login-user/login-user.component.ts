import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router,RouterModule,RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule,RouterLinkActive,RouterModule,RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  log:any={
    username:"",
    password:"",
  }
  constructor(private authService:AuthService,
    private router:Router
  ){}

  onLogin(): void {
    this.authService.onLogin(this.log.username, this.log.password).subscribe(
      (res: any) => {
        if (res.success) {
          alert('User logged in Successfully');
          localStorage.setItem('username', res.user.username); // Store username in localStorage
          this.router.navigate(['/profile']); 
        } else {
          alert("Sorry, We couldn't log you in :( Please try Again");
        }
      }
    )
  }
}

