import { Component, Input } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { RouterOutlet } from '@angular/router';
import { StyleManagerService } from 'src/shared/services/style-manager.service';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aaronoview';
  public showImgBg = false;

  constructor(private styleManagerService: StyleManagerService) {
    this.styleManagerService.change.subscribe(showBG => {
      this.showImgBg = showBG;
    })
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}

