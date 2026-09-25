/* =====================================================================
   GOOGLE APPS SCRIPT - riceve le risposte del quiz e le scrive nel foglio
   ---------------------------------------------------------------------
   Come si usa (dettagli passo-passo in ISTRUZIONI.md):
   1. Crea un Foglio Google nuovo.
   2. Menu: Estensioni > Apps Script.
   3. Cancella il contenuto e incolla TUTTO questo file.
   4. Deploy > Nuovo deployment > tipo "App web".
        - Esegui come: Me stesso
        - Chi ha accesso: Chiunque
   5. Copia l'URL della Web App e incollalo in quiz-config.js (SCRIPT_URL).
   ===================================================================== */

/* Nome del foglio (tab) dove vengono salvate le risposte. */
var NOME_FOGLIO = "Risposte";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // evita scritture sovrapposte se arrivano più invii insieme
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(NOME_FOGLIO) || ss.insertSheet(NOME_FOGLIO);

    var dati = JSON.parse(e.postData.contents);
    var risposte = dati.risposte || [];
    var nDomande = dati.totale || risposte.length;

    /* Se il foglio è vuoto, scrive prima la riga di intestazione. */
    if (sheet.getLastRow() === 0) {
      var intestazione = ["Data e ora", "Quiz", "Età", "Punteggio", "Totale"];
      for (var h = 0; h < nDomande; h++) {
        intestazione.push("D" + (h + 1) + " scelta");
        intestazione.push("D" + (h + 1) + " esatta?");
      }
      sheet.appendRow(intestazione);
    }

    /* Costruisce la riga con i dati ricevuti. */
    var riga = [
      new Date(),
      dati.quiz || "",
      dati.eta || "",
      dati.punteggio,
      nDomande
    ];
    risposte.forEach(function (r) {
      riga.push(r.scelta);
      riga.push(r.corretta ? "sì" : "no");
    });
    sheet.appendRow(riga);

    return rispondi({ result: "success" });
  } catch (err) {
    return rispondi({ result: "error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* Apre l'URL nel browser: utile solo per verificare che sia attivo. */
function doGet() {
  return rispondi({ result: "ok", info: "Web app attiva. Usa POST per inviare i dati." });
}

function rispondi(oggetto) {
  return ContentService
    .createTextOutput(JSON.stringify(oggetto))
    .setMimeType(ContentService.MimeType.JSON);
}
