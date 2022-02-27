import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
@Component({
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {


  isLoading: Subject<boolean> | undefined;


  constructor(private loaderService: LoaderService) {}
  
  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    this.isLoading = this.loaderService.isLoading;
  }




}
