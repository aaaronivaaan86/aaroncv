import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/shared/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public activeLang = 'es';
  public imgUrl = '../../assets/img/cyber_p.png';

  private dot = '.';
  private pizarnik = 'pizarnik';
  private keysArr = [];

  public firstPart: string[] =[];
  public secondPart: string[] =[];

  constructor(private translate: TranslateService, private sharedService: SharedService,) {
    this.translate.setDefaultLang(this.activeLang);

   }

  ngOnInit(): void {
    this.getContent();
  }

  getContent() {
    this.sharedService.gatLangFile().subscribe(data => {
      
      const poem = data[this.pizarnik];
      Object.keys(poem).forEach(key => {
        this.keysArr.push(key);
      });

      Object.keys(poem[ this.keysArr[0]]).forEach(el => {
        this.firstPart.push(this.pizarnik + this.dot + this.keysArr[0] + this.dot + el);
      })

      console.log(this.firstPart);
      


      Object.keys(poem[ this.keysArr[1]]).forEach(el => {
        this.secondPart.push(this.pizarnik + this.dot + this.keysArr[1] + this.dot + el);
      })

      
      console.log(this.secondPart);
      
    })
  }

}

