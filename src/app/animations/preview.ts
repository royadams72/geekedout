import { trigger, state, style, transition, animate } from '@angular/animations';
export const ActiveTrigger = trigger('activeState', [
  state('inActive', style({
    'opacity': '0',
    'display':'none',
    'transform': 'translateX(50px)'
  })),
  state('active', style({
    'opacity': '1',
    'display':'block',
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
export const containerTrigger = trigger('containerState', [
  state('start', style({
    'min-height': 'auto'
  })),
  transition('* => start', [

    animate('500ms ease-out')
  ])
]);
