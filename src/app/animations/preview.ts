import { trigger, state, style, transition, animate } from '@angular/animations';
export const ActiveTrigger = trigger('activeState', [
  state('inActive', style({
    'opacity': '0'
    // 'transform': 'translateX(50px)'
  })),
  state('active', style({
    'opacity': '1',
    // 'transform': 'translateX(0)'
  })),
  transition('* => active',[
    animate('50ms ease-out')
  ])
]);
export const DetailsTrigger = trigger('detailsState', [
  state('inActive', style({
    'opacity': '0',
    'display':'none',
    'transform': 'translateX(50px)'
  })),
  state('active', style({
    'opacity': '1',
    'display':'flex',
    'transform': 'translateX(0)'
  })),
  transition('* => active', [ style({
    'opacity': '0',
    'display':'none',
    'transform': 'translateX(50px)'
  }),
    animate('500ms ease-out')
  ])
]);
export const TitleAnim = trigger('titleState', [
  state('false', style({
    'opacity': '0'
  })),
  state('true', style({
    'opacity': '1'
  })),
  transition('false <=> true', [
    animate('700ms ease-out')
  ])
]);

export const LoaderAnim = trigger('loaderState', [
  state('false', style({
    'position': 'absolute',
    'top': '100px',
    'left':'0',
    'z-index': '12000',
    'width': '100%',
    'opacity': '0',
    'display': 'none'
  })),
  state('true', style({
    'position': 'absolute',
    'top': '100px',
    'left':'0',
    'z-index': '12000',
    'width': '100%',
    'opacity': '1',
    'display': 'block'
  })),
  transition('false <=> true', [
    animate('700ms ease-out')
  ])
]);
