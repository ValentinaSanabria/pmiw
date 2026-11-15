
// TP Final - Parte 1: Aventura Interactiva Web
// Alumna: Valentina Denise Fernandez Sanabria
//link video https://www.youtube.com/watch?v=vC3fdNQA0FM


let pantallaActual = 0;
let misImagenes = [];

//arreglos para el fondo de estrellas animadas
let xEstrellas = [];
let yEstrellas = [];
let posYCreditos = 450;

//variable para el sonido del clic
let sonidoClick;

let nombreAlumna = "Valentina Denise Fernandez Sanabria";

//textos principales de cada pantalla
let misTextos = [
  "Es 1985. Entrás a un arcade y una máquina de Space Invaders brilla en el centro.",
  "Ponés la ficha y la pantalla te absorbe. Ahora estás dentro del juego, al mando de una nave.",
  "Detrás de la máquina hay una puerta secreta entreabierta, con una luz violeta.",
  "Disparás y destruís una fila de invasores. De golpe aparece la nave nodriza.",
  "Te escondés detrás de un escudo. Una criatura gigante te acecha desde arriba.",
  "Cruzás un pasillo de cables que zumban. Al fondo hay una luz brillante.",
  "Estás frente a la nave nodriza. Tenés un solo disparo y no podés fallar.",
  "Huís entre los disparos mientras los invasores te persiguen. En la pared se abre un pasillo de cables.",
  "Un alien aparece con una bandera blanca y te propone una tregua. ¿Confiás en él?",
  "FINAL 1: Disparás al núcleo de la nave nodriza y salvás el arcade.",
  "FINAL 2: Confiás en los aliens, hacen las paces y todos vuelven a casa.",
  "FINAL 3: No encontrás la salida y quedás atrapada en el juego para siempre."
];

//textos de los botones de opción A y B
let textoOpcionA = [
  "Poner una ficha", "Disparar a los invasores", "Entrar por la puerta", "Atacar a la nodriza",
  "Salir a disparar", "Seguir hacia la luz", "Disparar al núcleo", "Seguir huyendo",
  "Confiar en el alien", "Volver a empezar", "Volver a empezar", "Volver a empezar"
];

let textoOpcionB = [
  "Mirar detrás de la máquina", "Esconderme detrás de un escudo", "Volver y poner una ficha", "Huir",
  "Salir corriendo", "Volver a la puerta", "Esquivar y huir", "Meterme por el pasillo de cables",
  "Desconfiar y huir", "Ver créditos", "Ver créditos", "Ver créditos"
];

//destinos a los que te lleva cada boton
let destinoA = [1, 3, 5, 6, 3, 8, 9, 11, 10, 12, 12, 12];
let destinoB = [2, 4, 1, 7, 7, 2, 7, 5, 11, 12, 12, 12];



//CONFIGURACION Y CICLO PRINCIPALp5.js


function preload() {
  //cargo todas las imagenes de la historiaa
  for (let i = 0; i < 12; i++) {
    misImagenes[i] = loadImage("data/pantalla" + i + ".jpg");
  }
}

function setup() {
  createCanvas(800, 450); 
  textFont("Courier New");

  //posiciones aleatorias para las estrellas del fondo creditos
  for (let i = 0; i < 50; i++) {
    xEstrellas[i] = random(800);
    yEstrellas[i] = random(450);
  }

  sonidoClick = new Audio("data/click.mp3");
}

function draw() {
  if (pantallaActual == 12) {
    mostrarCreditos();
  } else {
    mostrarPantallaHistoria(pantallaActual);
  }
}



//FUNCIONES DE DIBUJO Y LOGICA


//funcion con parametros para dibujar antalla de narrativa
function mostrarPantallaHistoria(n) {
  image(misImagenes[n], 0, 0, 800, 450);
  
  //caja inferior oscura para que se lea bien el texto
  fill(0, 180);
  rect(0, 300, 800, 150);
  
  fill(255, 182, 213);
  textSize(16);
  textAlign(LEFT, TOP);
  text(misTextos[n], 20, 310, 760, 80);

  //botones de opciones (A yB)
  dibujarBotonPersonalizado(20, 400, 370, 40, textoOpcionA[n]);
  dibujarBotonPersonalizado(410, 400, 370, 40, textoOpcionB[n]);
}

//funcion con parametros 
function dibujarBotonPersonalizado(x, y, ancho, alto, etiqueta) {
  if (chequearMouseEnBoton(x, y, ancho, alto)) {
    fill(255, 200, 225); //color cuando pasas el mouse por encimma
  } else {
    fill(255, 105, 180); //colorrosa
  }
  rect(x, y, ancho, alto, 8);
  
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + ancho / 2, y + alto / 2);
}

function chequearMouseEnBoton(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
}

function cambiarDePantalla(destino) {
  pantallaActual = destino;
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

//pantalla de creditos 
function mostrarCreditos() {
  background(0);
  fill(255, 182, 213);
  
  //animacion de las estrellas bajando/subiendo
  for (let i = 0; i < 50; i++) {
    ellipse(xEstrellas[i], yEstrellas[i], 3, 3);
    yEstrellas[i] = yEstrellas[i] + 1;
    if (yEstrellas[i] > 450) {
      yEstrellas[i] = 0;
    }
  }
  
  textAlign(CENTER, CENTER);
  
  textSize(20);
  text("CRÉDITOS", 400, posYCreditos - 20);
  
  textSize(13);
  text("Alumna: " + nombreAlumna, 400, posYCreditos + 10);
  text("Obra original: Space Invaders (Tomohiro Nishikado, 1978)", 400, posYCreditos + 35);
  text("Imágenes generadas con IA", 400, posYCreditos + 60);
  text("Licenciatura en Diseño Multimedial - FDA - UNLP", 400, posYCreditos + 85);
  text("Profesor: Leonardo Garay", 400, posYCreditos + 110);
  text("Materia: Programación para medios interactivos orientada a las tecnologías web", 400, posYCreditos + 135);
  text("Comisión 4 - Año 2026", 400, posYCreditos + 160);
  
  //movimientodel texto de creditos
  posYCreditos = posYCreditos - 1;
  if (posYCreditos < -200) {
    posYCreditos = 450;
  }
  
  dibujarBotonPersonalizado(300, 400, 200, 40, "Volver al inicio");
}



//INTERACCIÓN DEL MOUSE

function mousePressed() {
  if (pantallaActual == 12) {
    if (chequearMouseEnBoton(300, 400, 200, 40)) {
      cambiarDePantalla(0);
    }
  } else {
    // detecta los cclics en los botones de opcion
    if (chequearMouseEnBoton(20, 400, 370, 40)) {
      cambiarDePantalla(destinoA[pantallaActual]);
    } else if (chequearMouseEnBoton(410, 400, 370, 40)) {
      cambiarDePantalla(destinoB[pantallaActual]);
    }
  }
}
