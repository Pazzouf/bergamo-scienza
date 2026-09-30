/* =====================================================================
   IL CODICE DELLE EMOZIONI - Foglio di stile
   Palette del progetto:
     amber   #FFBC42   crimson #D81159   burgundy #8F2D56
     teal    #218380   sky     #73D2DE
   ===================================================================== */

:root {
  --amber:   #FFBC42;
  --crimson: #D81159;
  --burgundy:#8F2D56;
  --teal:    #218380;
  --sky:     #73D2DE;

  --ink:     #3a2733;          /* testo principale, caldo scuro */
  --ink-soft:#7a6b72;          /* testo secondario */
  --card-bg: #ffffff;
  --page-bg: #f6fbfc;

  /* accento attivo della domanda corrente (cambia via JS) */
  --accent:      var(--sky);
  --accent-soft: #e7f6f8;
  --accent-on:   #0f4a50;   /* testo LEGGIBILE sopra il colore pieno accento */
  --accent-ink:  #17646c;   /* testo color-accento su sfondo chiaro */

  --radius:  22px;
  --radius-lg: 30px;
  --tap: 64px;                 /* altezza minima aree toccabili */

  --font-display: "Fredoka", system-ui, sans-serif;
  --font-body:    "Nunito", system-ui, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: var(--font-body);
  color: var(--ink);
  background:
    radial-gradient(circle at 12% 8%,  rgba(115,210,222,.28), transparent 42%),
    radial-gradient(circle at 88% 92%, rgba(255,188,66,.26),  transparent 45%),
    var(--page-bg);
  -webkit-font-smoothing: antialiased;
  overscroll-behavior-y: contain;
}

/* Contenitore a tutta altezza (schermo del telefono/tablet) */
.quiz-app {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  max-width: 680px;                 /* su tablet resta centrato e leggibile */
  margin: 0 auto;
  padding: 0 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}

/* ---------- HEADER / PROGRESSO ---------- */
.quiz-header { padding: 8px 4px 14px; }

.quiz-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.quiz-brand .dot {
  width: 34px; height: 34px; border-radius: 12px;
  background: var(--accent);
  display: grid; place-items: center;
  font-size: 1.1rem;
  transition: background .35s ease;
  flex: 0 0 auto;
}
.quiz-brand .name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.1;
  color: var(--burgundy);
}

.quiz-progress-info {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: .95rem;
  color: var(--ink-soft);
  margin-bottom: 6px;
}
.quiz-header .progress {
  height: 12px;
  border-radius: 999px;
  background: #e6eef0;
  overflow: hidden;
}
.quiz-header .progress-bar {
  background: var(--accent);
  border-radius: 999px;
  transition: width .4s cubic-bezier(.22,1,.36,1), background .35s ease;
}

/* ---------- AREA DOMANDE ---------- */
.quiz-main {
  flex: 1 1 auto;
  display: flex;
  min-height: 0;
}
#quizCarousel, .carousel-inner { width: 100%; }
.carousel-item { transition: transform .45s ease, opacity .3s ease; }

.quiz-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 40px -22px rgba(143,45,86,.45);
  border: 2px solid #eef4f5;
  padding: 26px 22px 22px;
  /* riempie lo schermo tolti header e barra dei pulsanti (adattivo) */
  min-height: calc(100vh - 250px);
  min-height: calc(100svh - 250px);
  display: flex;
  flex-direction: column;
}

.q-emoji {
  font-size: 2.6rem;
  line-height: 1;
  margin-bottom: 10px;
}
.q-text {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.45rem;
  line-height: 1.25;
  color: var(--ink);
  margin-bottom: 20px;
}

/* Opzioni di risposta: grandi, facili da toccare */
.options { display: flex; flex-direction: column; gap: 12px; }

.option {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  min-height: var(--tap);
  padding: 12px 16px;
  border: 2.5px solid #e7edef;
  border-radius: var(--radius);
  background: #fbfdfd;
  color: var(--ink);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1.08rem;
  text-align: left;
  line-height: 1.25;
  cursor: pointer;
  transition: transform .12s ease, border-color .2s ease,
              background .2s ease, box-shadow .2s ease;
}
.option:active { transform: scale(.98); }

.option .letter {
  flex: 0 0 auto;
  width: 38px; height: 38px;
  border-radius: 12px;
  display: grid; place-items: center;
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  transition: background .2s ease, color .2s ease;
}
.option .label { flex: 1 1 auto; }
.option .check {
  flex: 0 0 auto;
  width: 26px; height: 26px;
  opacity: 0;
  transform: scale(.5);
  transition: opacity .2s ease, transform .2s ease;
}

/* Opzione selezionata */
.option.selected {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--accent-on);
  box-shadow: 0 12px 22px -12px var(--accent);
}
.option.selected .letter { background: rgba(255,255,255,.28); color: var(--accent-on); }
.option.selected .check { opacity: 1; transform: scale(1); }

