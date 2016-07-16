import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Raise the formatted duration
 */
@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(duration): string {
        let formattedString = '';
        let days = duration.days();

        if (0 !== days) {
            formattedString += days + ' ';
        }

        return formattedString +
            // @todo remove this hack (https://github.com/moment/moment/issues/1048)
            moment(duration._data).format('HH:mm:ss');
    }
}