import { catchPokemon } from "./requests.js"


async function renderPkm (){
    let requestApi = await catchPokemon()
   
    let arrayPkm = requestApi.results
    let ul = document.querySelector('.ul-main')
   
    arrayPkm.forEach((pokemon)=>{
        let template = createPkm(pokemon)
        ul.appendChild(template)

    })
}
renderPkm()

let contador = 1 

function createPkm(pokemon){
    let li = document.createElement('li')
    li.classList = 'm-bottom'

    let img = document.createElement('img')
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.slice(34,-1)}.png`
    let p1 = document.createElement('p')
    p1.innerText = contador++
    let p = document.createElement('p')
    p.innerText = `- ${pokemon.name}`

    li.append(img,p1, p)

    return li
}

function create1Pkm(pokemon){
    let li = document.createElement('li')
    li.classList = 'm-bottom'

    let img = document.createElement('img')
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.species.url.slice(42,-1)}.gif`
    img.classList = 'gif'
    let p = document.createElement('p')
    p.innerText = pokemon.name
    let p2 = document.createElement('p')
    p2.innerText = `Type: ${pokemon.types[0].type.name}`
    p2.classList = 'type'

    if(pokemon.types[0].type.name == 'electric'){

        p2.style.backgroundColor = 'var(--type-1)'
    }else if (pokemon.types[0].type.name == 'grass'){

        p2.style.backgroundColor = 'var(--type-2)'
    }else if (pokemon.types[0].type.name == 'water'){

        p2.style.backgroundColor = 'var(--type-3)'
    }else if (pokemon.types[0].type.name == 'fire'){

        p2.style.backgroundColor = 'var(--type-4)'
    }else if (pokemon.types[0].type.name == 'normal'){

        p2.style.backgroundColor = 'var(--type-5)'
    }else if (pokemon.types[0].type.name == 'poison'|| pokemon.types[0].type.name == 'ghost' ){

        p2.style.backgroundColor = 'var(--type-6)'
    }
    
    li.append(img, p, p2)

    return li
}

function eventHandler(){
    let button = document.querySelector('.btn-search')
    let input = document.querySelector('.search')

    button.addEventListener('click', async ()=>{
        let ul = document.querySelector('.ul-main')
        ul.innerHTML = ''
        let h2 = document.createElement('h2')
        h2.innerText = 'Carregando...'
        h2.classList = 'notFound'

        ul.appendChild(h2)
        
        try{
            const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`)
            
            if(request.ok){
                const response = await request.json()
                function render1Pkm(){
    
                    ul.innerHTML = ''
                    
                    
                    let template = create1Pkm(response)
                    ul.appendChild(template)
    
                }
                render1Pkm()
            }else {
                ul.innerHTML = ''
                let div = document.createElement('div')
                div.classList = 'notFound'
                let h3 = document.createElement('h3')
                h3.innerText = 'POKÉMON NÃO ENCONTRADO'
                let p = document.createElement('p')
                p.innerText = 'Verifique se digitou o nome corretamente e tente novamente!'

                div.append(h3, p)

                ul.appendChild(div)
            }
        }catch(err){
            console.log(err)
        }
    })
}
eventHandler()

