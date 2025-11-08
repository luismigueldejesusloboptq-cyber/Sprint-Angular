import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidebarVisible: boolean = false;
  constructor() {}
  toggleSidebar() { 
  this.sidebarVisible = !this.sidebarVisible;
}
}
