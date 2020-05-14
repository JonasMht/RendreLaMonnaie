/// Partie ecouteurs d'evenements ///

var caisseEstOuverte = false;
var caisse = document.getElementById("Caisse");
var buttonCaisse = document.getElementById("BtnCaisse");

function etatCaisse(condition)
{
  if (condition)
  {
    caisseEstOuverte = true;
    caisse.style.display = "block";
    buttonCaisse.innerHTML = "Fermer le tiroir caisse";
  }
  else
  {
    caisseEstOuverte = false;
    caisse.style.display = "none";
    buttonCaisse.innerHTML = "Ouvrir le tiroir caisse";
  }
}

buttonCaisse.addEventListener("click", function(){etatCaisse(!caisseEstOuverte)});

/// Partie gestion de la monnaie ///

function alea(min,max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  brouzoufs = Math.floor(Math.random() * (max - min)) + min;
  cents = Math.floor(Math.random() * (10 - 0)) / 10.0;
  return brouzoufs+cents;
}


var eleTotal = document.getElementById("Total");
var eleRemis = document.getElementById("MontantRemis");
var eleStatut = document.getElementById("StatutTransaction");
var eleRecup = document.getElementById("MonnaieRecup");
var eleBtnChanger = document.getElementById("ChangerClient");
var elementsMonnaie = document.getElementsByClassName("monnaie"); // liste de touts les éléments monnaie
var eleBtnRendre = document.getElementById("BtnRendre");
var eleNbClients = document.getElementById("NombreClients");
var eleNbErreurs = document.getElementById("Erreurs");

var totalDu;
var sommeRemise;
var sommeRecup;

var nbClients = 0;
var nbEcheques = 0;


var service_en_cours;

for (let j = 0; j < elementsMonnaie.length; j++) {
  let element = elementsMonnaie[j];
  element.addEventListener('click', function() {
    if (service_en_cours)
    {
      var val = Number.parseFloat(element.textContent);
      sommeRecup += val;
      eleRecup.innerHTML = Number(sommeRecup.toFixed(1));

      eleStatut.innerHTML = "En cours de traitement."
      eleStatut.style.color = "blue";
    }
  });
}

eleBtnRendre.addEventListener('click', function() {
  if (service_en_cours)
  {
    service_en_cours = false;
    eleBtnChanger.innerHTML = "Servir le prochain client"
    eleBtnChanger.style = ""; //Pour revenir au style initial
    if (Number(sommeRecup.toFixed(1)) == Number((sommeRemise-totalDu).toFixed(1)))
    {
      //Rendu juste
      eleStatut.innerHTML = "Le compte est bon."
      eleStatut.style.color = "green";
    }
    else //Rendu faux
    if (Number(sommeRecup.toFixed(1)) > Number((sommeRemise-totalDu).toFixed(1))) {
      eleStatut.innerHTML = "Rendu plus que nécessaire !"
      eleStatut.style.color = "red";
      nbEcheques++;
    }
    else
    {
      eleStatut.innerHTML = "Il manque de la monnaie !"
      eleStatut .style.color = "red";
      nbEcheques++;
    }
    eleNbErreurs.innerHTML = nbEcheques;
  }
});

eleBtnChanger.addEventListener('click', function() {
  if (!service_en_cours)
  {
    init();
  }
});

function init()
{
  service_en_cours = true;

  nbClients++;

  totalDu =  alea(1,100);
  sommeRemise =  Math.ceil(totalDu / 10) * 10;
  sommeRecup = 0;

  eleTotal.innerHTML = totalDu.toString();
  eleRemis.innerHTML = sommeRemise.toString();
  eleStatut.innerHTML = "Non traité";
  eleStatut.style.color = "black";
  eleRecup.innerHTML = sommeRecup.toString();
  eleBtnChanger.innerHTML = "Service en cours";
  eleBtnChanger.style.backgroundColor = "#3a4345";
  eleBtnChanger.style.fontStyle = "italic";
  eleBtnChanger.style.color = "gray";
  eleNbClients.innerHTML = nbClients;
  eleNbErreurs.innerHTML = nbEcheques;

  //eleBtnChanger.style = ""; //Pour revenir au style initial

  etatCaisse(false)

}

init();

/*
Cours Javascript 2
//Un objet
//Mehtode 1
var MonObjet =
{
  a: "Hello";
  b: 30;
  c: true;

  MyFunc: function()
  {
    return a;
  }
};

//Mehtode 2
function MonObjet (a, b, c)
{
  this.a = a;
  this.b = b;
  this.c = c;

  this.MyFunc = function()
  {
    return a;
  }
};

var InstanceObject = new MyObject("Hello", 30, true);

MonObjet.a == "Hello" == MonObjet.MyFunc() == MonObjet['a']

//obtenir des objets de la page
document.getElementById("id"); un element unique
document.getElemenstByTagName("tag"); exemple p h1 div etc (tableau de tout les elements toruvés)
document.getElementsByClassName("class"); (tableau de toout les elements trouvés)
// Attontion au s (ElementS)

// Changer le contenu html
element.innerHTML = "SomeSome";
// Obtenir le contenu html
element.innerHTML

//changer les attributs
element.attributes[0].name; //renvoie le nom du premier paramètre de l'élément ex id, class etc.
element.attributes[0].value; //renvoie la valeur attribuée au premier paramètre de l'élément.
//Définir un attribut
element.setAttribute("class","MyClassName")

//events
x.addEventListener("mouseover", function1);
x.addEventListener("click", function2);
x.addEventListener("mouseout", function3);
//...

//Le dom et les noeuds
document.querySelector("li.menu") // exemple // obtenir un élément de liste appelé menu
document.querySelectorAll("li.menu") // exemple // obtensir tout les list items contenant menu

//changer d'autres attributs
element.style.color = "blue";
element.src = "newImg.png";

//tableaux
tab.lenght // renvoie le nombre d'éléments du tabelau
*/
