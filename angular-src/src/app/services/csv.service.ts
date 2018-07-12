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

    public download(csv:Blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(csv, 'my.csv');
        } else {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(csv);
            const now = new Date();
            const filename = `TNR_revenue-${now.getHours()}${now.getMinutes()}_${now.getMonth() + 1}${now.getDate()}${now.getFullYear()}.csv`;
            a.download = filename;;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

}