/* ---------- SLIDE ETÀ ---------- */
.age-wrap { text-align: center; margin-top: 6px; }
.age-stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin: 26px 0 6px;
}
.age-btn {
  width: 66px; height: 66px;
  border-radius: 20px;
  border: none;
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: transform .12s ease, filter .2s ease;
}
.age-btn:active { transform: scale(.92); }
.age-btn:disabled { opacity: .4; cursor: default; }
.age-value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 3.6rem;
  color: var(--accent-ink);
  min-width: 96px;
}
.age-unit { font-size: 1rem; color: var(--ink-soft); font-weight: 600; }

/* ---------- NAV IN BASSO ---------- */
.quiz-nav {
  display: flex;
  gap: 12px;
  padding-top: 14px;
}
.nav-btn {
  border: none;
  border-radius: 18px;
  min-height: 58px;
  padding: 0 22px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  transition: transform .12s ease, filter .2s ease, opacity .2s ease;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.nav-btn:active { transform: translateY(2px); }
.nav-btn:disabled { opacity: .45; cursor: default; }

.btn-prev {
  flex: 0 0 auto;
  background: #fff;
  color: var(--burgundy);
  border: 2.5px solid #e7edef;
}
.btn-next {
  flex: 1 1 auto;
  background: var(--accent);
  color: var(--accent-on);
  box-shadow: 0 12px 24px -12px var(--accent);
}
.btn-submit {
  flex: 1 1 auto;
  background: var(--crimson);
  color: #fff;
  box-shadow: 0 12px 24px -12px var(--crimson);
}
.nav-btn.hidden { display: none; }

/* Messaggio "rispondi prima di inviare" */
.nav-hint {
  text-align: center;
  font-family: var(--font-body);
  font-weight: 700;
  color: var(--crimson);
  min-height: 20px;
  margin-top: 8px;
  font-size: .95rem;
  opacity: 0;
  transition: opacity .2s ease;
}
.nav-hint.show { opacity: 1; }

/* ---------- SCHERMATA FINALE ---------- */
.result {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  gap: 6px;
  padding: 10px;
}
.result .big-emoji { font-size: 4.4rem; }
.result h2 {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--burgundy);
  margin: 6px 0 2px;
}
.result .score {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.6rem;
  color: var(--teal);
}
.result .score small { font-size: 1.2rem; color: var(--ink-soft); font-weight: 600; }
.result p { color: var(--ink-soft); font-weight: 600; max-width: 34ch; }
.result .sending { color: var(--ink-soft); font-weight: 700; }

/* ---------- VARIANTE BAMBINI (elementari/medie) ---------- */
body.quiz-young { --radius: 26px; --radius-lg: 34px; --tap: 70px; }
body.quiz-young .q-text  { font-size: 1.62rem; }
body.quiz-young .q-emoji { font-size: 3.1rem; }
body.quiz-young .option  { font-size: 1.16rem; }

/* ---------- VARIANTE RAGAZZI (superiori) ---------- */
body.quiz-old .q-text  { font-size: 1.34rem; line-height: 1.3; }
body.quiz-old .q-emoji { font-size: 2.2rem; }
body.quiz-old .option  { font-size: 1.02rem; font-weight: 700; }
body.quiz-old .quiz-brand .name { font-size: 1rem; }

/* ---------- Schermi molto piccoli ---------- */
@media (max-width: 360px) {
  .q-text { font-size: 1.28rem !important; }
  .option { font-size: 1rem; padding: 10px 12px; }
  .age-value { font-size: 3rem; }
}

/* Su schermi alti diamo un po' d'aria al contenuto della card */
@media (min-height: 720px) {
  .quiz-card { padding-top: 34px; }
  .q-text { margin-bottom: 26px; }
}

/* Rispetta chi preferisce meno animazioni */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}

/* Focus visibile da tastiera (accessibilità) */
.option:focus-visible,
.nav-btn:focus-visible,
.age-btn:focus-visible {
  outline: 3px solid var(--burgundy);
  outline-offset: 2px;
}

/* ---------- RIEPILOGO RISPOSTE (schermata finale) ---------- */
.result .review {
  width: 100%;
  text-align: left;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.result .review h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--burgundy);
  margin: 0 0 2px;
}
.rev-item {
  border-radius: 18px;
  padding: 14px 14px 12px;
  border: 2px solid #e7edef;
  background: #fbfdfd;
}
.rev-item.is-ok { border-color: #bfe0de; background: #f0f8f7; }
.rev-item.is-ko { border-color: #f3c4d5; background: #fdf0f4; }
.rev-q {
  display: flex;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.02rem;
  line-height: 1.3;
  color: var(--ink);
  margin-bottom: 8px;
}
.rev-n {
  flex: 0 0 auto;
  width: 26px; height: 26px;
  border-radius: 9px;
  display: grid; place-items: center;
  background: #fff;
  color: var(--burgundy);
  font-size: .9rem;
  font-weight: 600;
}
.rev-line {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: .95rem;
  line-height: 1.3;
  padding: 8px 10px;
  border-radius: 12px;
  margin-top: 6px;
}
.rev-line .rev-tag {
  display: block;
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .04em;
  margin-bottom: 2px;
}
.rev-line.ok { background: #e2f1f0; color: #1a6a68; }
.rev-line.ko { background: #fbe4ec; color: #b30e4a; }
