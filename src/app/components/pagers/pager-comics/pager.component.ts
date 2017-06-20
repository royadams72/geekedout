import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-pager-comics',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class ComicsPagerComponent{
  @Input() nextItems:number;
  @Input() totalItems:number;
  @Input() offset:any;
  @Input() currentPage:number;

  public itemsPerPage: number;
  public firstTime:boolean = true;
  public pageNumbers:Array<any> = [];
  public totalPages:number;
  constructor(private router:Router) {}

  ngAfterViewInit() {
      this.itemsPerPage = 24;

      console.log(this.itemsPerPage)
        setTimeout(()=>{
          this.handlePagination()

        }, 2000);

      }

  public calcPages(){
   console.log(this.totalItems, this.itemsPerPage)
  return  Math.round(Math.ceil(+this.totalItems / +this.itemsPerPage))
  }

  public calcNextPage(){

    let itemsPerPage = +this.itemsPerPage;
    let nextItems = +this.nextItems;
    return itemsPerPage + nextItems
  }
  public handlePagination(){
    let loop: number = 3;
    let count = 0;
    this.totalPages = this.calcPages();

    if(this.totalPages < 3){
      loop = this.totalPages;
    }else{
      loop = 3;
    }
    let pages: number;
    this.pageNumbers = [];
    if(this.totalPages > 3){
        for(let i = 0; i < loop; i++){
          if(this.currentPage >= this.totalPages-loop){//at the end of avialable pages
           pages = +this.totalPages - loop + count + 1;

            }else{
            pages = +this.currentPage + count;
          }
          this.pageNumbers.push(pages);
          count++
        }
      }

  }

  public nextPage(){
      // console.log(this.nextItems)
      // console.log(this.totalPages);
      // console.log(this.currentPage);
      // console.log(this.totalPages)
      console.log(this.currentPage , this.totalPages)
  if(+this.currentPage != this.totalPages){
    this.nextItems =+ this.calcNextPage();
  // console.log(typeof this.nextItems)
    this.currentPage++;
    this.router.navigate(['/comics', +this.nextItems, this.offset, this.currentPage]);
    this.handlePagination();
   }
  }

  public prevPage(){
     if(+this.currentPage != 1){
     +this.currentPage--;
      this.router.navigate(['/comics', +this.nextItems, this.offset, this.currentPage]);
      this.handlePagination();
    }

  }

  public getPage(page){
    this.router.navigate(['/comics', page]);
    //this.currentPage = page;
    this.handlePagination();
  }

}
