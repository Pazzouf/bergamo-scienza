/* =====================================================================
   CONFIGURAZIONE QUIZ - "Il Codice delle Emozioni"
   ---------------------------------------------------------------------
   Qui dentro c'è tutto ciò che puoi modificare senza toccare il motore:
   - l'URL del Google Apps Script (dove finiscono le risposte)
   - le domande, le opzioni e la risposta corretta di ogni quiz
   ===================================================================== */

/* 1) URL della Web App di Google Apps Script. */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6FA0omhjX-W36LaSa8Mjwr_-5HW6F0_T-lwCjciLVoWsaialy_OKVTq4dEe_2iNWksA/exec";

/* 2) I DUE QUIZ.
      - "risposte" è un array di opzioni. L'ordine conta.
      - "corretta" è l'INDICE (0 = prima opzione, 1 = seconda, ...)
        della risposta giusta. Ogni domanda ha UNA sola risposta giusta. */

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
        testo: "Cosa sono le emozioni?",
        risposte: [
          "Reazioni del cervello e del corpo che ci aiutano a rispondere a ciò che viviamo",
          "Pensieri che controlliamo sempre volontariamente",
          "Reazioni che coinvolgono soltanto il cuore",
          "Sensazioni casuali che non hanno alcuna funzione"
        ],
        corretta: 0
      },
      {
        emoji: "🌍",
        testo: "Tutte le persone esprimono le emozioni allo stesso modo?",
        risposte: [
          "Sì, perché le emozioni sono uguali per tutti",
          "No, ogni persona può esprimere e manifestare le emozioni in modo diverso",
          "Sì, perché il cervello controlla le emozioni nello stesso modo in tutti",
          "No, perché alcune persone non provano emozioni"
        ],
        corretta: 1
      },
      {
        emoji: "⚖️",
        testo: "Emozioni e ragione possono lavorare insieme?",
        risposte: [
          "No, le emozioni impediscono sempre di ragionare",
          "Sì, possono collaborare aiutandoci a prendere decisioni più consapevoli",
          "No, quando proviamo emozioni non possiamo più pensare",
          "Sì, ma solo quando siamo completamente privi di emozioni"
        ],
        corretta: 1
      },
      {
        emoji: "🧠",
        testo: "Quale parte del cervello è particolarmente importante per pianificare, controllare gli impulsi e valutare le conseguenze?",
        risposte: [
          "Corteccia prefrontale",
          "Talamo",
          "Ippocampo",
          "Amigdala"
        ],
        corretta: 0
      },
      {
        emoji: "🔍",
        testo: "Quali fattori possono influenzare il modo in cui viviamo un'emozione?",
        risposte: [
          "Contesto della situazione",
          "Interpretazione personale",
          "Esperienze precedenti",
          "Tutti i fattori indicati"
        ],
        corretta: 3
      },
      {
        emoji: "😨",
        testo: "Quando proviamo paura, perché il battito del cuore può aumentare?",
        risposte: [
          "Perché il cuore decide autonomamente di accelerare",
          "Perché il sangue diventa improvvisamente più caldo",
          "Perché il cervello attiva una risposta di allerta del corpo",
          "Perché i polmoni comandano direttamente il cuore"
        ],
        corretta: 2
      },
      {
        emoji: "⚡",
        testo: "Quale parte del cervello è particolarmente coinvolta nella risposta alla paura?",
        risposte: [
          "Amigdala",
          "Cervelletto",
          "Midollo osseo",
          "Nervo ottico"
        ],
        corretta: 0
      },
      {
        emoji: "🫀",
        testo: "Quale sistema permette al cervello di modificare automaticamente il battito cardiaco durante un'emozione?",
        risposte: [
          "Sistema tegumentario",
          "Sistema scheletrico",
          "Sistema nervoso autonomo",
          "Sistema linfatico"
        ],
        corretta: 2
      },
      {
        emoji: "🚨",
        testo: "Quale sostanza è particolarmente importante nella risposta immediata del corpo a una situazione di pericolo?",
        risposte: [
          "Adrenalina",
          "Melatonina",
          "Citochina",
          "Emoglobina"
        ],
        corretta: 0
      },
      {
        emoji: "🔄",
        testo: "Che cosa significa dire che cervello e cuore comunicano tra loro?",
        risposte: [
          "Il cervello può influenzare il cuore e ricevere informazioni dal corpo",
          "Il cervello invia sangue direttamente al cuore",
          "Il cuore pensa al posto del cervello",
          "Il cuore controlla tutte le emozioni"
        ],
        corretta: 0
      }
    ]
  }
};
