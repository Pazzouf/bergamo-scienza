/* =====================================================================
   CONFIGURAZIONE QUIZ - "Il Codice delle Emozioni"
   ---------------------------------------------------------------------
   Qui dentro c'è tutto ciò che puoi modificare senza toccare il motore:
   - l'URL del Google Apps Script (dove finiscono le risposte)
   - le domande, le opzioni e la risposta corretta di ogni quiz
   ===================================================================== */

/* 1) INCOLLA QUI l'URL della tua Web App di Google Apps Script.
      Lo ottieni dopo il "Deploy" (vedi ISTRUZIONI.md).
      Finché resta vuoto, il quiz funziona ma NON salva i dati.        */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxe_7ffogvIrP9VF8U26KB3ufvPBQ26Guv2LJDIiR-ZRVM21r2EDDb2H1mrn1ffhtvh2g/exec";

/* 2) I DUE QUIZ.
      - "risposte" è un array di opzioni. L'ordine conta.
      - "corretta" è l'INDICE (0 = prima opzione, 1 = seconda, ...)
        della risposta giusta. Ogni domanda ha UNA sola risposta giusta.
      - Puoi cambiare testi, aggiungere/togliere opzioni liberamente.   */

const QUIZ = {

  /* ---------- QUIZ ELEMENTARI / MEDIE (più facile, 3 opzioni) ---------- */
  elementari: {
    titolo: "Il Codice delle Emozioni",
    sottotitolo: "Un piccolo viaggio dentro le emozioni",
    domande: [
      {
        emoji: "💓",
        testo: "Cosa può succedere al nostro corpo quando proviamo un'emozione forte?",
        risposte: [
          "Il cuore può battere più velocemente",
          "Il cuore smette di battere",
          "Il corpo non cambia mai"
        ],
        corretta: 0
      },
      {
        emoji: "😨",
        testo: "Perché quando abbiamo paura il cuore batte più velocemente?",
        risposte: [
          "Perché il cuore si stanca e deve lavorare di più",
          "Perché il corpo si prepara a reagire a un possibile pericolo",
          "Perché la paura blocca temporaneamente il cervello"
        ],
        corretta: 1
      },
      {
        emoji: "😄",
        testo: "Che colore associ all'emozione della felicità?",
        risposte: [
          "Grigio",
          "Nero",
          "Giallo"
        ],
        corretta: 2
      },
      {
        emoji: "🫀",
        testo: "In quale parte del corpo sentiamo spesso le emozioni più intense?",
        risposte: [
          "Solo nelle mani",
          "Nel petto e nella pancia",
          "Solo nelle gambe"
        ],
        corretta: 1
      },
      {
        emoji: "🤝",
        testo: "Se vedi un tuo amico piangere, cosa fa scattare in te la voglia di consolarlo?",
        risposte: [
          "Un calcolo matematico nella testa",
          "Una risposta automatica del cervello chiamata empatia",
          "Una regola scolastica che impone di aiutare"
        ],
        corretta: 1
      },
      {
        emoji: "🌈",
        testo: "Puoi scegliere di non provare un'emozione se non vuoi sentirla?",
        risposte: [
          "Sì, basta volerlo con forza",
          "No, le emozioni arrivano in modo automatico, ma possiamo scegliere come reagire",
          "Sì, ma solo per le emozioni negative"
        ],
        corretta: 1
      }
    ]
  },

  /* ---------- QUIZ SUPERIORI (più difficile, 4 opzioni) ---------- */
  superiori: {
    titolo: "Il Codice delle Emozioni",
    sottotitolo: "Emozioni, cervello e cultura",
    domande: [
      {
        emoji: "💭",
        testo: "Che cosa sono le emozioni?",
        risposte: [
          "Solo pensieri",
          "Reazioni che proviamo davanti a situazioni diverse",
          "Solo movimenti del corpo",
          "Solo ricordi"
        ],
        corretta: 1
      },
      {
        emoji: "🎵",
        testo: "Possiamo provare emozioni anche ascoltando una canzone?",
        risposte: [
          "Sì",
          "No, mai",
          "Solo se abbiamo studiato musica",
          "Solo quando siamo tristi"
        ],
        corretta: 0
      },
      {
        emoji: "😢",
        testo: "Perché una musica può farci sentire tristi?",
        risposte: [
          "Perché la musica può influenzare le nostre emozioni",
          "Perché tutte le musiche sono tristi",
          "Perché la musica fa sempre paura",
          "Perché non possiamo capire la musica"
        ],
        corretta: 0
      },
      {
        emoji: "🌍",
        testo: "Tutte le persone esprimono le emozioni nello stesso modo?",
        risposte: [
          "Sì, sempre",
          "No, anche la cultura può influenzare il modo in cui esprimiamo le emozioni",
          "Solo i bambini sono diversi",
          "Solo gli adulti sono diversi"
        ],
        corretta: 1
      },
      {
        emoji: "⚖️",
        testo: "Emozioni e ragione possono lavorare insieme?",
        risposte: [
          "Sì",
          "No",
          "Solo nei bambini",
          "Solo quando siamo felici"
        ],
        corretta: 0
      },
      {
        emoji: "🌱",
        testo: "Possiamo imparare a gestire le nostre emozioni?",
        risposte: [
          "Sì",
          "No, mai",
          "Solo la paura",
          "Solo la felicità"
        ],
        corretta: 0
      }
    ]
  }
};
 
