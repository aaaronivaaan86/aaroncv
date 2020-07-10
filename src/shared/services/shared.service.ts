import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient, private translate: TranslateService   ) { }
  
  gatLangFile(): Observable<any> {
    return this.http.get('../assets/i18n/es.json');
  }


  public seDefaulttLanguage() {
    const browserLang = navigator.language || window.navigator['userLanguage'];
    this.translate.setDefaultLang(String(browserLang).substr(0-2).toLowerCase());
  }

  public setCustomeLang(lang: string) {
    this.translate.use(lang);
  }



}
