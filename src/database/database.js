// arquivo: projeto-tikecte-de-suporte/src/database/database.js

import fs from 'node:fs/promises';
// Importa a nova função de filtro
import { searchFilter } from '../utils/searchFilter.js'; 

const DATABASE_PATH = new URL('db.json', import.meta.url);

export class Database {
    #database = {}

    constructor() {
        fs.readFile(DATABASE_PATH, 'utf-8')
            .then((data) => { this.#database = JSON.parse(data) })
            .catch(() => { this.#persist() })
    }

    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database, null, '\t'))
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()

    }

    select(table, search) {
        let data = this.#database[table] ?? []
        
        // Se houver critérios de busca, aplica o filtro usando a função importada.
        if (search) { 
            data = data.filter(row => searchFilter(row, search));
        }
        
        return data
    }
    
    update(table, id, data) {
   
        const rowIndex = this.#database[table].findIndex((row) => row.id === id);

            if(rowIndex > -1){
                this.#database[table][rowIndex] = {
                    ... this.#database[table][rowIndex],
                    ...data,
                }
                
               this.#persist()
            }
    }

    delete(table, id){
           const rowIndex = this.#database[table].findIndex((row) => row.id === id);
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}