import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class StyleManagerService {
  public showImgBg = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor() {}

  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute("href", href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    console.log(key);
    
    const existingLinkElement = getExistingLinkElementByKey(key);
    console.log(existingLinkElement);
    
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }


  public changeBgStyle() {
    this.showImgBg = !this.showImgBg;
    this.change.emit(this.showImgBg);
    setTimeout(() => {
      this.showImgBg = !this.showImgBg;
      this.change.emit(this.showImgBg);
    }, 500);
  }






}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement("link");
  linkEl.setAttribute("rel", "stylesheet");
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `app-${key}`;
}