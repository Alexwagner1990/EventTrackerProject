import { Pipe, PipeTransform } from '@angular/core';
import { Tournament } from '../models/tournament';

@Pipe({
  name: 'tournamentsAfterDate'
})
export class TournamentsAfterDatePipe implements PipeTransform {

  transform(value: Tournament[], date: Date): Tournament[] {
    const results = [];
    value.forEach((element, index) => {
      if (element.getStartDate() >= date) {
        results.push(value[index]);
      }
    });
    return results;
  }

}
