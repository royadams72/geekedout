import { Injectable } from '@angular/core';

@Injectable()
export class ElapsedTimeService {
  public d:any = new Date();
  public today:any = new Date((this.d.getMonth()+1) + "/" + this.d.getDate()+ "/" + this.d.getFullYear());
  public diffDays:number
  constructor() {
  }


  public setDay(){
    if (localStorage.getItem('date') !== null){
      let twoDaysAgo = new Date(localStorage.getItem('date'))
      let timeDiff = Math.abs(this.today.getTime() - twoDaysAgo.getTime());
      this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    }
    //console.log(this.diffDays);
  }
  
 public hasTwoDaysPast(){
   if(this.diffDays <= 2 || this.diffDays == undefined){
     return false
   }else{
     return true;
   }

 }

 public isInfoSet(name:string){
   if(this.diffDays >= 2 || this.diffDays == undefined || localStorage.getItem(name) === null){
     return false
   }else{
     return true;
   }
 }
  public setItems(item:string, itemData:any){
    // console.log(this.diffDays)
    //  localStorage.setItem('configuration', JSON.stringify(imagedata));
       localStorage.setItem(item, itemData);
       localStorage.setItem('date', this.today);

   }
}
