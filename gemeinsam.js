// Gemeinsame Hilfsfunktionen für alle Seiten – nicht anfassen.
(function () {
  "use strict";
  var K = window.KONFIG || {};
  var B = window.BRIEF || {};

  // E-Mail-Adressen stehen in config.js als „name(at)domain.de“ (Spamschutz).
  // Hier werden sie für die Seite wieder zu normalen Adressen.
  function entschluesseln(s) {
    return typeof s === "string" ? s.replace(/\s*\(\s*at\s*\)\s*/gi, "@").trim() : s;
  }
  K.sammelAdresse = entschluesseln(K.sammelAdresse);
  if (K.anbieter) K.anbieter.email = entschluesseln(K.anbieter.email);
  if (K.datenschutzbeauftragter) K.datenschutzbeauftragter.email = entschluesseln(K.datenschutzbeauftragter.email);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Steht noch ein [Platzhalter] drin?
  function platzhalter(s) { return /\[[^\]]*\]/.test(String(s || "")); }

  // Text sicher ausgeben, Platzhalter gelb markieren
  function feld(s) {
    if (!s) return "";
    return esc(s).replace(/\[[^\]]*\]/g, function (m) { return '<mark class="platzhalter">' + m + "</mark>"; });
  }

  // E-Mail-Adresse als Link (oder markierter Platzhalter)
  function mail(s) {
    if (!s) return "";
    return platzhalter(s) ? feld(s) : '<a href="mailto:' + esc(s) + '">' + esc(s) + "</a>";
  }

  function anbieterBlock() {
    var a = K.anbieter || {};
    return [a.name, a.postfach || a.strasse, a.ort, a.vertreten].filter(Boolean).map(feld).join("<br>");
  }

  // „Registergericht: Amtsgericht …, Registernummer: VR …“
  function registerZeile() {
    var a = K.anbieter || {}, t = [];
    if (a.registergericht) t.push("Registergericht: " + feld(a.registergericht));
    if (a.registernummer) t.push("Registernummer: " + feld(a.registernummer));
    return t.join("<br>");
  }

  function verantwortlichZeile() {
    var v = K.verantwortlich || {}, a = K.anbieter || {};
    var anschrift = v.anschrift || [a.postfach || a.strasse, a.ort].filter(Boolean).join(", ");
    return feld(v.name) + (anschrift ? ", " + feld(anschrift) : "");
  }

  function titel() { return (K.artikel ? K.artikel + " " : "") + (K.name || "Kaffee&Kelle"); }
  function briefTitel() { return B.titel || ("Offener Brief von " + titel()); }
  function mindestalter() { return K.mindestalter || 16; }

  // Einwilligung zur Unterschrift – identisch auf der Seite, in der E-Mail und im Datenschutzhinweis
  function einwilligung() {
    var a = K.anbieter || {};
    return "Ich willige ausdrücklich ein, dass " + (a.name || "die Initiative") +
      " meinen Namen, meine PLZ, meine Verbindung zu " + titel() +
      ", gegebenenfalls meinen Verein bzw. meine Initiative und gegebenenfalls meinen Gästebuch-Eintrag speichert" +
      " und zusammen mit dem offenen Brief an " + (K.empfaenger || "die Stadt") + " übergibt. " +
      "Daraus geht meine Haltung zu diesem Anliegen hervor. " +
      "Meine E-Mail-Adresse wird nicht an die Stadt weitergegeben. " +
      "Ich kann die Einwilligung jederzeit mit einer E-Mail an " + (K.sammelAdresse || "die Initiative") +
      " widerrufen; bis zur Übergabe werde ich dann von der Liste gestrichen.";
  }

  // Einwilligung „weiter informiert bleiben“ – getrennt von der Unterschrift
  function infoEinwilligung() {
    var a = K.anbieter || {};
    return "Ich möchte, dass " + (a.name || "die Initiative") + " meinen Namen und meine E-Mail-Adresse speichert, " +
      "um mich über " + titel() + " zu informieren, auch über eine mögliche Fortsetzung des Projekts" +
      (K.infoBis ? ", längstens bis " + K.infoBis : "") + ". Abmelden kann ich mich jederzeit.";
  }

  function altersSatz() { return "Ich bin mindestens " + mindestalter() + " Jahre alt."; }

  // Feste Beschriftungen in der E-Mail. Die Auswertung liest genau diese wieder ein.
  var FELDER = {
    name: "Name",
    plz: "PLZ",
    verbindung: "Verbindung",
    initiative: "Verein/Initiative",
    info: "Weiter informiert",
    einwilligung: "Einwilligung",
    alter: "Alter"
  };
  var GAESTEBUCH_ANFANG = "===== Gästebuch-Eintrag =====";
  var GAESTEBUCH_ENDE = "===== Ende Gästebuch =====";

  function konfigPlatzhalter() {
    var offen = [];
    (function pruefe(obj, pfad) {
      Object.keys(obj).forEach(function (k) {
        var v = obj[k], p = pfad ? pfad + "." + k : k;
        if (Array.isArray(v)) { if (v.some(platzhalter)) offen.push(p); }
        else if (v && typeof v === "object") pruefe(v, p);
        else if (typeof v === "string" && platzhalter(v)) offen.push(p);
      });
    })(K, "");
    return offen;
  }

  // Brief als HTML (für Website und Übergabeliste)
  function briefHtml() {
    var h = '<p class="brief-anrede">' + esc(B.anrede || "") + "</p>";
    (B.absaetze || []).forEach(function (a) { h += "<p>" + esc(a) + "</p>"; });
    if (B.gruss) h += "<p>" + esc(B.gruss) + "</p>";
    h += '<p class="brief-absender">' + esc(B.ortDatum || "") + "<br>" + esc(B.absender || "") + "</p>";
    return h;
  }

  window.GEMEINSAM = {
    esc: esc, feld: feld, mail: mail, platzhalter: platzhalter,
    anbieterBlock: anbieterBlock, registerZeile: registerZeile, verantwortlichZeile: verantwortlichZeile,
    titel: titel, briefTitel: briefTitel, briefHtml: briefHtml,
    einwilligung: einwilligung, infoEinwilligung: infoEinwilligung,
    altersSatz: altersSatz, mindestalter: mindestalter,
    FELDER: FELDER, GAESTEBUCH_ANFANG: GAESTEBUCH_ANFANG, GAESTEBUCH_ENDE: GAESTEBUCH_ENDE,
    konfigPlatzhalter: konfigPlatzhalter
  };

  document.addEventListener("DOMContentLoaded", function () {
    function alle(sel, fn) { document.querySelectorAll(sel).forEach(fn); }
    alle("[data-name]", function (el) { el.textContent = K.name || "Kaffee&Kelle"; });
    alle("[data-titel]", function (el) { el.textContent = titel(); });
    alle("[data-brieftitel]", function (el) { el.textContent = briefTitel(); });
    alle("[data-stadt]", function (el) { el.textContent = K.stadt || "der Stadt"; });
    alle("[data-empfaenger]", function (el) { el.innerHTML = feld(K.empfaenger); });
    alle("[data-uebergabe]", function (el) { el.innerHTML = feld(K.uebergabe); });
    alle("[data-loeschfrist]", function (el) { el.textContent = K.loeschfrist || ""; });
    alle("[data-infobis]", function (el) { el.textContent = K.infoBis || ""; });
    alle("[data-sammeladresse]", function (el) { el.innerHTML = mail(K.sammelAdresse); });
    alle("[data-mindestalter]", function (el) { el.textContent = mindestalter(); });
    alle("[data-briefpdf]", function (el) { el.setAttribute("href", B.pdf || "offener-brief.pdf"); });
  });
})();
