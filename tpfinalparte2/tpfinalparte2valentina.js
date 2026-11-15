
//TP Final - Parte 2: Aventura Interactiva y Minijuego
//Alumna: Valentina Denise Fernandez Sanabria
// link video https://www.youtube.com/watch?v=W4LxhIunUpk

let pantalla = 0;
let misImagenes = [];

//asrreglos para el fondo de estrellas
let xEstrellas = [];
let yEstrellas = [];
let posYCreditos = 400;

//variables de audio
let sonidoClick;
let sonidoDisparo;

//objetos del minijuego (POO)
let miNave;
let marcianos = [];
let balas = [];
let direccion = 1;

//botones de la aventura
let botonA;
let botonB;
let botonUnico;
let botonVolver;
let botonReiniciar;

let nombreAlumna = "Valentina Denise Fernandez Sanabria";

//textos de cada pantalla de la historia
let misTextos = [
  "Es 1985. Entrás a un arcade y una máquina de Space Invaders brilla en el centro.",
  "Ponés la ficha y la pantalla te absorbe. Ahora estás dentro del juego, al mando de una nave.",
  "Detrás de la máquina hay una puerta secreta entreabierta, con una luz violeta.",
  "Disparás y destruís una fila de invasores. De golpe aparece la nave nodriza.",
  "Te escondés detrás de un escudo. Una criatura gigante te acecha desde arriba.",
  "Cruzás un pasillo de cables que zumban. Al fondo hay una luz brillante.",
  "Estás frente a la nave nodriza y sus invasores bajan hacia vos. ¡Tenés que detenerlos!",
  "Huís entre los disparos mientras los invasores te persiguen. En la pared se abre un pasillo de cables.",
  "Un alien aparece con una bandera blanca y te propone una tregua. ¿Confiás en él?",
  "FINAL 1: Destruís a todos los invasores y salvás el arcade.",
  "FINAL 2: Confiás en los aliens, hacen las paces y todos vuelven a casa.",
  "FINAL 3: No lográs escapar y quedás atrapada en el juego para siempre.",
  "Tocás los cables y una descarga recorre tu cuerpo. Empezás a deshacerte en píxeles y la luz se apaga."
];

//Opciones de los botones para cada pantalla
let textoOpcionA = [
  "Poner una ficha", "Disparar a los invasores", "Entrar por la puerta", "Atacar a la nodriza",
  "Salir corriendo", "Seguir hacia la luz", "Pelear contra los invasores", "Esquivar y huir",
  "Confiar en el alien", "Volver a empezar", "Volver a empezar", "Volver a empezar", "Todo se apaga"
];

let textoOpcionB = [
  "Mirar detrás de la máquina", "Esconderme detrás de un escudo", "", "Huir",
  "", "Tocar los cables", "Esquivar y huir", "Meterme por el pasillo de cables",
  "Desconfiar y huir", "Ver créditos", "Ver créditos", "Ver créditos", ""
];

//destinos a dónde te llevan los botones
let destinoA = [1, 3, 5, 6, 7, 8, 14, 11, 10, 0, 0, 0, 11];
let destinoB = [2, 4, 0, 7, 0, 12, 7, 8, 11, 13, 13, 13, 0];



//CLASES objetros

class Boton {
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
  }

  mouseEncima() {
    return mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto;
  }

  dibujar() {
    if (this.mouseEncima()) {
      fill(255, 200, 225);
    } else {
      fill(255, 105, 180);
    }
    rect(this.x, this.y, this.ancho, this.alto, 8);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }
}

class NaveJugador {
  constructor() {
    this.x = 400;
    this.y = 360;
  }

  actualizar() {
    this.x = constrain(mouseX, 25, 775);
  }

  dibujar() {
    fill(0, 255, 120);
    rect(this.x - 25, this.y, 50, 14);
    rect(this.x - 6, this.y - 12, 12, 12);
  }
}

class Bala {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 8;
  }

  mover() {
    this.y = this.y - this.vel;
  }

  dibujar() {
    fill(255, 255, 0);
    rect(this.x - 2, this.y, 4, 12);
  }
}

