import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {

  @Input('innerHtml') innerHtml! :string;
  @Input('loading') isLoading: Boolean = false;

  constructor(private el:ElementRef) { }

  ngOnChanges(): void {
    if (this.isLoading){
      this.el.nativeElement.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
      this.el.nativeElement.setAttribute("disabled","true")
    }else{
      this.el.nativeElement.innerHTML = this.innerHtml;
      this.el.nativeElement.setAttribute("disabled", "false")

    }
  }

}
