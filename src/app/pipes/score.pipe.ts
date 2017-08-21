import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: String[], args?: any): any {
    if(!value)
      return 0
    var total = 0;
    for(var i = 0; i < value.length; i++) {
      switch(value[i]) {
        case '1':
          total += 1 
          break;
        case '2':
          total += 2 
          break;
        case '3':
          total += 3 
          break;
        case '4':
          total += 4 
          break;
        case '5':
          total += 5 
          break;
        case '6':
          total += 6 
          break;
        case '7':
          total += 7 
          break;
        case 'Force':
          if(total == 0)
            total += 1
          else
            total *= 2 
          break;
        case 'Mirror':
          total += 1 
          break;
        case 'Bolt':
          total += 1 
          break;
        case 'Blast':
          total += 1 
          break;
      }
    }
    return total;
    
  }

}