class Marciano {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 34;
    this.alto = 24;
  }

  mover(vx, vy) {
    this.x = this.x + vx;
    this.y = this.y + vy;
  }

  dibujar() {
    fill(255, 105, 180);
    rect(this.x, this.y, this.ancho, this.alto, 4);
    fill(0);
    rect(this.x + 8, this.y + 8, 5, 5);
    rect(this.x + 21, this.y + 8, 5, 5);
  }

  fueTocado(b) {
    return b.x > this.x && b.x < this.x + this.ancho && b.y > this.y && b.y < this.y + this.alto;
  }
}



//CONFIGURACIION Y CICLO PRINCIPAL p5.js


function preload() {
  for (let i = 0; i < 13; i++) {
    misImagenes[i] = loadImage("data/pantalla" + i + ".jpg");
  }
}

function setup() {
  createCanvas(800, 400);
  textFont("Courier New");

  for (let i = 0; i < 50; i++) {
    xEstrellas[i] = random(800);
    yEstrellas[i] = random(400);
  }

  sonidoClick = new Audio("data/click.mp3");
  sonidoDisparo = new Audio("data/disparo.mp3");

  botonA = new Boton(20, 350, 370, 40, "");
  botonB = new Boton(410, 350, 370, 40, "");
  botonUnico = new Boton(200, 350, 400, 40, "");
  botonVolver = new Boton(300, 355, 200, 35, "Volver al inicio");
  botonReiniciar = new Boton(670, 10, 120, 30, "Reiniciar");
}

function draw() {
  if (pantalla == 13) {
    mostrarCreditos();
  } else if (pantalla == 14) {
    mostrarInstrucciones();
  } else if (pantalla == 15) {
    ejecutarJuego();
  } else {
    mostrarHistoria(pantalla);
  }
}



//FUNCIONES DE DIBUJO YLOGICA


function mostrarHistoria(n) {
  image(misImagenes[n], 0, 0, 800, 400);
  
  fill(0, 180);
  rect(0, 250, 800, 150);
  
  fill(255, 182, 213);
  textSize(16);
  textAlign(LEFT, TOP);
  text(misTextos[n], 20, 262, 760, 80);

  if (textoOpcionB[n] == "") {
    botonUnico.texto = textoOpcionA[n];
    botonUnico.dibujar();
  } else {
    botonA.texto = textoOpcionA[n];
    botonB.texto = textoOpcionB[n];
    botonA.dibujar();
    botonB.dibujar();
  }
}

function mostrarInstrucciones() {
  image(misImagenes[6], 0, 0, 800, 400);
  fill(0, 200);
  rect(0, 0, 800, 400);
  
  fill(255, 182, 213);
  textAlign(CENTER, TOP);
  textSize(24);
  text("INSTRUCCIONES", 400, 40);
  textSize(16);
  text("Mové el mouse para mover tu nave.", 400, 110);
  text("Hacé clic para disparar.", 400, 145);
  text("Destruí a todos los invasores antes de que lleguen abajo.", 400, 180);
  text("Si ganás, salvás el arcade. Si perdés, quedás atrapada.", 400, 215);
  
  botonUnico.texto = "¡A pelear!";
  botonUnico.dibujar();
}

function empezarJuego() {
  miNave = new NaveJugador();
  marcianos = [];
  balas = [];
  direccion = 1;
  
  for (let fila = 0; fila < 3; fila++) {
    for (let col = 0; col < 6; col++) {
      marcianos.push(new Marciano(100 + col * 60, 40 + fila * 40));
    }
  }
  pantalla = 15;
}

