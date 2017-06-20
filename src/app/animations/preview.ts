import { trigger, state, style, transition, animate } from '@angular/animations';
export const ActiveTrigger = trigger('activeState', [
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
  state('faded', style({
    'opacity': '0',
    'display':'none',
    'transform': 'translateX(70px)'
  })),
  state('opaque', style({
    'opacity': '1',
    'display':'block',
    'transform': 'translateX(0)'
  })),
  transition('* => opaque', [ style({
    'opacity': '0',
    'display':'none',
    'transform': 'translateX(70px)'
  }),
    animate('700ms ease-out')
  ])
]);
