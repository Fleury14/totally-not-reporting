import { IMain, IDatabase } from 'pg-promise'
import * as pgPromise from 'pg-promise';
import { error } from 'util';


console.log('Initializing database');
const cn = {
    host: 'localhost',
    port: 5436,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
}

if (process.platform == 'win32') {
    cn.host = '192.168.99.100';
}

const pgp:IMain = pgPromise({
    // message to display on connection
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database: ', cp.database);
    },
    // message to display on errors
    error(err, e) {
        if( e.cn ) {
            console.log('Connection error :(');
        }
        if(e.query) {
            console.log('Query Error :(');
        }

        if (e.ctx) {
            console.log('Task or transaction error :(');
        }
    }
})

const db:IDatabase<any> = pgp(cn);
    
export = db;
