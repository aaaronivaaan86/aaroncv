import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }
  
  gatLangFile(): Observable<any> {
    return this.http.get('../assets/i18n/es.json');
  }

}
