# Il Codice delle Emozioni — Istruzioni

Due quiz statici (HTML + JS esterno + Bootstrap) pronti per GitHub Pages, con
salvataggio delle risposte su un Foglio Google tramite Apps Script.

## File inclusi
| File | A cosa serve |
|------|--------------|
| `index.html` | Pagina iniziale: scelta tra i due quiz |
| `quiz-elementari.html` | Quiz più facile (elementari/medie) — 3 opzioni |
| `quiz-superiori.html` | Quiz più difficile (superiori e oltre) — 4 opzioni |
| `quiz-config.js` | **Domande, risposte corrette e URL di salvataggio** (l'unico file da modificare) |
| `quiz.js` | Motore del quiz (non serve toccarlo) |
| `style.css` | Grafica |
| `Codice.gs` | Codice da incollare in Google Apps Script |

Ogni quiz mostra: **1 schermata età** + **6 domande** delle tue tabelle = 7 schermate.
Si scorre avanti/indietro (frecce o swipe) e si può cambiare risposta finché non si
preme **Invia**. A quel punto le risposte diventano definitive e vengono inviate.

---

## Passo 1 — Foglio Google + Apps Script (salvataggio risposte)

1. Vai su [sheets.new](https://sheets.new) e crea un nuovo Foglio Google (dagli un nome).
2. Nel Foglio: menu **Estensioni → Apps Script**.
3. Cancella tutto il codice di esempio e **incolla il contenuto di `Codice.gs`**. Salva (icona dischetto).
4. In alto a destra: **Deploy → Nuovo deployment**.
   - Ingranaggio "Seleziona tipo" → **App web**.
   - *Esegui come*: **Me stesso**
   - *Chi ha accesso*: **Chiunque**
   - Premi **Deploy**. La prima volta Google chiede l'autorizzazione: accettala
     (se compare "App non verificata" → *Avanzate → Vai al progetto (non sicuro)*: è la tua app).
5. Copia l'**URL della Web App** (finisce con `/exec`).

> Il foglio "Risposte" e la riga di intestazione vengono creati da soli al primo invio.

## Passo 2 — Incolla l'URL nel quiz

Apri `quiz-config.js` e incolla l'URL tra le virgolette:

```js
const SCRIPT_URL = "https://script.google.com/macros/s/XXXXX/exec";
```

Senza questo URL il quiz funziona lo stesso, ma **non salva** i dati.

## Passo 3 — Pubblica su GitHub Pages

1. Crea un repository su GitHub e carica **tutti i file** (quelli della tabella sopra).
2. Repository → **Settings → Pages**.
3. In *Source* scegli il branch `main` e cartella `/root`, poi **Save**.
4. Dopo un minuto il sito è online a `https://TUO-UTENTE.github.io/NOME-REPO/`.
   La pagina iniziale è `index.html`.

---

## Come cambiare domande o risposte
Tutto in `quiz-config.js`:
- `risposte`: l'elenco delle opzioni (l'ordine conta).
- `corretta`: l'indice della risposta giusta — **0 = prima opzione, 1 = seconda, 2 = terza, 3 = quarta**.
- `etaMin` / `etaMax` / `etaDefault`: limiti della schermata età.

## Note tecniche
- L'invio usa `fetch` in modalità `no-cors`: è il metodo affidabile per scrivere su
  Apps Script da un sito statico. I dati vengono salvati, ma la pagina non legge la
  risposta del server (non serve per raccogliere i dati).
- Il punteggio è calcolato nel browser e inviato insieme alle risposte. Se un domani
  vuoi evitare che sia "leggibile" nel codice, si può spostare il calcolo dentro `Codice.gs`.
- Ogni riga del foglio contiene: data/ora, tipo di quiz, età, punteggio, totale e,
  per ogni domanda, la lettera scelta e se era esatta.
