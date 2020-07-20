import { Component, OnInit } from '@angular/core';
import { ProfessionalExperience } from '../../shared/const/professional-experience';
import { PersonalExperience } from '../../shared/const/personal-experience';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/shared/services/shared.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public activeLang = 'es';
  public proffesional = ProfessionalExperience;
  public personal = PersonalExperience;
  public personalArr = [];

  private experienceStr = 'experience'; 
  private personalStr = 'personal';
  private dot = '.';

  constructor(private translate: TranslateService, private sharedService: SharedService) {     
    // this.translate.setDefaultLang(this.activeLang);
    this.sharedService.seDefaulttLanguage();

  }

  ngOnInit(): void {
    this.buildPersonalExp();
  }
  private buildPersonalExp(){
    this.sharedService.gatLangFile().subscribe(data => {
      Object.keys(data[this.experienceStr][this.personalStr] ).forEach(el => {
        this.personal[el].project = this.experienceStr + this.dot + this.personalStr + this.dot + el + this.dot + 'title';
        // console.log(this.personal[el].title);
        this.personalArr.push(this.personal[el]);
      });
    })

  }



}
