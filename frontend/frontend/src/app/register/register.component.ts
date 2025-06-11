import { Component,inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidateService } from '../services/validate.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  add:any={
    "Name":"",
    "email":"",
    "username":"",
    "password":"",
    "role":""

  }

  constructor(private http:HttpClient,
    private validateService : ValidateService,
    private router:Router
  ){}


 // Register user
 onSubmit() {
  if (this.validateService.validateRegister(this.add)) {
    this.validateService.onSubmit(this.add).subscribe(
      (res: any) => {
        if (res.msg === 'User Added Successfully') {
          alert('You are now registered and can now log in');
          this.router.navigate(['/login']);
        } else {
          alert('Something went wrong');
          this.router.navigate(['/register']);
        }
      });
  } else {
    alert('Please fill in all required fields correctly');
  }
}
}
