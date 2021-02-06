import { Injectable } from '@angular/core';
import { gsap, Power2, TimelineLite } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { 
    gsap.registerPlugin(ScrollTrigger);
  }

  public fadeGsap(elem: string): void {
    const t1 = new TimelineLite();
    t1.from(elem , {  opacity: 0, duration: 5  } );
  }

  public fadeSKyMsg(elem: string) {
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        toggleActions: 'restart pause reverse pause',
        scrub: true,
      },
      // rotation: 360,
      opacity: 1,
      duration: 3
    });
  }


}
