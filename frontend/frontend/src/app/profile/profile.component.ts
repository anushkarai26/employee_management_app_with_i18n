import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user:any={
     "Name":"",
     "Username":"",
     "Email":"",
     "role":""
  }

  List: any[]=[];

  constructor(private authService:AuthService,
    private router:Router,
    private http:HttpClient
  ){}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const username = localStorage.getItem('username');

    if (username) {
      this.authService.getProfile(username).subscribe(
        (profile: any) => {
          this.user = profile.user;
        });
    } else {
      console.error('Username not found in localStorage');
    }
  }
}


