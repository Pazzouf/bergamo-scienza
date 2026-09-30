/* =====================================================================
   MOTORE DEL QUIZ - "Il Codice delle Emozioni"
   Non serve modificarlo: tutto ciò che cambia è in quiz-config.js
   ===================================================================== */
(function () {
  "use strict";

  /* Quale quiz caricare? Lo dice l'attributo data-quiz nel <body>. */
  const tipo = document.body.dataset.quiz;           // "elementari" | "superiori"
  const dati = (typeof QUIZ !== "undefined") ? QUIZ[tipo] : null;

  if (!dati) {
    document.body.innerHTML =
      '<p style="padding:24px;font-family:sans-serif">Configurazione del quiz non trovata. ' +
      'Controlla che quiz-config.js sia caricato e che data-quiz sia corretto.</p>';
    return;
  }

  const ACCENTI = [
    { c: "#73D2DE", soft: "#e7f6f8", on: "#0f4a50", ink: "#17646c" }, // azzurro
    { c: "#D81159", soft: "#fbe4ec", on: "#ffffff", ink: "#b30e4a" }, // magenta
    { c: "#FFBC42", soft: "#fff3dc", on: "#5c3d00", ink: "#8a5a00" }, // ambra
    { c: "#218380", soft: "#e2f1f0", on: "#ffffff", ink: "#1a6a68" }, // verde acqua
    { c: "#8F2D56", soft: "#f6e4ec", on: "#ffffff", ink: "#8F2D56" }  // bordeaux
  ];
  const LETTERE = ["A", "B", "C", "D", "E", "F"];

  /* Stato del quiz */
  const nDomande = dati.domande.length;
  const risposte = new Array(nDomande).fill(null);   // indice scelto per ogni domanda
  let inviato = false;

  /* Elementi della pagina */
  const inner      = document.getElementById("carouselInner");
  const carouselEl = document.getElementById("quizCarousel");
  const barra      = document.getElementById("progressBar");
  const infoProg   = document.getElementById("progressInfo");
  const brandDot   = document.getElementById("brandDot");
  const btnPrev    = document.getElementById("btnPrev");
  const btnNext    = document.getElementById("btnNext");
  const btnSubmit  = document.getElementById("btnSubmit");
  const hint       = document.getElementById("navHint");

  document.getElementById("brandName").textContent = dati.titolo;
  brandDot.textContent = "💡";

  /* ---------- Costruzione delle slide ---------- */

  function accentoDi(i) { return ACCENTI[i % ACCENTI.length]; }

  function applicaAccentoCard(card, i) {
    const a = accentoDi(i);
    card.style.setProperty("--accent", a.c);
    card.style.setProperty("--accent-soft", a.soft);
    card.style.setProperty("--accent-on", a.on);
    card.style.setProperty("--accent-ink", a.ink);
  }

  /* Slide di una domanda (la prima è quella attiva) */
  function creaSlideDomanda(d, idx) {
    const item = document.createElement("div");
    item.className = "carousel-item" + (idx === 0 ? " active" : "");
    const card = document.createElement("div");
    card.className = "quiz-card";
    applicaAccentoCard(card, idx);

    let html = "";
    if (d.emoji) html += '<div class="q-emoji">' + d.emoji + "</div>";
    html += '<div class="q-text">' + d.testo + "</div>";
    html += '<div class="options" role="group">';
    d.risposte.forEach(function (testo, j) {
      html +=
        '<button type="button" class="option" data-domanda="' + idx + '" data-opzione="' + j + '">' +
          '<span class="letter">' + LETTERE[j] + "</span>" +
          '<span class="label">' + testo + "</span>" +
          '<svg class="check" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" ' +
            'stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "</button>";
    });
    html += "</div>";

    card.innerHTML = html;
    item.appendChild(card);
    inner.appendChild(item);
  }

  dati.domande.forEach(creaSlideDomanda);

  /* ---------- Carosello Bootstrap (scorrimento + swipe) ---------- */
  const carosello = new bootstrap.Carousel(carouselEl, {
    interval: false,
    wrap: false,
    keyboard: false,
    touch: true
  });

  const ultimaSlide = nDomande - 1;   // slide 0..nDomande-1

  /* ---------- Interazioni ---------- */

  /* Selezione risposta */
  inner.addEventListener("click", function (e) {
    const opt = e.target.closest(".option");
    if (!opt || inviato) return;
    const d = parseInt(opt.dataset.domanda, 10);
    const j = parseInt(opt.dataset.opzione, 10);
    risposte[d] = j;

    const gruppo = opt.parentElement.querySelectorAll(".option");
    gruppo.forEach(function (o) { o.classList.remove("selected"); });
    opt.classList.add("selected");
    nascondiHint();
  });

  /* Navigazione */
  btnPrev.addEventListener("click", function () { carosello.prev(); });
  btnNext.addEventListener("click", function () { carosello.next(); });
  btnSubmit.addEventListener("click", invia);

  /* Aggiorna header e pulsanti a ogni cambio slide */
  carouselEl.addEventListener("slid.bs.carousel", function (e) {
    aggiornaUI(e.to);
  });

  function aggiornaUI(i) {
    /* Dopo l'invio la navigazione resta bloccata sulla schermata finale */
    if (inviato) {
      const t = ACCENTI[3]; // verde acqua = positivo
      const r0 = document.documentElement.style;
      r0.setProperty("--accent", t.c);
      r0.setProperty("--accent-soft", t.soft);
      r0.setProperty("--accent-on", t.on);
      r0.setProperty("--accent-ink", t.ink);
      barra.style.width = "100%";
      infoProg.textContent = "Fine";
      btnPrev.classList.add("hidden");
      btnNext.classList.add("hidden");
      btnSubmit.classList.add("hidden");
      return;
    }

    /* accento di header/nav in linea con la slide corrente */
    const a = accentoDi(i);
    const r = document.documentElement.style;
    r.setProperty("--accent", a.c);
    r.setProperty("--accent-soft", a.soft);
    r.setProperty("--accent-on", a.on);
    r.setProperty("--accent-ink", a.ink);

    /* progresso */
    barra.style.width = (((i + 1) / nDomande) * 100) + "%";
    infoProg.textContent = "Domanda " + (i + 1) + " di " + nDomande;

    /* pulsanti */
    btnPrev.classList.toggle("hidden", i === 0);
    const inFondo = (i === ultimaSlide);
    btnNext.classList.toggle("hidden", inFondo);
    btnSubmit.classList.toggle("hidden", !inFondo);
  }

  /* ---------- Invio ---------- */

  function primaSenzaRisposta() {
    for (let k = 0; k < nDomande; k++) if (risposte[k] === null) return k;
    return -1;
  }

  function invia() {
    if (inviato) return;
    const mancante = primaSenzaRisposta();
    if (mancante !== -1) {
      mostraHint("Rispondi a tutte le domande prima di inviare 🙂");
      carosello.to(mancante);   // porta alla prima domanda senza risposta
      return;
    }
    inviato = true;

    let punteggio = 0;
    const dettaglio = dati.domande.map(function (d, i) {
      const scelto = risposte[i];
      const giusta = [].concat(d.corretta).indexOf(scelto) !== -1;
      if (giusta) punteggio++;
      return {
        n: i + 1,
        domanda: d.testo,
        scelta: LETTERE[scelto],
        testoScelta: d.risposte[scelto],
        corretta: giusta
      };
    });

    const payload = {
      quiz: tipo,
      timestamp: new Date().toISOString(),
      punteggio: punteggio,
      totale: nDomande,
      risposte: dettaglio
    };

    mostraRisultato(punteggio, dettaglio);
    inviaDati(payload);
  }

  /* Invio al Google Apps Script (no-cors + text/plain). */
  function inviaDati(payload) {
    if (!SCRIPT_URL) {
      console.warn("SCRIPT_URL vuoto: dati NON inviati. Payload:", payload);
      return;
    }
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).catch(function (err) {
      console.error("Invio non riuscito:", err);
    });
  }

  /* ---------- Schermata finale ---------- */
  function costruisciRiepilogo(dettaglio) {
    return dettaglio.map(function (r, i) {
      const q = dati.domande[i];
      const giustaTesto = q.risposte[q.corretta];
      const giustaLettera = LETTERE[q.corretta];
      let corpo;
      if (r.corretta) {
        corpo =
          '<div class="rev-line ok"><span class="rev-tag">✓ Risposta corretta</span>' +
          giustaLettera + ". " + giustaTesto + "</div>";
      } else {
        corpo =
          '<div class="rev-line ko"><span class="rev-tag">✗ La tua risposta</span>' +
          r.scelta + ". " + r.testoScelta + "</div>" +
          '<div class="rev-line ok"><span class="rev-tag">✓ Risposta corretta</span>' +
          giustaLettera + ". " + giustaTesto + "</div>";
      }
      return (
        '<div class="rev-item ' + (r.corretta ? "is-ok" : "is-ko") + '">' +
          '<div class="rev-q"><span class="rev-n">' + r.n + "</span>" + q.testo + "</div>" +
          corpo +
        "</div>"
      );
    }).join("");
  }

  function mostraRisultato(punteggio, dettaglio) {
    const giovane = (tipo === "elementari");
    const item = document.createElement("div");
    item.className = "carousel-item";
    const card = document.createElement("div");
    card.className = "quiz-card";
    applicaAccentoCard(card, 3); // verde acqua = positivo

    const titolo = "Congratulazioni per aver completato il quiz!";
    const testo  = giovane
      ? "Hai finito il quiz sulle emozioni. Grazie per aver partecipato!"
      : "Le tue risposte sono state registrate. Grazie per la partecipazione.";

    card.innerHTML =
      '<div class="result">' +
        '<div class="big-emoji">' + (giovane ? "🎉" : "✅") + "</div>" +
        "<h2>" + titolo + "</h2>" +
        '<div class="score">' + punteggio + ' <small>/ ' + nDomande + "</small></div>" +
        "<p>" + testo + "</p>" +
        '<div class="review">' +
          "<h3>Riepilogo delle risposte</h3>" +
          costruisciRiepilogo(dettaglio) +
        "</div>" +
      "</div>";

    item.appendChild(card);
    inner.appendChild(item);

    btnPrev.classList.add("hidden");
    btnNext.classList.add("hidden");
    btnSubmit.classList.add("hidden");
    infoProg.textContent = "Fine";
    barra.style.width = "100%";
    carosello.to(inner.children.length - 1);
    window.scrollTo(0, 0);
  }

  /* ---------- Hint ---------- */
  let hintTimer = null;
  function mostraHint(msg) {
    hint.textContent = msg;
    hint.classList.add("show");
    clearTimeout(hintTimer);
    hintTimer = setTimeout(nascondiHint, 3500);
  }
  function nascondiHint() {
    hint.classList.remove("show");
  }

  /* Stato iniziale */
  aggiornaUI(0);
})();
