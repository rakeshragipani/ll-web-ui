import { Injectable } from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  padZero(number, length) {
    let str = '' + number;
    if (str.length <= length) {
      while (str.length < length) {
        str = '0' + str;
      }
      return str;
    } else {
      return str.slice(str.length - length);
    }
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[1], 10),
        month : parseInt(date[0], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.padZero(date.month, 2) + this.DELIMITER + this.padZero(date.day, 2) + this.DELIMITER + date.year : '';
  }
}