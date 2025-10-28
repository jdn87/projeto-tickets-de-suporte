// arquivo: projeto-tikecte-de-suporte/src/utils/searchFilter.js

/**
 * Função de filtro universal para a classe Database.
 * Verifica se uma linha (row) da tabela corresponde a todos os critérios de busca (search).
 * * @param {object} row - O objeto (ticket) a ser testado.
 * @param {object} search - O objeto de busca com {chave: valor} a ser comparado.
 * @returns {boolean} True se a linha corresponder a todos os critérios, false caso contrário.
 */
export function searchFilter(row, search) {
    // Garante que o row seja um objeto e o search exista para evitar erros.
    if (!row || !search) {
        return false;
    }

    // Object.entries(search).every() garante que TODOS os critérios de busca sejam atendidos.
    return Object.entries(search).every(([key, value]) => {
        
        // 1. Decodifica o valor do parâmetro de busca
        const decodedValue = decodeURIComponent(value);
        
        // 2. CORREÇÃO: Remove espaços em branco antes de criar a RegExp
        const trimmedValue = decodedValue.trim();
        
        // 3. Cria a RegExp com o valor limpo (case-insensitive)
        const regex = new RegExp(trimmedValue, 'i');
        
        // 4. Testa a regex contra o valor correspondente na linha do banco de dados
        return regex.test(row[key]);
    });
}