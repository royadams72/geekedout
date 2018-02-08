import { Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public dataTarget:string = 'none';
  public dataToggle:string = 'none';
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('window', 'load', (evt) => {
      let winWidth = evt.currentTarget.innerWidth;

        if(winWidth <= 1000){
          this.dataTarget = '.navbar-collapse';
          this.dataToggle = 'collapse';
        }else{
          this.dataTarget = 'none';
          this.dataToggle = 'none';
        }
          console.log(this.dataTarget);
    })
    this.renderer.listen('window', 'resize', (evt) => {
      let winWidth = evt.currentTarget.innerWidth;

        if(winWidth <= 1000){
          this.dataTarget = '.navbar-collapse';
          this.dataToggle = 'collapse';
        }else{
          this.dataTarget = 'none';
          this.dataToggle = 'none';
        }
          console.log(this.dataTarget);
    })
  }

}
