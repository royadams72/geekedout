import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent{
  @Input() totalPages:number;
  @Input() currentPage:number;
//  public currentPage:number;
  public pageNumbers:Array<any> = [];
  constructor(private router:Router) { }

  ngAfterViewInit() {
        setTimeout(()=>{
          this.handlePagination()
        }, 800);

      }

  public handlePagination(){
 //console.log(this.totalPages)
    let loop = 3;
    let count = 0;
    //let currentPage = +this.currentPage
    let pages: number
    console.log(this.currentPage)
    this.pageNumbers = [];
     if(+this.currentPage == this.totalPages-loop){

     }
    for(let i = 0; i < loop; i++){
      if(+this.currentPage >= this.totalPages-loop){
        pages = this.totalPages - loop + count;
        }else{
        pages = +this.currentPage + count
      }
      this.pageNumbers.push(pages);
      count++
  }

  }

  public nextPage(){
    if(+this.currentPage != this.totalPages){
    +this.currentPage++;
    this.router.navigate(['/movies', +this.currentPage]);
    this.handlePagination();
    }
  }

  public prevPage(){
      if(+this.currentPage != 1){
      +this.currentPage--;
      this.router.navigate(['/movies', +this.currentPage]);
      this.handlePagination();
    }

  }

  public getPage(page){
    this.router.navigate(['/movies', page]);
    this.currentPage = page;
    this.handlePagination();
  }

}
