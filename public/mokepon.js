const botonMascotaJ = document.getElementById('boton-mascota');
const botonReinicio=document.getElementById('boton-reinicio')

const ContendorTarjetas= document.getElementById("contenedor-tarjetas")

const mascotaJugador = document.getElementById("mascotaJugador");
const mascotaEnemigo = document.getElementById("mascotaEnemigo");
const sectionMensajes=document.getElementById('resultado')
const ataquesDelJugador=document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo=document.getElementById('ataques-del-enemigo')
const vidasJugador=document.getElementById("vidas-jugador");
const vidasEnemigas=document.getElementById("vidas-enemigas")
const seccionSeleccionarAtaque=document.getElementById('seleccion-ataque')
/* let ataqueEnemigo = document.getElementById("") */

const contenedorAtaques=document.getElementById("contenedorAtaques")
const sectionVerMapa=document.getElementById("ver-mapa")
const mapa = document.getElementById('mapa')

let jugadorId=null
let enemigoId=null
let mokepones=[];
let mokeponesEnemigos=[]
let ataquesDeMokeponesEnemigo=[];
let ataqEnemigo=[];
let opcionesDeMokepones;
let Hipodoge;
let Capipepo;
let Ratigeya;
let mascotaPropia;
let mascotaJugadorObjeto;
let botonFuego;
let botonAgua;
let botonTierra;
let botones=[]
let ataqueJugador=[];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
/* let numAtaqueJugador=[] */
let ataquesDeMokepones;
let victoriasJugador=0;
let victoriasEnemigas=0;
let lienzo = mapa.getContext("2d")
let intervalo;
let mapaBackground = new Image()
mapaBackground.src='./assets/mokemap.png'
let alturaBuscamos;
let anchoDelMapa= window.innerWidth - 30;
const anchoMaximoMapa=550

if(anchoDelMapa>anchoMaximoMapa){
    anchoDelMapa=anchoMaximoMapa-20
}

alturaBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height=alturaBuscamos
/* let resultado="" */

class Mokepon {
    constructor(nombre,foto,vida,fotoMapa,id=null){
        this.id=id
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
        this.ancho=40
        this.alto=40
        this.x=aleatorio(0,mapa.width-this.ancho)
        this.y=aleatorio(0,mapa.height-this.alto)
        this.mapaFoto=new Image()
        this.mapaFoto.src=fotoMapa
        this.velocidadX=0
        this.velocidadY=0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
    
        )
    }
}


let hipodogen = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5,'./assets/hipodoge.png')

let capipepon = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')

let ratigeyan= new Mokepon('Ratigeya', './assets/mokepons_mokepon_ratigueya_attack.webp',5, './assets/ratigueya.png')




window.addEventListener('load', function(e){
    mokepones.forEach((mokepon)=>{
        opcionesDeMokepones = `
        <input type="radio" name="mascota" id= ${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}-imagen">
        </label>`
        ContendorTarjetas.innerHTML += opcionesDeMokepones
            Hipodoge = document.getElementById("Hipodoge");
            Capipepo = document.getElementById("Capipepo");
            Ratigeya = document.getElementById("Ratigeya");
    })
    unirseAlJuego()
})

function unirseAlJuego(){
    fetch("http://192.168.100.206:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        })
}

const HIPODOGE_ATAQUES=[
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🌱', id: 'boton-tierra'}

]

hipodogen.ataques.push(...HIPODOGE_ATAQUES)



const CAPIPEPO_ATAQUES=[
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'🌱', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
]

capipepon.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGEYA_ATAQUES = [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🌱', id: 'boton-tierra'},
]

ratigeyan.ataques.push(...RATIGEYA_ATAQUES)



mokepones.push(hipodogen,capipepon,ratigeyan)


function esconderSeccion(elemento,seccion){
    
    elemento.style.display=seccion
/*     sectionVerMapa.style.display=seccion */
}
esconderSeccion(seccionSeleccionarAtaque,'none')
esconderSeccion(sectionVerMapa,'none')





function seleccionMascota(){
    if(Hipodoge.checked){
        mascotaJugador.innerHTML=Hipodoge.id
        mascotaPropia=Hipodoge.id
    }else if(Capipepo.checked){
        mascotaJugador.innerHTML=Capipepo.id
        mascotaPropia=Capipepo.id
    }else if(Ratigeya.checked){
        mascotaJugador.innerHTML=Ratigeya.id
        mascotaPropia=Ratigeya.id
    }else{
        alert("selecciona alguna opcion")
    }
   
    comprobacionEsconderElementos()

/*     let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src=capipepon.foto
    //lienzo.fillRect(5,15,20,40)
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        100,
        100
    ) */
    
}

function seleccionarMokepon(mascotaPropia){
    fetch(`http://192.168.100.206:8080/mokepon/${jugadorId}`,{
        method:"post",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaPropia
        })

    })
}

