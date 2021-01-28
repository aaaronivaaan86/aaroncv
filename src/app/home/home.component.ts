import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/shared/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private canvasHeight = window.innerHeight;
  private canvasWidth = window.innerWidth;
  private  maxStarRadius = 1.5;


  public imgUrl = '../../assets/img/moon.png';
  public starGirlImgUrl = '../../assets/img/star-girl.png';



  public activeLang = 'es';
  public homeData = 'home';
  private dot = '.';


  public homeStrings = [];

  
  constructor(private translate: TranslateService, private sharedService: SharedService,) {
    this.translate.setDefaultLang(this.activeLang);

   }

  ngOnInit(): void {
    this.getContent();
    
  }
  
  // ngAfterViewInit() {
  //   this.ctx = this.myCanvas.nativeElement.getContext('2d');
  //   this.renderCanvas();
  // }
  
  getContent() {
    this.sharedService.gatLangFile().subscribe(element => {
      //  this.homeStrings = data[this.homeData];
       Object.keys(element[ this.homeData]).forEach((el) => {
        console.log(el);
        this.homeStrings.push(this.homeData + this.dot + el);



      });
    });
  }


  renderCanvas() {
    this.myCanvas.nativeElement.width = window.innerWidth;
    this.myCanvas.nativeElement.height = window.innerHeight;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // this.ctx.fillRect(20,20,window.innerWidth,window.innerHeight);


    const stars = this.createStars(window.innerWidth,window.innerHeight, 60);
    stars.forEach(star => {
      const x = star.x;
      const y = star.y;
      const r = star.r;
      this.fillCirlce(x, y, r, "rgb(255, 255, 255)");
    });
  }  


  loop() {
    // console.log(this.getStars());
    // const stars: Array<any> = this.getStars();
    

    this.ctx.fillStyle = 'rgba(1, 5, 22, 0.3)';
    this.ctx.fillRect(0,0,this.canvasHeight,this.canvasWidth);
    // stars.forEach(star => {
    //   star.a += star.s,
    //   this.ctx.beginPath();
    //   this.ctx.arc(Math.cos(star.a) * star.r + this.canvasHeight / 2,
    //               Math.sin(star.a) * star.r +  this.canvasHeight / 2,
    //               2,
    //               0,
    //                 Math.PI * 2);
    //   this.ctx.closePath();
    //   this.ctx.fillStyle = 'white';
    //   this.ctx.fill();
              
    // });

    requestAnimationFrame(this.loop);

  }




  // getStars(): Array<any> {
  //   console.log('GET STAR');  
  //   const ArrayCapacity = 100;
  //   const stars = new Array(ArrayCapacity).fill(ArrayCapacity).map(() => {
  //     return { r: this.getRandom(this.canvasHeight), s: this.getRandom(0.01), a: this.getRandom(Math.PI* 2)    }
  //   });
  //   return stars;
  // }

  private createStars(width: number, height: number, spacing: number ) {
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


  private fillCirlce(x, y, r, fillStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }



  private getRandom(n: number) {
    return Math.random() * n;
  }





}

