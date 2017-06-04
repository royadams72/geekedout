import { Directive, Renderer2, ElementRef, OnInit , HostListener} from '@angular/core';
@Directive({
  selector: '[getSizeDirective]'
})
export class ImageSizeDirective{
  private nativeElement : any;
  public itemArr:Array<any> = [];
  constructor( private renderer : Renderer2, private element : ElementRef ) {
    this.nativeElement = element.nativeElement;
  }
  ngAfterViewInit(){
      setTimeout(()=>{

      //var child = this.nativeElement.querySelectorAll('.item');
    let divHeight =  this.renderer.selectRootElement(this.nativeElement);
  //  this.itemArr.push(this.nativeElement)
        console.log(divHeight)

      },700)

    }

@HostListener('onload') divLoaded(event){
  console.log('loaded')
}




  }
