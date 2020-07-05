import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Educations } from '../../shared/models/education';
import { SharedService } from '../../shared/services/shared.service';
import { Education } from '../../shared/models/education.entity';
import { Languages } from '../../shared/models/languages.entity';
import { Language } from '../../shared/models/language.entity';
import { TranslateService } from '@ngx-translate/core';
import { CvSections } from '../../shared/const/cv-sections.enum';
import { Techs } from '../../shared/models/techs.entity';
import { OS } from '../../shared/models/operative.systems.entity';
import { DB } from '../../shared/models/db.entity';
import { ControlVersion } from '../../shared/models/control-version.entity';
import { AnotherTech } from '../../shared/models/another-tech.entity';
import { Frameworks } from '../../shared/models/frameworks.entity';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  public activeLang = 'es';
  private dot = '.';
  private education = 'education';
  public educations = Educations;
  public educationsArr: Education[] = [];
  private keysToReplace = ['grade', 'career', 'state', 'thesis'];

  public certificationsArr = [];
  public coursessArr = [];

  public languagesHeadersArr = [];
  public languagesArr = [];

  public techTableHd = [];

  public techs = Techs;

  public os = OS;
  public db = DB;
  public ot = AnotherTech;
  public cv = ControlVersion;
  public fwArr = [];

  // PolarArea
  public barChartOptions =  {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [
    'Bash',
    'SQL',
    'C#',
    'VB',
    'Py',
    'TS',
    'JS',
    'Css',
    'Html',
  ];
  public barChartData: ChartDataSets[] = [
    { data: [50, 80, 90, 70, 70, 80, 80, 90, 95], label: 'Lenguages' },
  ];
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];
  public barChartType: ChartType = 'bar';

  constructor(
    private sharedService: SharedService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(): void {
    this.getFile();
  }

  private getFile() {
    this.sharedService.gatLangFile().subscribe((data) => {
      // console.log(data[this.education]);
      this.buildEducation(data[CvSections.education]);
      this.buildCertifications(data[CvSections.certifications]);
      this.buildCourses(data[CvSections.courses]);
      this.buildLanguages(data[CvSections.languages]);
      this.buildTechs(data[CvSections.technologies]);

      this.buildFrameworks();
    });
  }

  //#region  Education
  private buildEducation(data: any) {
    Object.keys(data).forEach((eduKey) => {
      // console.log(eduKey);
      const edu = this.educations[eduKey];
      // console.log(edu );
      const myEdu: Education = new Education();
      Object.entries(edu).forEach((eduObj) => {
        // console.log(eduObj);
        // myEdu[eduObj[0]] = eduObj[1];
        // const x = this.education + this.dot + eduKey + this.dot + eduObj[0];
        // console.log(x);
        if (this.setMyEducationObj(eduObj[0])) {
          myEdu[eduObj[0]] =
            this.education + this.dot + eduKey + this.dot + eduObj[0];
        } else {
          myEdu[eduObj[0]] = eduObj[1];
        }
      });
      // console.log(myEdu);
      this.educationsArr.push(myEdu);
    });
  }

  private setMyEducationObj(key: string): boolean {
    return this.keysToReplace.find((x) => x == key) !== undefined;
  }
  //#endregion

  //#region Certifications
  private buildCertifications(data: any) {
    // console.log(data);
    Object.entries(data).forEach((element) => {
      // console.log(element);
      element[1]['state'] =
        CvSections.certifications + this.dot + element[0] + this.dot + 'state';
      this.certificationsArr.push(element[1]);
    });
  }

  //#endregion

  //#region Courses
  private buildCourses(data: any) {
    // console.log(data);
    Object.values(data).forEach((element) => {
      // console.log(element);
      this.coursessArr.push(element);
    });
    // console.log(this.coursessArr);
  }

  //#endregion

  //#region Languages
  private buildLanguages(data: any) {
    Object.entries(data).forEach((element) => {
      // console.log(element);
      if (element[0] === 'language') {
        this.buildLanguage(element);
      } else {
        this.buildLangTableHeaders(element);
      }
    });
  }

  private buildLanguage(element: any) {
    Object.keys(element[1]).forEach((el) => {
      const language = Languages[el];
      language.name =
        CvSections.languages + this.dot + element[0] + this.dot + el;
      // console.log(language);
      this.languagesArr.push(language);
    });
  }

  private buildLangTableHeaders(element: any) {
    Object.keys(element[1]).forEach((el) => {
      this.languagesHeadersArr.push(
        CvSections.languages + this.dot + element[0] + this.dot + el
      );
      // console.log(language);
    });
  }
  //#endregion

  //#region  Techs
  private buildTechs(data: any) {
    // console.log(data);
    Object.keys(data).forEach((element) => {
      this.techTableHd.push(CvSections.technologies + this.dot + element);
    });
  }
  //#endregion

  //#region Frameworks

  private buildFrameworks() {
    Frameworks.forEach((element) => {
      console.log(element);
      this.fwArr.push(element);
    });
  }

  //#endregion

  //#region CHART EVENTS
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  //#endregion
}
