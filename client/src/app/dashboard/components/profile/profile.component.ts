import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Toolbar } from 'primeng/toolbar';
import { UserProfile } from '../../models/userProfile.model';
import { UserService } from '../../service/profile.service';
@Component({
  selector: 'app-profile',
  imports: [Toolbar, AvatarModule, ButtonModule, CardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    name: '',
    email: '',
    photoUrl: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // this.userService.getUserProfile().subscribe((profile: UserProfile) => {
    //   this.user = {
    //     name: profile.name || 'Islam Ahmed',
    //     email: profile.email || 'Islam@gmail.com',
    //     photoUrl: profile.photoUrl || '/profile.png',
    //   };

    //   console.log(this.user);
    // });

    this.user = {
      name: 'Islam Ahmed',
      email: 'Islam@gmail.com',
      photoUrl: 'profile.jpg',
    };
  }

  editProfile() {}

  changePassword() {}
}
