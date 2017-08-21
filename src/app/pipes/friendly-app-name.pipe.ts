import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyAppName'
})
export class FriendlyAppNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    
    return value.replace(/DFW/g, '').replace(/_/g,' ').replace(/Live/g, '').replace(/Legacy/g, '').replace(/Sandbox/g, '').replace(/Prod/g, '');
  }

}
