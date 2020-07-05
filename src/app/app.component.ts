import { Component } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aaronoview';
  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}

