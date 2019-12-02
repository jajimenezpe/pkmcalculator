
var typeMatrix = [
    //Normal
    [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //Lucha
    [1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2],
    //Volador
    [1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1],
    //Veneno
    [1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5],
    //Tierra
    [1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1],
    //Roca
    [0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1],
    //Bicho
    [1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1],
    //Fantasma
    [0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    //Acero
    [
        0.5,
        2,
        0.5,
        0,
        2,
        0.5,
        0.5,
        1,
        0.5,
        2,
        1,
        0.5,
        1,
        0.5,
        0.5,
        0.5,
        1,
        0.5
    ],
    //Fuego
    [1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5],
    //Agua
    [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1],
    //Planta
    [1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1],
    //Eléctrico
    [1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1],
    //Psíquico
    [1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1],
    //Hielo
    [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
    //Dragón
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2],
    //Siniestro
    [1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2],
    //Hada
    [1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1]
];

function calculaDmg() {
    console.log("tus cuernos");

    var multiplicador = 1;
    var atk = document.getElementById("TipoA");
    var posatk = atk.options[atk.selectedIndex].value;
    var def1 = document.getElementById("TipoD1");
    var posdef1 = def1.options[def1.selectedIndex].value;
    var def2 = document.getElementById("TipoD2");
    var posdef2 = def2.options[def2.selectedIndex].value;


    if (posatk < 0) {
        alert("Acción necesaria: Selecciona tipo de ataque");
        return false;
    }
    if (posdef1 < 0 && posdef2 < 0) {
        alert("Acción necesaria: Selecciona al menos un tipo de defensa");
        return false;
    }
    if (posdef1 == posdef2) {
        alert("Acción necesaria: Seleccione dos tipos de defensa diferentes");
        return false;
    }

    //Defensa = fila || Ataque = columna
    if (posdef1 >= 0) {
        multiplicador *= typeMatrix[posdef1][posatk];
    }
    if (posdef2 >= 0) {
        multiplicador *= typeMatrix[posdef2][posatk];
    }

    var stbpos = document.getElementById("stab");
    var stab = stbpos.options[stbpos.selectedIndex].value;
    var nivel = document.getElementById("lvlpkm").value;
    var valpotenciaMov = document.getElementById("potenciaMov").value;
    var valAtaquePkm = document.getElementById("ataquePkm").value;
    var valDefensa = document.getElementById("defensaPkm").value;

    /*           console.log(stab);
              console.log(nivel);
              console.log(valpotenciaMov);
              console.log(valAtaquePkm);
              console.log(valDefensa); */


    var cociente =
        ((0.2 * nivel + 1) * valAtaquePkm * valpotenciaMov) / (25 * valDefensa);
    cociente += 2;

    var dañoMinimo = 0.01 * stab * multiplicador * 85;
    dañoMinimo *= cociente;
    dañoMinimo = Math.round(dañoMinimo);

    var dañoMaximo = 0.01 * stab * multiplicador * 100;
    dañoMaximo *= cociente;
    dañoMaximo = Math.round(dañoMaximo);



    var res = "<p>multiplicador: " +
        multiplicador +
        "</p> <p>Daño mínimo: " +
        dañoMinimo +
        "</p> <p> Daño máximo: " +
        dañoMaximo + "</p>";

    document.getElementById("result").innerHTML = res;



    /*     document.getElementById("result").textContent =
            "multiplicador: " +
            multiplicador +
            " Daño mínimo: " +
            dañoMinimo +
            " Daño máximo: " +
            dañoMaximo; */

    return false;
}