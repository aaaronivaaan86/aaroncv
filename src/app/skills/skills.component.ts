import { Component, OnInit } from '@angular/core';

import { ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Educations } from '../../shared/const/education';
import { SharedService } from '../../shared/services/shared.service';
import { Education } from '../../shared/models/education.entity';
import { Languages } from '../../shared/const/languages.entity';

import { TranslateService } from '@ngx-translate/core';
import { CvSections } from '../../shared/const/cv-sections.enum';
import { Techs } from '../../shared/const/techs.entity';
import { OS } from '../../shared/const/operative.systems.entity';

import { DB } from '../../shared/const/db.entity';
import { ControlVersion } from '../../shared/const/control-version.entity';
import { AnotherTech } from '../../shared/const/another-tech.entity';
import { Frameworks } from '../../shared/const/frameworks.entity';

import { CvSkilsVisibility }   from '../../shared/const/cv-sections-visibility';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {

  public skillsVisibility = CvSkilsVisibility;

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

  public arr = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
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
    { data: [50, 80, 90, 70, 70, 80, 80, 90, 95], label: 'Languages' },
  ];
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];
  public barChartType: ChartType = 'bar';

  constructor(
    private sharedService: SharedService,
    private translate: TranslateService
  ) {
    // this.translate.setDefaultLang(this.activeLang);
    this.sharedService.seDefaulttLanguage();
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
      // console.log(element);
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

  //#region Visibility
  public changeVisibility(skill: string) {
    // console.log(skill);    
    this.skillsVisibility[skill].visible = !this.skillsVisibility[skill].visible;
  }
 
  //#endregion



}

