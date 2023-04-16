import { createPool } from "mysql2/promise"

const pool = createPool({
    host: 'containers-us-west-35.railway.app',
    user: 'root',
    password: 'J9Vu7yrGsywc4Lps5NOq',
    port: 7576,
    database: 'railway'
})


export {pool}