export function index({req, res, database}) {
    const {status} = req.query // Extrai o parâmetro 'status' da query
    
    // Cria o objeto de pesquisa/filtro, ou null se não houver status
    const search = status ? { status } : null
    
    // Passa o objeto de pesquisa para a função select
    const tickets = database.select('tickets', search) 
    
    res.end(JSON.stringify(tickets)) // Retorna a lista de tickets (filtrada ou completa)
}