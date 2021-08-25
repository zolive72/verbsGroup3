var userAnswers = [["dor"],["par"],["cour"],["ouvr"],["f"],["écri"],["pren"],["d"]];
const answers = [["dors", "dors", "dort", "dormons","dormez","dorment"],
                         ["pars", "pars", "part", "partons","partez","partent"],
                         ["cours","cours","court","courons","courez","courent"], 
                         ["ouvre","ouvres","ouvre","ouvrons","ouvrez","ouvrent"],
                         ["fais","fais","fait","faisons","faites","font"],
                         ["écris","écris","écrit","écrivons","écrivez","écrivent"],
                         ["prends","prends","prend","prenons","prenez","prennent"],
                         ["dois","dois","doit","devons","devez","doivent"]];
const infinifVerbs = ["Dormir", "Partir", "Courir", "Ouvrir", "Faire","Écrire","Prendre","Devoir"];

let scores = [undefined];
var verb = 0;

const inputs = Array.from(document.getElementsByTagName('input'));  
const chosenVerbSpan = document.getElementsByTagName('span');
const maDivMessage = document.getElementById("divMsg");

$(document).ready(function () {
    $('#b2').click(function () {
        location.reload();                //Recharge la page
    });
    $("input").keydown(function () {
        $(this).css("color", "black");       //Permet de taper des réponses en black à l'intérieur de chaque input
        $(this).css('backgroundColor', 'aliceblue');
    });
    $("#b1").click(function () {
        $("#divMsg").show();
    });
});

const showInfinitiveVerb = () => {
    chosenVerbSpan[0].innerHTML = infinifVerbs[verb] + 
        " (" + (verb + 1) + "/" + userAnswers.length + ")";
}

const firstPronom = () =>{
    if(infinifVerbs[verb][0] === "O" || infinifVerbs[verb][0] === "É") {
        inputs[0].previousSibling.textContent ="J'";
    }
    else {
        inputs[0].previousSibling.textContent ='Je';
    }
}
/* Verbe de départ */
(function () {
    document.getElementById("b0").innerHTML = "<<";
    
    for (let verb = 0; verb < answers.length; verb++) {
        scores[verb] = null;
        for (let i = 0; i < inputs.length; i++) {
            userAnswers[verb][i] = userAnswers[verb][0];

            if(verb === 0){
                showInfinitiveVerb();
                inputs[i].value = userAnswers[verb][0]; 
            }   
        }
    }
})();

/****Montre les résultats de l'utilisateur dans la div */
const message = message => {
    maDivMessage.innerHTML = message;
    maDivMessage.style.display = "table";
}

const showResult = () => {
    scores[verb] === inputs.length 
    ? message("Bravo ! Excellent !")
    : message(`Nombre de réponses correctes : 
    <span style="color:green">${scores[verb]}</span> 
    </br></br>Nombre de réponses erronées : <span style="color:red">
    ${inputs.length - scores[verb]}</span>`)
}

/********************************/
const inputStyle = (input, color = 'black', disabled = false) => {
    input.style.color = color;    
    input.disabled = disabled;
}


/*Traite les réponses entrées par l'utilisateur */
const dataProcessing = () => {
    showInfinitiveVerb();
    firstPronom();

    inputs.forEach((input, index) => {               //valeurs initiales et id attachés aux inputs 
        input.value = userAnswers[verb][index]
        inputStyle(input);

        if (userAnswers[verb][index] === answers[verb][index]) {
            inputStyle(input, 'green', true)
        }
        else if (scores[verb] === null) {
            inputStyle(input);
        }
        else inputStyle(input, 'red');
    });
    (scores[verb] != null) ? showResult() : maDivMessage.style.display = "none";
}

/*Fonction du bouton "Validez"*/

const submit = () => {
    scores[verb] = null;

    inputs.forEach((input, index) => {
        const value = input.value.trim();
        const answer = answers[verb][index];

        userAnswers[verb].splice(index, 1, value);

        if(value === answer) {
            inputStyle(input, 'green', true)
            scores[verb] += 1;
            return;
        }
        inputStyle(input, 'red')
    });
    showResult();
}

/*Fonction du bouton "Précédent"*/    
            const previousVerb = () => {                
                    verb -= 1;

                    if (verb === (-1)) {
                        verb = infinifVerbs.length -1; 
                    }               
                 
                    dataProcessing();
            }
/*Fonction du bouton "Suivant"*/       
            const nextVerb = () => {                                      
                    verb += 1;

                    if (verb === (infinifVerbs.length)) {
                        verb = 0;
                    }

                    dataProcessing();
            }

            document.getElementById("b3").addEventListener("click", nextVerb);
            document.getElementById("b1").addEventListener("click", submit);
            document.getElementById("b0").addEventListener("click", previousVerb);