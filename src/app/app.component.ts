import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(500))
      // we can replacce above two line with welow line, but here time interval is same
      //transition('highlighted <=> normal', animate(500))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(0)'
      })),
      state('shrunker', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(500)),
      // below start mark used to represent any state
      // used to change shape
      transition('shrunker => *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          'borderRadius': '50px'
        })),
        animate(500)
      ]),
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunker';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    // delete logic
    this.list.splice(this.list.indexOf(item), 1);
  }
}
