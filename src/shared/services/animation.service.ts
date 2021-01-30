import { Injectable } from '@angular/core';
import { gsap, Power2, TimelineLite } from 'gsap';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  public fadeGsap(elem: string): void {
    const t1 = new TimelineLite();
    t1.from(elem , {  opacity: 0, duration: 3  } );
  }



}
