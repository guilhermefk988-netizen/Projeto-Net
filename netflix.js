const section1 = document.querySelector(".section1")
const Filme = document.querySelector(".Mostra__Filme")
const main = document.querySelector(".main")
const Filtro = document.querySelector(".Filtro")
const FilmesFiltro = document.querySelector(".Filmes__do__filtro")
const ButonFiltro = document.querySelector("#button__Filtro")
const Hero = document.querySelector("#hero")

let dadoGlobal = []

function imagemDe(item) {
    return item.image?.original || item.image?.medium || "placeholder.jpg"
}

function criarCards(lista) {
    return lista.map(item => `
        <div class="card" data-id="${item.id}">
            <a href="#">
                <img class="img" src="${imagemDe(item)}" alt="${item.name}">
            </a>
        </div>`).join("")
}

function renderizarFiltro(lista) {
    FilmesFiltro.innerHTML = criarCards(lista)
}

async function carregarFilmes() {
    const resposta = await fetch("https://api.tvmaze.com/shows?page=0")
    dadoGlobal = await resposta.json()

    section1.innerHTML = criarCards(dadoGlobal)
    renderizarFiltro(dadoGlobal)
}

async function abrirFilme(id) {
    const resposta = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const cardi = await resposta.json()

    Filme.style.display = "flex"
    document.body.style.overflow = "hidden"

    Filme.innerHTML = `
        <div class="Filme__escolhido">
            <div class="fundo__gradiente"></div>

            <div class="imagem">
                <img src="${imagemDe(cardi)}" alt="${cardi.name}">
            </div>

            <div class="textos">
                <h2>${cardi.name}</h2>

                <div class="texto__extra">
                    <p>${cardi.ended ?? "Em exibição"}</p>
                    <p>${cardi.runtime ?? "-"}min</p>
                    <p>${cardi.genres.join(", ")}</p>
                </div>

                <p>${cardi.summary}</p>

                <div class="butao__do__Filme">
                    <button><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ffffff/play--v1.png" alt="play"/>Assistir Agora</button>
                    <button>+ Minha Lista</button>
                </div>

                <div class="texto__inferior">
                    <div style="display: flex; gap: 0.5rem">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/ffffff/star--v1.png" alt="estrela"/>
                        <div>
                            <h3>${cardi.rating.average ?? "-"}</h3>
                            <p>IMDb</p>
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.5rem">
                        <img width="30" height="30" src="https://img.icons8.com/pastel-glyph/128/ffffff/clock--v1.png" alt="relógio"/>
                        <div>
                            <h3>${cardi.runtime ?? "-"}min</h3>
                            <p>Duração</p>
                        </div>
                    </div>

                    <div>
                        <h3>HD</h3>
                        <p>Qualidade</p>
                    </div>
                </div>
            </div>

            <div class="sair__da__informação">
                <button class="sair__filme">
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/circled-left-2.png" alt="voltar"/>
                </button>
            </div>
        </div>`

    document.querySelector(".sair__filme").addEventListener("click", function () {
        Filme.style.display = "none"
        document.body.style.overflow = ""
    })
}

// abre o modal em qualquer card (home ou filtro)
document.addEventListener("click", function (e) {
    const card = e.target.closest(".card")
    if (!card) return
    abrirFilme(card.dataset.id)
})

// filtro por gênero
const botoesFiltro = document.querySelectorAll(".filtro__menu button")

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function () {
        botoesFiltro.forEach(btn => btn.classList.remove("ativo"))
        this.classList.add("ativo")

        const genero = this.dataset.genero

        if (genero === "todos") {
            renderizarFiltro(dadoGlobal)
        } else {
            renderizarFiltro(dadoGlobal.filter(item => item.genres.includes(genero)))
        }
    })
})

// navegação entre home e filtro
ButonFiltro.addEventListener("click", function () {
    main.style.display = "none"
    Filme.style.display = "none"
    section1.style.display = "none"
    Filtro.style.display = "flex"
})

Hero.addEventListener("click", function () {
    main.style.display = "flex"
    Filme.style.display = "none"
    section1.style.display = "grid"
    Filtro.style.display = "none"
})

carregarFilmes()