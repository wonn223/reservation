import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // 목표 : 호버링할 때 특정 아이디값이나 클래스명에 해당하는 곳에만 글자를 인터폴레이션으로 표시한다.
  // how? :
  transform(values: any[], eventStorage: any): any {
    let id = eventStorage.target.id;
    id *= 1;
    return values[id];
  }
}

@Pipe({
  name: 'changePrice'
})
export class PricePipe implements PipeTransform {
  // 문자열의 값을 숫자형태로 표기
  transform(values: string, price: string): any {
    if (values === 'c') { return '10,000원'; } else if (values === 'n') {
      return '15,000원'; } else if (values === 'e') {
         return '20,000원';
        } else { return '30,000원'; }
  }
}
