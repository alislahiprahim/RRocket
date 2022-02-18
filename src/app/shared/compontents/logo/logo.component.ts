import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <div class="d-flex align-items-end justify-content-start" [style]="'transform: ' + scale" dir="ltr">
       <img  class="logo-img" src="../../../../assets/images/logos/r-rocket.png" >
     <div class="logo-text d-flex flex-column align-items-start" [style]="'color: '+ color +' !important'">
      <h5>ROCKET</h5>
      <h6>ALWAYS YOU FAST</h6>
    </div>
  </div>
  `,
  styles: [
    `
    *{
       user-select: none; 
    }
    .logo-img {
      width:65px;
      height:85px;
      margin-bottom:5px;
    pointer-events: none;
    }
    
    h5{
      text-align:left;
      font-weight:700;
      font-family:'Roboto', sans-serif;
      padding-bottom:0;
      margin-bottom:0;
      font-size:29px;
      letter-spacing:4px;
      line-height:1;
      }
      h6{
      letter-spacing:1px; 
      text-align:left;
      padding-bottom:0;
      margin-bottom:0;
      font-weight:400;
      font-size:12px;
      font-family:'Roboto Serif', sans-serif;

      }
   `
  ]
})
export class LogoComponent implements OnInit {

  @Input() color: string = ''
  @Input() scale: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