function comprobacionEsconderElementos(){
    if(Hipodoge.checked || Capipepo.checked || Ratigeya.checked){
        seleccionarMokepon(mascotaPropia)
        extraerAtaques(mascotaPropia)
        secuenciaAtaque()
        //esconderSeccion(seccionSeleccionarAtaque,'flex')
        esconderSeccion(sectionVerMapa,'flex')
        let seccionMascota=document.getElementById('seleccion-mascota')
        seccionMascota.style.display='none'
        iniciarMapa()

    }

}

function extraerAtaques(mascotaPropia){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaPropia == mokepones[i].nombre){
            ataques=mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)

}

function mostrarAtaques(arrays){
    arrays.forEach((ataque)=>{
        ataquesDeMokepones = `
        <button id= ${ataque.id} class="boton-de-ataque" >${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesDeMokepones

    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones=document.querySelectorAll('.boton-de-ataque')



}


function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if(e.target.textContent == "🔥"){
                ataqueJugador.push("fuego")
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled=true;

            }else if(e.target.textContent == "💧"){
                ataqueJugador.push("agua")
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled=true;

            }else if(e.target.textContent == "🌱"){
                ataqueJugador.push("tierra")
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled=true;

            }
            if(ataqueJugador.length===5){
                console.log("holaaaaaaaaaaaaaa")
                enviarAtaques()
    
            }
            
        })


 

    })


    

}


function enviarAtaques(){
    fetch(`http://192.168.100.206:8080/mokepon/${jugadorId}/ataques`,{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques:ataqueJugador
        })
    })

    intervalo=setInterval(obtenerAtaques, 50)
    
/*     juegoLucha() */
}

