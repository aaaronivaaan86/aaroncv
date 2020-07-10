import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StyleOption } from '../../shared/models/style-option.entity';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.css']
})
export class ThemeMenuComponent  {
  @Input() options: Array<StyleOption>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  changeTheme(themeToSet) {
    console.log(themeToSet);
    
    this.themeChange.emit(themeToSet);
  }

}
