import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { fadeInRightAnimation, fadeInLeftAnimation, } from 'angular-animations';
@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    fadeInLeftAnimation({ delay: 100 }),
    fadeInRightAnimation({ delay: 100 }),
  ]
})
export class ImageSliderComponent implements OnInit, OnChanges {

  readonly env = environment;
  currentViewedImage: number = 0;
  animateToRight: boolean = false;
  animateToleft: boolean = false;

  @Input() height: string = '';
  @Input() width: string = '';
  @Input() imagesList: string[] = [];
  @Input() navs: boolean = true;


  constructor() { }

  ngOnChanges(): void {

    // this.imagesList.length != 0 ? this.currentViewedImage = this.imagesList[0] : this.currentViewedImage = '';

  }

  ngOnInit(): void {
    this.currentViewedImage = 0;
  }

  nextImg() {

    this.imagesList.length > 0 && this.currentViewedImage < this.imagesList.length - 1 ? [this.currentViewedImage++, this.animateToRight = false,
    setTimeout(() => {
      this.animateToRight = true;
    }, 1)] : null;

  }

  prevImg() {
    this.imagesList.length > 0 && this.currentViewedImage > 0 ? [this.currentViewedImage--, this.animateToleft = false,
    setTimeout(() => {
      this.animateToleft = true;
    }, 1)] : null;

  }

}
