# Ergänzende Vorlage für Einzelprojekt #
Diese Vorlage zeigt, wie Sie ein Deno-Projekt komplett in TypeScript (Front- und Backend) umsetzen können.
Zudem wird gezeigt, wie Sie mehre Pages per Link miteinander Verknüpfen können (Overview- und Detail- Ansicht).

## Deno-Installation ##
Ich werde hier nur die installation unter Windows erklären.
Weitere Infos unter: https://deno.land/manual/getting_started/installation

1) Powershell als Administrator starten
2) Folgender Befehl ausführen: 
    iwr https://deno.land/x/install/install.ps1 -useb | iex
3) Testen mit dem Befehl:
    deno --version

## Applikations-Starten ##
Achtung:
Deno muss von dem Hauptordner gestartet werden.
Dies kann man erkennen wenn die Datei `start.bat` oder `README.md` vorhanden sind.

1) Powershell als Administrator starten
2) Befehl eingeben:
    cmd
3) Zum Haputordner navigieren.
4) Mit folgendem Befehl kann nun der Server gestartet werden:
    start.bat

Achtung:
Der Server wird mit dem Parameter "--allow-all" gestartet!


Alternativ können Sie die beiden Zeilen des Scripts auch manuell ausführen:

`deno run --allow-read --allow-write --unstable ./tools/builder.ts`

(transpiliert und bundled die Frontend-JavaScript-Datei).

`deno run --allow-net --allow-read ./src/webserver.ts`

(startet den Webserver)
## Applikation aufrufen ##
Nachdem die Applikation gestart wurde, können Sie diese unter `http://localhost:8000` aufrufen
