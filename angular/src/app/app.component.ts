import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pet-trainer'; 
  constructor(private router: Router) {}

  redirect(path: string): void {
    console.log(path);
    this.router.navigate([path]);
  }
}
