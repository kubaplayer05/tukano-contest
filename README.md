
## Uruchomienie Projektu

Aby uruchomić projekt, należy mieć docker-compose w przeciwnym razie należy samodzielnie
uruchomić bazę danych (mongodb)

### Kopiujemy projekt z githuba
```
git clone https://github.com/kubaplayer05/tukano-contest.git
cd tukano-contest
```

### Kopiujemy plik.env w głównym folderze projektu
```
cp .env.example .env 
cp .env ./backend/.env
```

### Uruchamiamy bazę danych (mongodb)
```
docker-compose up
```

### Uruchamiamy backend aplikacji
```
cd ./backend 
npm install
npm run build 
npm run start
```

### Uruchamiamy frontend aplikacji
```
cd ./frontend
npm install
npm run build 
npm run start
```

Aplikacja znajduję się domyślnie na http://localhost:3000
