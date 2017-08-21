import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key].replace(/DFW/g, '').replace(/_/g,' ').replace(/Live/g, '').replace(/Legacy/g, '').replace(/Sandbox/g, '').replace(/Prod/g, ''))));

  }
}