function obtenerAtaques(){
    fetch(`http://192.168.100.206:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length==5){
                            ataqEnemigo=ataques
                            juegoLucha()
                            console.log("estos son los ataques" + ataqEnemigo)

                        }
                    })
            }
        })
}



function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador =  ataqueJugador[jugador]
    indexAtaqueEnemigo =  ataqEnemigo[enemigo]
}



function juegoLucha(){
    clearInterval(intervalo)
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i]==ataqEnemigo[i]){
            indexAmbosOponentes(i,i)
            crearMensaje("empataste")
            
        }else if(ataqueJugador[i]=='agua' && ataqEnemigo[i]=='fuego'){
            indexAmbosOponentes(i,i)
            crearMensaje("ganaste")
            victoriasJugador++
            vidasJugador.innerHTML=victoriasJugador;
        }else if(ataqueJugador[i]=='fuego' && ataqEnemigo[i]=='tierra'){
            indexAmbosOponentes(i,i)
            crearMensaje("ganaste")
            victoriasJugador++
            vidasJugador.innerHTML=victoriasJugador;
        }else if(ataqueJugador[i]=='tierra' && ataqEnemigo[i]=='agua'){
            indexAmbosOponentes(i,i)
            crearMensaje("ganaste")
            victoriasJugador++
            vidasJugador.innerHTML=victoriasJugador;
            /* vidasEnemigas.innerHTML=conteoVidasEnemigas */
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("perdiste")
            victoriasEnemigas++
            vidasEnemigas.innerHTML=victoriasEnemigas
        }
        
    }

/*     if(ataqueJugador=="agua" && ataqEnemigo=='fuego'){
        crearMensaje("ganaste")
        conteoVidasEnemigas--
        vidasEnemigas.innerHTML=conteoVidasEnemigas
    }else if(ataqueJugador=="fuego" && ataqEnemigo=='tierra'){
        crearMensaje("ganaste")
        conteoVidasEnemigas--
        vidasEnemigas.innerHTML=conteoVidasEnemigas
    }else if(ataqueJugador=="tierra" && ataqEnemigo=='agua'){
        crearMensaje("ganaste")
        conteoVidasEnemigas--
        vidasEnemigas.innerHTML=conteoVidasEnemigas
    }else if(ataqueJugador==ataqEnemigo){
        crearMensaje("empataste")
    }else{
        crearMensaje("perdiste")
        conteoVidasJugador--
        vidasJugador.innerHTML=conteoVidasJugador
    } */
    
    revisarVidas()
}

function revisarVidas(){
    if(victoriasJugador>victoriasEnemigas){
        //ganamos
        sectionMensajes.innerHTML="victoria has ganado";


    }else if(victoriasEnemigas>victoriasJugador){
        sectionMensajes.innerHTML="perdiste,vuelve a intentarlo";


    }else{
        sectionMensajes.innerHTML="empataste";

    }
}

/* function desactivarBotones(cambio){
    botonAgua.disabled=true;
    botonFuego.disabled=cambio;
    botonTierra.disabled=cambio;

} */

function crearMensaje(resultado){



    let nuevoAtaqueJugador=document.createElement('p')
    let nuevoAtaqueEnemigo=document.createElement('p')

    sectionMensajes.innerHTML=resultado;
    nuevoAtaqueJugador.innerHTML=indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML=indexAtaqueEnemigo;


 
    ataquesDelJugador.appendChild(nuevoAtaqueJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

botonMascotaJ.addEventListener('click', seleccionMascota)
botonReinicio.addEventListener('click',()=>location.reload())

function seleccionMascotaEnemigo1(enemigo){
    let eleccion = aleatorio(0,mokepones.length-1)

    mascotaEnemigo.innerHTML = enemigo.nombre
    ataquesDeMokeponesEnemigo = enemigo.ataques
}


function seleccionMascotaEnemigo(){
    let eleccion = aleatorio(0,mokepones.length-1)

    mascotaEnemigo.innerHTML = mokepones[eleccion].nombre
    ataquesDeMokeponesEnemigo = mokepones[eleccion].ataques
}

function pintarCanvas(){
    

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)


    mokeponesEnemigos.forEach((mokepon)=>{
        mokepon.pintarMokepon()
        revisarColicion(mokepon)
    })


}

function enviarPosicion(x,y){
    fetch(`http://192.168.100.206:8080/mokepon/${jugadorId}/posicion`,{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y 
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)

                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo=null
                        const mokeponNombre=enemigo.mokepon.nombre || ""
                        if(mokeponNombre==="Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.webp',5,'./assets/hipodoge.png',enemigo.id)

                        }else if(mokeponNombre==="Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png',enemigo.id)

                        }else if(mokeponNombre==="Ratigeya"){
                            mokeponEnemigo  = new Mokepon('Ratigeya', './assets/mokepons_mokepon_ratigueya_attack.webp',5, './assets/ratigueya.png',enemigo.id)

                        }
                       

                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0
                        
                        return mokeponEnemigo
                        
                    })
                })


        }
    })
}

function moverDerecha(){

    mascotaJugadorObjeto.velocidadX=5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX=-5
}

function moverabajo(){

    mascotaJugadorObjeto.velocidadY=5
}

function moverarriba(){
    mascotaJugadorObjeto.velocidadY=-5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
}

function sePresionaUnaTecla(e){

    switch (e.key) {
        case 'ArrowUp':
            moverarriba()
            break;
        case 'ArrowDown':
            moverabajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
    
        default:
            break;
    }


/*     if(e.key=='ArrowUp'){
        moverarriba()
        console.log("prueba")
    } else if(e.key=='ArrowDown'){
        moverabajo()
    }else if(e.key=='ArrowRight'){
        moverDerecha()
    }else if(e.key=='ArrowLeft'){
        moverIzquierda()
    } */
}

function iniciarMapa(){


    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaPropia)
    intervalo=setInterval(pintarCanvas,50)

    window.addEventListener('keydown', sePresionaUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaPropia == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColicion(enemigo){
    if(enemigo.x==undefined || enemigo.y==undefined){
        return
    }
    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y + enemigo.alto
    const derechaEnemigo= enemigo.x + enemigo.ancho
    const izquierdaEnemigo= enemigo.x

    const arribaMascota=mascotaJugadorObjeto.y
    const abajoMascota=mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota= mascotaJugadorObjeto.x+ mascotaJugadorObjeto.ancho
    const izquierdaMascota= mascotaJugadorObjeto.x

    if(abajoMascota<arribaEnemigo || arribaMascota>abajoEnemigo|| derechaMascota<izquierdaEnemigo|| izquierdaMascota>derechaEnemigo){
        return;
    }else{
        detenerMovimiento()
        clearInterval(intervalo)
        enemigoId=enemigo.id
        esconderSeccion(sectionVerMapa,'none')
        esconderSeccion(seccionSeleccionarAtaque,'flex')
        seleccionMascotaEnemigo1(enemigo)

        
    }

}




function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}