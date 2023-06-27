# ReviewRiot
2023 záródolgozatom forráskódja.

Dokumentáció a [docs](https://github.com/GitDevla/ReviewRiot/tree/docs) ágban vagy a ~~[honlapon](http://reviewriot.devla.xyz/docs.pdf)~~<sup>1</sup> található.

<sup>1</sup> Weboldal már nem elérhető

## Telepítés és indítás
### Hagyományos
Részletesebb leírás a dokumentációban található.
1. `next.config.js` módosítása adatbázis hitelesítő adatai szerint
2. `scripts/<os>/install`, a dependenciák telepítése és adatbázis inicializálása
3. `scripts/<os>/start-dev`, fejlesztői környezet indítása
4. `scripts/<os>/build-prod & start-prod` éles szerver építése és futtatása


### Docker
Ez nincs dokumentálva mivel ez egy vizsga utáni változtatás a programban. 
```bash
$ docker compose up
```

## Használat
Indítás után a honlap elérhető a `http://localhost:3000` címen