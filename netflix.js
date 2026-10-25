
const imagem = document.querySelector(".imagem__grande")
const section1 = document.querySelector(".section1")
const Filme = document.querySelector(".Mostra__Filme")
const main = document.querySelector(".main")
const Filtro = document.querySelector(".Filtro")

fetch("https://api.tvmaze.com/shows?page=0")
    .then(resposta => resposta.json())
    .then(dado => {
        console.log(dado),

            section1.innerHTML = dado.map(item => `
            <div class="card" data-id="${item.id}">
            <a href="#">
                <img class="img" src="${item.image?.original || item.image?.medium}" alt="${item.name}">
            </a>
                </div>`).join("");

        const card = document.querySelectorAll(".card")

        card.forEach(card => {
            card.addEventListener('click', function () {
                const id = this.dataset.id

                fetch(`https://api.tvmaze.com/shows/${id}`)
                    .then(aResposta => aResposta.json())
                    .then(cardi => {


                        Filme.style.display = "flex"
                        document.body.style.overflow = "hidden"

                        Filme.innerHTML = `
            <div class="Filme__escolhido">
                    <div class="fundo__gradiente"></div>

            <div class="imagem">
                <img src="${cardi.image?.original || cardi.image?.medium}" alt="">
            </div>
            <div class="textos">

                <h2>${cardi.name}</h2>

                <div class="texto__extra">
                    <p>${cardi.ended}</p>
                    <p>${cardi.runtime}mim</p>
                    <p>${cardi.genres}</p>
                </div>

                <p>${cardi.summary}</p>

                <div class="butao__do__Filme">
                 <button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png" alt="play--v1"/>Assistir Agora</button>
                 <button>+ Minha Lista</button>
                </div>

                <div class="texto__inferior">
                    <div style="display: flex; gap: 0.5rem">
                    
                    <img width="30" height="30" src="https://img.icons8.com/ios/50/ffffff/star--v1.png" alt="star--v1"/>
                    <div>
                     <h3>${cardi.rating.average}</h3>
                     <p>IMDb</p>
                    </div>
                    <div> 

                    <div style="display: flex;gap: 0.5rem">
                    <img width="30" height="30" src="https://img.icons8.com/pastel-glyph/128/ffffff/clock--v1.png" alt="clock--v1"/>

                    <div>
                     <h3>${cardi.runtime}mim</h3>
                     <p>Duração</p>
                    </div>
                    <div>                    
                    <div>
                     <h3>HD</h3>
                     <p>Qualidade</p>
                    </div>
                </div>


            </div>
            <div class="sair__da__informação">
               <button class="sair__filme"> <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/circled-left-2.png" alt="circled-left-2"/></button>
            </div>
        </div>
                        `
                        const sair = document.querySelector(".sair__filme")

                        sair.addEventListener("click", function () {
                            Filme.style.display = "none"
                            document.body.style.overflow = ""
                        })

                    })
                    
            })
            const FilmesFiltro = document.querySelector(".Filmes__do__filtro")

                        FilmesFiltro.innerHTML = dado.map(dados=>
                            `<div class="card" data-id="${dados.id}">
            <a href="#">
                <img class="img" src="${dados.image?.original || dados.image?.medium}" alt="${dados.name}">
            </a>
                </div>`,
                console.log(FilmesFiltro)
                        ).join("");
        });
    })
const ButonFiltro = document.querySelector("#button__Filtro")
const Hero = document.querySelector("#hero")


ButonFiltro.addEventListener('click', function () {
    main.style.display = "none"
    Filme.style.display = "none"
    section1.style.display = "none"
    Filtro.style.display = "flex"

})
Hero.addEventListener('click', function () {
    main.style.display = "flex"
    Filme.style.display = "flex"
    section1.style.display = "grid"
    Filtro.style.display = "none"

})