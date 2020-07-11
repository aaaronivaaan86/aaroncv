import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StyleOption } from '../models/style-option.entity';
import { StyleManagerService } from "../../shared/services/style-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private styleManager: StyleManagerService) { }

  getThemeOptions(): Observable<Array<StyleOption>> {
    return this.http.get<Array<StyleOption>>("assets/theme/options.json");
  }

  setTheme(themeToSet) {
    this.styleManager.setStyle(
      "theme",
      `../../assets/theme/${themeToSet}.css`
    );
  }


}
