// const Pool = require("pg").Pool
import pg from "pg"

const connectDatabase = () => { 


    const pool = new pg.Pool ({
        user: 'postgres',
        password: 'Mariagianne0420',
        database: 'jwttutorial',
        host: 'localhost'
});

return pool

}

export {connectDatabase};

