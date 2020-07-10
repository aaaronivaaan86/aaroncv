import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/shared/services/shared.service';
import { ThemeService } from '../../shared/services/theme.service';
import { StyleOption } from 'src/shared/models/style-option.entity';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 public isCollapsed = false;
 options$: Observable<Array<StyleOption>> = this.themeService.getThemeOptions();

  constructor(private sharedService: SharedService, private themeService: ThemeService ) { }

  ngOnInit(): void {
        this.themeService.setTheme("deeppurple-amber");
  }


  public setCustomeLan(lang: string) {
    this.sharedService.setCustomeLang(lang);
  }

  public themeChangeHandler(themeToSet: string ) {
    console.log(themeToSet);
    
    this.themeService.setTheme(themeToSet);
  }

}
