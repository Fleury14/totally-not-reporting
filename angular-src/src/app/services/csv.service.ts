import { Injectable } from '@angular/core';

@Injectable()

export class CsvService {

    public create(data: object[], fields:string[]): string {
        let string = "";
        for (let row of data) {

            for (let key in row) {
                if (typeof row[key] === 'number') string += `${row[key]},`
                else {string +=`"${String(row[key]).replace(/"/g, "'")}",`}
            }
            string = string.slice(0, -1) + '\n'
        }
        return string;
    }

}