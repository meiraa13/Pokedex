export const baseUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'
 
async function catchPokemon(){
    let ul = document.querySelector('.ul-main')
        ul.innerHTML = ''
        let h2 = document.createElement('h2')
        h2.innerText = 'Carregando...'
        h2.classList = 'notFound'

        ul.appendChild(h2)
    try{
        const request = await fetch(baseUrl, {method:'GET'})
        
        if(request.ok){
            const response = await request.json()
            ul.innerHTML =''
            
            return response
        }else {
            ul.innerHTML = ''
            console.log('erro')
        }
    } catch(err){
        console.log(err)
    }
}

export { catchPokemon }