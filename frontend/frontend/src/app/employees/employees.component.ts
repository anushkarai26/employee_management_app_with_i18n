import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginUserComponent } from '../login-user/login-user.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, RouterLink, RegisterComponent, LoginUserComponent, RouterOutlet],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent { }