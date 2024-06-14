/*********************************************************************************
 * 
 * Point d'entrée, c'est lui qui intialise le jeu et lance la boucle de jeu. 
 * 
 *********************************************************************************/


/**
 * initialisation de la page et des variables nécessaires à son fonctionnement.
 */

// 

const entryField = document.getElementById("inputEcriture")
const userValidate = document.getElementById("btnValiderMot")
const proposedWord = document.querySelector(".zoneProposition")
const userScore = document.querySelector(".zoneScore span")
const userGameMode = document.querySelectorAll('input[name="optionSource"]')
const userGameRound = document.querySelectorAll(".optionNumber input")

let modeSelected = listeMots



/**
 * et c'est parti !!!
 */


launchGame()
