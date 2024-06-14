/*********************************************************************************
 * 
 * Ce fichier contient les scripts nécessaires au fonctionnement du jeu
 * Il est légérement modifié par rapport à celui du tuto de OpenClassrooms.
 * 
 *********************************************************************************/


/** 
 * Cette fonction lancer le jeu lors du chargement de la page
 * et regroupe toutes les autres fonctions.
 * 
 */ 

function launchGame() {

    let i = -1
    let score = 0
    let timer = 0

    selectionAleatoire(i, modeSelected)
    userScore.innerText = score + " / " + timer
    choisirPhrasesOuMots(i, userGameMode)
    initAddEventListenerPopup()

        userValidate.addEventListener("click", ()  => {
            if (proposedWord.innerText === entryField.value)    {   score++}
            timer++  
            selectionAleatoire(i, modeSelected)
            entryField.value = ''   
            userScore.innerText = score + " / " + timer
        });


        document.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                if (proposedWord.innerText === entryField.value)    {   score++}
                timer++  
                selectionAleatoire(i, modeSelected)
                entryField.value = ''   
                userScore.innerText = score + " / " + timer
            }
        })

        
    let fsubmit = document.querySelector("form")

        fsubmit.addEventListener("submit", (event) => {
            event.preventDefault()
            let scoreEmail = `${score} / ${timer}`
            gererFormulaire(scoreEmail) 
        });

}

/**
 * Cette fonction sélectionne un nouveau mot aléatoire et l'affiche
 * 
 * @param {number} ii : le choix précédent que l'on veut exclure du nouveau tirage
 * @param {string} gameMode : spécifie si le joueur est en mode "ListePhrases" ou "ListeMots"
 *
 */

    function selectionAleatoire(i, gameMode) {
        
        let ii = i

            while (i === ii) {
            ii = Math.floor(Math.random() * gameMode.length)
            }

        proposedWord.innerText = gameMode[ii]
        
    }


/** 
 *  Cette FONCTION écoute l'événement des boutons radios du mode de jeu
 * 
 * @param {string} userGameMode : le mode jeu actuel : "phrases" ou "mots"
 * @param {number} i : dernier mot à avoir été proposé utile pour la génération d'un nouveau
 */

    function choisirPhrasesOuMots(i, userGameMode) {

        for (let x = 0 ; x < userGameMode.length ; x++) {
            
            userGameMode[x].addEventListener("change", () => {
                if (userGameMode[x].checked) {

                        if (userGameMode[x].value === "1") {
                            modeSelected = listeMots
                        }
                        else {
                            modeSelected = listePhrases
                        }
                        selectionAleatoire (i, modeSelected)

                }
            });
        }

    }



/** 
 *  Cette FONCTION écoute le champ nom et lance une vérification à l'input
 */ 
    
        function validerNom(balise) {
                if (balise.length < 3) {
                throw new Error(`Le nom ${balise} n'est pas valide`)
            }   
            }


/** 
 *  Cette FONCTION écoute le champ email et lance une vérification à l'input
 */ 

        function validerEmail(balise) {
            let myRegExpEmail = new RegExp("^[a-z0-9._-]+@+[a-z0-9._-]{2,}\\.[a-z]{2,4}$")
                if (!myRegExpEmail.test(balise)) {
                    throw new Error(`L'adresse ${balise} n'est pas valide`)
                }   
        }


/**
 * Cette fonction gère le formulaire lors du partage du score du joueur.
 * Elle regroupe les fonctions liées à cette première jusqu'à l'envoi
 * d'un mail avec les informations récoltées dans le formulaire
 */

    function gererFormulaire(scoreEmail) {

    try {

        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)

        afficherEmail(nom, email, scoreEmail)
        afficherMessageErreur('')
    
    } catch (erreur) {
        afficherMessageErreur(erreur.message)
    }            
        
    }


/**
 * Cette fonction affiche un message d'erreur dans le formulaire
 */

function afficherMessageErreur(message) {

    let spanError = document.getElementById("yyy")
    
    if (!spanError)
    {
        let divError = document.querySelector(".popup")
    spanError = document.createElement("span")
    spanError.id = "yyy"
    divError.append(spanError)
    
    }
    spanError.innerText = message
}



/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */

    function afficherEmail(nom, email, score) {
        let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
        location.href = mailto
    }