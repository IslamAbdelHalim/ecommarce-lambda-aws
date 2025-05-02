import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Toolbar } from 'primeng/toolbar';
import { UserProfile } from '../../models/userProfile.model';
import { UserService } from '../../service/profile.service';
@Component({
  selector: 'app-header',
  imports: [Toolbar, AvatarModule, ButtonModule, CardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
