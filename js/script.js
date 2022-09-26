//---------------------------------Etablissement d'une horloge analogique--------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
// Etape 1 : Sélectionner les aiguilles de montre
const AIGUILLEHR =
  document.querySelector(
    "#hour"
  ); /* Allons chercher une id spécialisée pour les heures */
const AIGUILLEMIN =
  document.querySelector(
    "#minute"
  ); /* Allons chercher une id spécialisée pour les minutes */
const AIGUILLESEC =
  document.querySelector(
    "#second"
  ); /* Allons chercher une id spécialisée pour les secondes */
// ------------------------------------------------------------------------------------------------------------------------------
console.log(AIGUILLEHR); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
console.log(AIGUILLEMIN); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
console.log(AIGUILLESEC); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
//-------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------
//Etape 2 : Extraire l'heure actuelle à l'aide de l'objet Date()
//-------------------------------------------------------------------------------------------------------------------------------
let heureCourante = new Date();
//-------------------------------------------------------------------------------------------------------------------------------
console.log(heureCourante); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
//-------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------
//Etape 3 : Stocker l'heure , minute , seconde  dans des varariables
//-------------------------------------------------------------------------------------------------------------------------------
let hours = heureCourante.getHours();
let minutes = heureCourante.getMinutes();
let secondes = heureCourante.getSeconds();
//-------------------------------------------------------------------------------------------------------------------------------
console.log(hours); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
console.log(minutes); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
console.log(secondes); // Le console.log permet de visualiser ce qui ce passe sur l'inspecteur.
//-------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------
// Etape 4 : Calculer de degré de mouvement de l'aiguille heure, de l'aiguille minute, de l'aiguille seconde
// Hint : Tous les aiguilles doivent se déplacer à chaque seconde selon un degré bien déterminé ...
//-------------------------------------------------------------------------------------------------------------------------------

// A chaque heure, il y a 30° (360/12) mouvementés. ATTENTION !!!
// A chaque minute, il y a 6° (360/60) mouvementés. ATTENTION !!!
// A chaque seconde, il y a 6° (360/60) mouvementés. ATTENTION !!!
// Il fallait raisonner en terme de degrés d'angle par rapport à des secondes !!!

// degreMouvementH = recuperationHeures * (360 / 12); // 30° pour 1 heure.
// degreMouvementMin = recuperationMinutes * (360 / 60); // 6° pour 1 minute.
// degreMouvementSec = recuperationSecondes * (360 / 60); // 6° pour 1 seconde.
// Il nous faut donc convertir le tout en une unité de temps unique, à savoir les secondes.

let degreHours = (hours * 60 * 60 + minutes * 60 + secondes) * (360 / 43200); // il y a 43200 secondes dans 12 heures. Il nous faut découper les 360° que constitue le cercle en 43200 parts égales de façon à situer l'aiguille des heures.
let degreMin = (minutes * 60 + secondes) * (360 / 3600); // 360 degrès / (60 minutes * 60 secondes).  Il nous faut découper les 360° que constitue le cercle en 3600 parts égales de façon à situer l'aiguille des minutes.
let degreSeconde = secondes * 6; // 6 équivaut au pas de 6° car il nous faut découper les 360° que constitue le cercle en 60 parts égales de façon à situer l'aiguille des secondes.

AIGUILLESEC.style.transform = "rotate(" + degreSeconde + "deg)";
AIGUILLEMIN.style.transform = "rotate(" + degreMin + "deg)";
AIGUILLEHR.style.transform = "rotate(" + degreHours + "deg)";

// console.log(degreMouvementH);
// console.log(degreMouvementMin);
// console.log(degreMouvementSec);

// Déplacer les aiguilles : idée de boucle car il faut relancer à chaque fois --> A chaque mouvement, toutes les aiguilles sont en mouvement.
function demarrerLaMontre() {
  degreSeconde += 6; /*Ajout de 6 secondes à chaque seconde. INCREMENTATION de 6° à chaque fois ...*/
  degreMin += 0.1; // 360 degrès / (60 minutes * 60 secondes). INCREMENTATION de 0.1° à chaque fois ...*/
  degreHours += 360 / 43200; // 360 degres / (12 heures * 60 minutes * 60 secondes).  INCREMENTATION de 0.00833° à chaque fois ...*/

  AIGUILLEHR.style.transform = `rotate(${degreHours}deg)`;
  /* Déplacement actionner sous l'effet de style.transform= rotate()*/
  AIGUILLEMIN.style.transform = `rotate(${degreMin}deg)`;
  AIGUILLESEC.style.transform = `rotate(${degreSeconde}deg)`;
}

// Exercuter la fonction à chaque nombre de fois : utilisation de setInterval().
var interval = setInterval(
  demarrerLaMontre,
  1000
); /* Le nombre de fois est fixé à 1000ms, soit 1 seconde. */

// Changement du background en cliquant.
var btn = document.querySelector("button");

function random(number) {
  return Math.floor(
    Math.random() * (number + 1)
  ); /* Méthode de prise d'une valeur aléatoire */
}

btn.onclick = function () {
  // Fonction pour changer la couleur du fond sur l'ensemble de la page (body) en fonction du clic de souris
  var changeCouleur =
    "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")"; // A chaque couleur de base, nous demandons une valeur aléatoire au RGB (Red - Green - Blue)
  document.body.style.backgroundColor = changeCouleur; // On applique, pour cet exemple, au clic du bouton, un style au niveau de la couleur.
};