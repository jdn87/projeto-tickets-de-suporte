
export  function extratactQueryParams(query){
    return query.slice(1)
    .split("&")
    .reduce((queryParam, param)=> {
         const [key, value] = param.split("=")
         queryParam[key] = value

         return queryParam
    },{})
   
}