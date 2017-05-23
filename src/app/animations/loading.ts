import { trigger, state, style, transition, animate } from '@angular/animations';
export const ActiveTrigger = trigger('activeState', [
  state('loading', style({
    color: '#ffffff'
   })),
  state('inService', style({
      color: '#000000'
    })),
  transition('default <=> active', [

    animate('500ms ease-out')
  ]),
  transition('inService <=> default', [

    animate('500ms ease-out')
  ])
]);
