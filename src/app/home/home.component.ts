import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from '../../shared/services/animation.service';
import { SharedService } from '../../shared/services/shared.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('waterCanvas') waterCanvas: ElementRef;
  public waterCtx: CanvasRenderingContext2D;
  private canvasHeight = window.innerHeight;
  private canvasWidth = window.innerWidth;
  private  maxStarRadius = 1.5;

  @ViewChild('skyCanvas', { static: true }) skyCanvas: ElementRef<HTMLCanvasElement>;
  public skyCtx: CanvasRenderingContext2D;

  public imgUrl = '../../assets/img/moon.png';
  public starGirlImgUrl = '../../assets/img/star-girl-purple.png';

  public activeLang = 'es';
  public homeData = 'home';
  private dot = '.';
  public homeStrings = [];

  constructor( private translate: TranslateService, 
               private sharedService: SharedService,
               private animationService: AnimationService
               ) {
    this.translate.setDefaultLang(this.activeLang);

   }

   //#region //* LYFECYCLES
  ngOnInit(): void {
    this.getStrings();
    this.fadeGsap();  
  }
  
  ngAfterViewInit() {
    this.waterCtx = this.waterCanvas.nativeElement.getContext('2d');
    
    this.renderWaterSkyField();
    // this.resizeCanvaas();
    this.renderWaterRippleEffect();

    
    this.renderSkyStars();


  }

  //#endregion

  private getStrings() {
    this.sharedService.gatLangFile().subscribe(element => {
      //  this.homeStrings = data[this.homeData];
       Object.keys(element[ this.homeData]).forEach((el) => {
        console.log(el);
        this.homeStrings.push(this.homeData + this.dot + el);
      });
    });
  }

  private fadeGsap() {
    this.animationService.fadeGsap('.water-msg');
    this.animationService.fadeSKyMsg('.sky-msg');
  }

  private renderWaterRippleEffect() {
    $('#water-home').ripples({
      resolution: 900,
      dropRadius: 20,
      perturbance: 0.08,
    })
  }

  //#region //* WATER SKY
  private renderWaterSkyField() {
    this.waterCanvas.nativeElement.width = window.innerWidth;
    this.waterCanvas.nativeElement.height = window.innerHeight;
    this.waterCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // this.waterCtx.fillRect(20,20,window.innerWidth,window.innerHeight);

    const stars = this.createWaterStars(window.innerWidth,window.innerHeight, 60);
    stars.forEach(star => {
      const x = star.x;
      const y = star.y;
      const r = star.r;
      this.fillCirlce(x, y, r, "rgb(255, 255, 255)");
    });
  }

  private fillCirlce(x, y, r, fillStyle) {
    this.waterCtx.beginPath();
    this.waterCtx.fillStyle = fillStyle;
    this.waterCtx.arc(x, y, r, 0, Math.PI * 2);
    this.waterCtx.fill();
  }


  private createWaterStars(width: number, height: number, spacing: number ) {
    const stars = [];  
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const star = {
          x: x + this.getRandom(spacing),
          y: y + this.getRandom(spacing),
          r: Math.random() * this.maxStarRadius,

        };
        stars.push(star);
      }
    }
    return stars;
  }

  //#endregion



  private callRenderSky() {
    // this.renderSkyStars();

  }

  private renderSkyStars() {
    this.skyCtx = this.skyCanvas.nativeElement.getContext('2d');

    this.skyCanvas.nativeElement.width = window.innerWidth;
    this.skyCanvas.nativeElement.height = window.innerHeight;

    this.skyCtx.fillStyle = 'rgba(1, 5, 22, 0.3)';
    this.skyCtx.fillRect(0,0,this.canvasHeight,this.canvasWidth);
    const stars: Array<any> = this.createSkyStars();

    setInterval(() => {
      this.skyCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach(star => {
        star.a += star.s,
        this.skyCtx.beginPath();
        this.skyCtx.arc(Math.cos(star.a) * star.r + this.canvasHeight / 2,
                    Math.sin(star.a) * star.r +  this.canvasHeight / 2,
                    2,
                    0,
                      Math.PI * 2);
        this.skyCtx.closePath();
        this.skyCtx.fillStyle = 'white';
        this.skyCtx.fill();              
      });
    }, 50);

  }

  createSkyStars(): Array<any> {
    // console.log('GET STAR');  
    const ArrayCapacity = 100;
    const stars = new Array(ArrayCapacity).fill(ArrayCapacity).map(() => {
      return { r: this.getRandom(this.canvasHeight), s: this.getRandom(0.01), a: this.getRandom(Math.PI* 2)    }
    });
    return stars;
  }

  private getRandom(n: number) {
    return Math.random() * n;
  }


  private resizeCanvaas() {
    window.addEventListener('resize', () => {
      (this.waterCanvas.nativeElement.width = window.innerWidth),
      (this.waterCanvas.nativeElement.height = window.innerHeight)
    })
  }








}

