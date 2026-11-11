// ============================================================
//  KONFIGURATION – hier alles anpassen, sonst nichts anfassen
//  Alles in [eckigen Klammern] sind Platzhalter, die ihr
//  ersetzen müsst. Solange sie drinstehen, erscheinen sie auf
//  der Seite gelb markiert, und oben erscheint ein Warnhinweis.
//  Den Text des Briefs findet ihr in brief.js.
// ============================================================
window.KONFIG = {

  // ---------- Das Projekt ----------

  name: "Kaffee&Kelle",
  artikel: "",                       // "Der", "Das", "Die" oder "" für keinen
  stadt: "Marburg",

  // An wen Brief und Unterschriften übergeben werden. Steht so in der Einwilligung.
  empfaenger: "den Magistrat der Universitätsstadt Marburg",

  // Wann ihr übergeben wollt (Freitext, erscheint auf der Seite)
  uebergabe: "Am Donnerstag den 12.11.2026",

  // Postleitzahlen der Stadt (für „davon aus Marburg“ in der Auswertung)
  plzStadt: ["35037", "35039", "35041", "35043"],

  // Optional: Zwischenstand auf der Seite zeigen („214 sind schon dabei“). 0 = nicht anzeigen.
  // Von Hand aktualisieren, z. B. nach jeder Auswertung.
  zaehler: { anzahl: 0, stand: "" },   // z. B. { anzahl: 214, stand: "20. November" }

  mindestalter: 16,

  // ---------- Fristen ----------

  // So lange nach der Übergabe löscht ihr Unterschriften, E-Mails und Listen
  loeschfrist: "drei Monate",

  // Bis wann ihr Leute, die „weiter informiert“ werden wollen, höchstens anschreibt.
  // Danach (oder bei Abmeldung) wird ihre Adresse gelöscht.
  infoBis: "Ende 2028",

  // ---------- Eure Sammeladresse ----------
  // E-Mail-Adressen bitte mit (at) statt @ schreiben – das schützt vor Spam-Programmen.
  // Auf der Seite erscheinen sie ganz normal und klickbar.

  // An diese Adresse gehen die Unterschriften. NICHT die Stadt!
  sammelAdresse: "leitung(at)solidarburg.de",

  // Wer das Postfach technisch betreibt (für den Datenschutzhinweis, mit AVV).
  // Leer lassen ("") = „Unser Sammelpostfach betreiben wir selbst.“
  mailanbieter: "Hetzner Online GmbH, Gunzenhausen",

  // Betreff der E-Mail. {titel} = Name von oben, {name} = Name der Person
  betreff: "Ich unterschreibe den offenen Brief von {titel} – {name}",

  // ---------- Impressum und Datenschutz ----------
  // Der Verein, der die Aktion trägt.
  anbieter: {
    name:            "Solidarburg Nachbarschaftshilfe Marburg e.V.",
    vertreten:       "Vertreten durch den Vorstand: Dr. Filipp Bezold, Dr. Sabine Schock, Micha Brandt",
    postfach:        "Postfach 200583",
    ort:             "35018 Marburg",
    registergericht: "Amtsgericht Marburg",
    registernummer:  "VR 5556",
    email:           "kontakt(at)solidarburg.de",
    telefon:         ""   // optional
  },

  // Datenschutzbeauftragte/r des Vereins – nur ausfüllen, wenn es eine/n gibt.
  // Erscheint dann im Datenschutzhinweis. Leer lassen = Abschnitt entfällt.
  datenschutzbeauftragter: {
    name:  "",
    email: ""        // ebenfalls mit (at)
  },

  // Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV) und „V.i.S.d.P.“ auf dem Aushang.
  // Muss eine natürliche Person sein, vom Verein benannt. Anschrift leer = Vereinsanschrift.
  verantwortlich: {
    name:      "Dr. Filipp Bezold",
    anschrift: ""
  },

  datenschutzStand: "November 2026",

  // Öffentliche Adresse der Seite (für QR-Code). Leer = automatisch.
  seitenAdresse: ""
};
