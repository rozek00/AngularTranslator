import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { LogService } from '../app/services/logingg/logingg.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule]
})

export class App implements OnInit {
  currentUrl = '';
  loggedIn = false;
  constructor(private router: Router, private auth: LogService) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/dashboard']);
  }

  protected title = 'Frontend';
}
