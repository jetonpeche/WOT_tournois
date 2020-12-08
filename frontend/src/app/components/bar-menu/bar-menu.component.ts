import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent {

  constructor(private router: Router) { }

  onSeDeconnecter()
  {
    sessionStorage.clear();
    this.router.navigate([""]);
  }

}
