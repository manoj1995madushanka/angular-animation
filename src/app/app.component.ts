import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
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
    ]),
    trigger('list1', [
      state('in', style({
        'opacity': '1',
        transform: 'translateX(0)'
      })),
      // void means object not added to dom yet
      // apply animation when object adding to dom
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100)'
        }),
        animate(300)
      ]),
      transition(
        '* => void', animate(300, style({
          transform: 'translateX(100)',
          opacity: 0
        }))
      )
    ]),
    trigger('list2', [
      state('in', style({
        'opacity': '1',
        transform: 'translateX(0)'
      })),
      // void means object not added to dom yet
      // apply animation when object adding to dom
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 //time of total time 
          }),
          style({
            transform: 'translateX(-50x)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20x)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0x)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition(
        '* => void', [
        // group method execute animation of the array simultaniously 
        group([
          animate(300,
            style({
              color: 'red'
            }),
          ),
          animate(300,
            style({
              transform: 'translateX(100)',
              opacity: 0
            }),
          )
        ])
      ]
      )
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

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }

}