function ejecutarJuego() {
  image(misImagenes[6], 0, 0, 800, 400);
  fill(0, 150);
  rect(0, 0, 800, 400);

  miNave.actualizar();
  miNave.dibujar();

  let velX = direccion * 1.5;
  let velY = 0;
  let tocaronBorde = false;
  
  for (let i = 0; i < marcianos.length; i++) {
    if (marcianos[i].x + velX < 20 || marcianos[i].x + marcianos[i].ancho + velX > 780) {
      tocaronBorde = true;
    }
  }
  
  if (tocaronBorde) {
    direccion = -direccion;
    velX = 0;
    velY = 15;
  }
  
  for (let i = 0; i < marcianos.length; i++) {
    marcianos[i].mover(velX, velY);
    marcianos[i].dibujar();
  }

  for (let i = balas.length - 1; i >= 0; i--) {
    balas[i].mover();
    balas[i].dibujar();
    
    let impacto = false;
    for (let j = marcianos.length - 1; j >= 0; j--) {
      if (marcianos[j].fueTocado(balas[i])) {
        marcianos.splice(j, 1);
        impacto = true;
        break;
      }
    }
    
    if (impacto || balas[i].y < 0) {
      balas.splice(i, 1);
    }
  }

  fill(255, 182, 213);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Invasores: " + marcianos.length, 20, 15);
  botonReiniciar.dibujar();

  if (marcianos.length == 0) {
    cambiarDePantalla(9);
  } else {
    for (let i = 0; i < marcianos.length; i++) {
      if (marcianos[i].y + marcianos[i].alto > 340) {
        cambiarDePantalla(11);
        break;
      }
    }
  }
}

function dispararBala() {
  balas.push(new Bala(miNave.x, miNave.y - 12));
  sonidoDisparo.currentTime = 0;
  sonidoDisparo.play();
}

function reproducirClick() {
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

function cambiarDePantalla(destino) {
  pantalla = destino;
  if (destino == 13) {
    posYCreditos = 400; //reinicia la posicion de los creditos al entrar
  }
  reproducirClick();
}

function mostrarCreditos() {
  background(0);
  fill(255, 182, 213);
  
  //animacion de estrellas subiendo
  for (let i = 0; i < 50; i++) {
    ellipse(xEstrellas[i], yEstrellas[i], 3, 3);
    yEstrellas[i] = yEstrellas[i] + 1;
    if (yEstrellas[i] > 400) {
      yEstrellas[i] = 0;
    }
  }
  
  textAlign(CENTER, CENTER);
  
  //pantalla de creditosd
  textSize(20);
  text("CRÉDITOS", 400, posYCreditos - 10);
  
  textSize(13);
  text("Alumna: " + nombreAlumna, 400, posYCreditos + 25);
  text("Obra original: Space Invaders (Tomohiro Nishikado, 1978)", 400, posYCreditos + 50);
  text("Imágenes generadas con IA", 400, posYCreditos + 75);
  text("Licenciatura en Diseño Multimedial - FDA - UNLP", 400, posYCreditos + 100);
  text("Profesor: Leonardo Garay", 400, posYCreditos + 125);
  text("Materia: Programación para medios interactivos orientada a las tecnologías web", 400, posYCreditos + 150);
  text("Comisión 4 - Año 2026", 400, posYCreditos + 175);
  
  //el texto sube lentamente
  posYCreditos = posYCreditos - 1;
  if (posYCreditos < -220) {
    posYCreditos = 400; //bucle para que vuelva a empezar a subir
  }
  
  botonVolver.dibujar();
}



//INTERACCION CON EL MOUSE

function mousePressed() {
  if (pantalla == 13) {
    if (botonVolver.mouseEncima()) {
      cambiarDePantalla(0);
    }
  } else if (pantalla == 14) {
    if (botonUnico.mouseEncima()) {
      empezarJuego();
      reproducirClick();
    }
  } else if (pantalla == 15) {
    if (botonReiniciar.mouseEncima()) {
      empezarJuego();
    } else {
      dispararBala();
    }
  } else {
    if (textoOpcionB[pantalla] == "") {
      if (botonUnico.mouseEncima()) {
        cambiarDePantalla(destinoA[pantalla]);
      }
    } else {
      if (botonA.mouseEncima()) {
        cambiarDePantalla(destinoA[pantalla]);
      } else if (botonB.mouseEncima()) {
        cambiarDePantalla(destinoB[pantalla]);
      }
    }
  }
}
