import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ActiveTrigger, TitleAnim, LoaderAnim } from '../../animations/preview';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Props } from '../../models/props'
import { isEmpty } from '../../utils/checkObjs'
@Component({
  selector: 'app-category',
  templateUrl: './category-component.html',
  animations: [ActiveTrigger, TitleAnim, LoaderAnim]
})
export class CategoryComponent{
  @Input('props') props:Props;
  private items: Array<any> = [];
  private catTitle:string;
  private loadingMsg:string;
  private colClass:string;
  private isActive: string = 'inActive';
  public loading: boolean = true;
  public showTitle: string = 'false';
  public showLoader: string = 'true';
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
      //Wait for the array to be populated
    if (!isEmpty(this.props)){
        this.items = this.props.items;
        this.catTitle = this.props.catTitle;
        this.loadingMsg = this.props.loadingMsg;
        this.colClass = this.props.colClass;
      //Then turn off loader
        setTimeout(()=>{
        this.isActive = 'active';
        this.loading = false;
        this.showTitle = 'true';
        this.showLoader = 'false';
      },800);
    }
  }

}
