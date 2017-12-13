import { transition, style, state, animate, trigger } from '@angular/animations';

export const slideAnimation = [
    // 모든 트랜지션과 상태 변화가 trigger안에서 이뤄진다.
    trigger('slide', [
        state('*', style({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        })),

        // 트랜지션의 시작 지점
        transition(':enter', [
            style({
                right: '-400px',
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }),

        // 트랜지션을 어떻게? 콜백함수의 성격(추정, why? 트랜지션과 상태 변화에 구체적으로 어떤 변화가 생길지가 여기에 적혀 있어서.) 
        // 최종 변경 상태가 어떨지는 animate의 동작에 달려있다.
        animate('.5s ease-in-out', style({
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ]),
        transition(':leave', [
            animate('.5s ease-in-out', style({
                right: '-400px',
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])

    ])
];
