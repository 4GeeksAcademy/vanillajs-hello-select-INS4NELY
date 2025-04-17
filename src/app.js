import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  const palo = ['♦', '♥', '♠', '♣'];
  const numeros = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  const generarCarta = document.getElementById('generate');
  const sort = document.getElementById('sortCard');
  let cards = [];

  const getValorNumerico = (valor) => {
    if (valor === 'A') return 1;
    if (valor === 'J') return 11;
    if (valor === 'Q') return 12;
    if (valor === 'K') return 13;
    return valor;
  };

  const renderCart = () => {
    cards = [];
    const cantidadCartas = parseInt(document.getElementById('cardCantidad').value);
    const seccion = document.querySelector("#seccionCarta");
    seccion.innerHTML = "";

    for (let i = 0; i < cantidadCartas; i++) {
      const paloDefinido = palo[Math.floor(Math.random() * palo.length)];
      const numeroDefinido = numeros[Math.floor(Math.random() * numeros.length)];
      const valorNumerico = getValorNumerico(numeroDefinido);
      const color = (paloDefinido === '♦' || paloDefinido === '♥') ? 'red' : 'black';

      cards.push({
        palo: paloDefinido,
        numero: numeroDefinido,
        valor: valorNumerico,
        color: color
      });

      seccion.innerHTML += generarHTMLCarta(paloDefinido, numeroDefinido, color);
    }
  };

  const generarHTMLCarta = (palo, numero, color) => {
    return `
      <div class="carta bg-white shadow-sm" 
          style="width: 6rem; height: 10rem; border-radius: 0.6rem; display: flex; flex-direction: column; justify-content: space-between; color: ${color}; padding: 0.5rem;">
        <div style="text-align: left; font-size: 1.2rem;">${palo}</div>
        <div style="text-align: center; font-size: 1.8rem;">${numero}</div>
        <div style="text-align: right; font-size: 1.2rem;">${palo}</div>
      </div>
    `;
  };

  const sortCard = () => {
    const seccionSort = document.getElementById('sortingCarta');
    seccionSort.innerHTML = "";
    let tempCards = [...cards];
    let paso = 1;
    let min = 0;

    while (min < tempCards.length - 1) {
      for (let i = min + 1; i < tempCards.length; i++) {
        if (tempCards[min].valor > tempCards[i].valor) {
          let aux = tempCards[min]
          tempCards[min] = tempCards[i]
          tempCards[i] = aux;
        }

        const fila = document.createElement("div");
        fila.className = "d-flex gap-4 flex-wrap align-items-center my-3 col-12";
        const label = document.createElement("h4");
        label.className = "text-white m-2";
        label.innerText = `Paso ${paso}`;
        fila.appendChild(label);

        tempCards.forEach(carta => {
          fila.innerHTML += generarHTMLCarta(carta.palo, carta.numero, carta.color);
        });
        
        seccionSort.appendChild(fila);
        paso++;
      }
      min++
    }
  };

  generarCarta.addEventListener('click', renderCart);
  sort.addEventListener('click', sortCard);
};