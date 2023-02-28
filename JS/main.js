//Inicizliação de variaveis
let tarjetasDestapadas = 0;
let temporizdor = false;

let timer = 60;
let timerInicial = timer;
let acertos = 0;
let acoes = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primeiroResultado = null;
let segundoResultado = null;
let timerReg = null;

let acertoAudio = new Audio('./SOUNDS/Acerto.wav');
let erroAudio = new Audio('./SOUNDS/Erro.wav');
let clickAudio = new Audio('./SOUNDS/Click.wav');
let loserAudio = new Audio('./SOUNDS/Loser.wav');
let winAudio = new Audio('./SOUNDS/Victory.wav');

// Apontando Documento HTML 
let mostrarAcoes = document.getElementById('acoes')
let mostrarAcertos = document.getElementById('acertos')
let mostrarTempo = document.getElementById('t-restante')
//Gerenciado de números aleatórios 
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random() -0.5});
console.log(numeros)
//funções 
function contarTempo(){
    timerReg = setInterval(() =>{
        timer --;
        mostrarTempo.innerHTML = `Tempo: ${timer} seg`
        if(timer ==0){
            clearInterval(timerReg);
            bloquearTarjetas();
            loserAudio.play();
        }

     },800)
}

function bloquearTarjetas(){
    for(let i = 0; i <=15; i++){
        let tarjetaBoqueada = document.getElementById(i);
        tarjetaBoqueada.innerHTML = `<img src="./IMG/${numeros[i]}.png" alt="">`
    
        tarjetaBoqueada.disabled = true;
    }
}

//Função principal 
function girar(id){
    if(temporizdor == false){
        contarTempo();
        temporizdor = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        // Mostrar Primeiro Número
         tarjeta1 = document.getElementById(id);
        primeiroResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./IMG/${primeiroResultado}.png" alt="">`
        clickAudio.play();

        //Desabilitar o primeiro botão
        tarjeta1.disabled= true;
    }else if(tarjetasDestapadas ==2){
        //Mostrar Segundo Número 
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./IMG/${segundoResultado}.png" alt="">`

        //Desabilitar Segundo Botão 
        tarjeta2.disabled= true;

        //Incremetar Ações
        acoes++;
        mostrarAcoes.innerHTML = `Movimentos: ${acoes}`

      

        if(primeiroResultado == segundoResultado){
            //Zerar Contador
            tarjetasDestapadas = 0;

            //Acertos 
            acertos++;
            mostrarAcertos.innerHTML =`Acertos: ${acertos}`;
            acertoAudio.play();
          

    
        }else{
            erroAudio.play();
           
            // Mostrar momentaneamente valores y e voltar a tapar
            setTimeout(() =>{
                tarjeta1.innerHTML = ''; 
                tarjeta2.innerHTML = ''; 
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        
        }
    }
    if(acertos == 8){
        winAudio.play();
        clearInterval(timerReg);
        mostrarAcertos.innerHTML =`Acertos: ${acertos}😱  `
        mostrarAcoes.innerHTML = `Movimentos: ${acoes}🤟 😎🤟  `
        mostrarTempo.innerHTML = `Seu tempo foi: ${timerInicial - timer} seg`
    }
}