# Lighthouse Church - Landing Page

O pagină de destinație pentru Biserica Lighthouse, destinată adolescenților care se luptă cu dependența de droguri și care scanează un cod QR de pe un poster/flyer din transportul public sau de pe garduri.

## Scopul Principal

Această pagină web servește ca primul punct de contact pentru adolescenții în criză care caută ajutor pentru dependența de droguri și îndrumarea spirituală prin dragostea lui Isus Hristos. Oferim speranță și salvare prin Evanghelia lui Isus într-un mod subtil și primitor.

## Caracteristici

### Design și UX
- **Mobile-first responsive design** - optimizat pentru telefoane mobile
- **Schemă de culori calmantă** - transmite speranță și siguranță
- **Design curat și primitor** - non-intimidant pentru adolescenții în criză
- **Logo proeminente** - poziționat la partea de sus

### Conținut
- **Mesaj empatic creștin** - vorbește direct adolescenților în criză cu dragostea lui Hristos
- **Propunere de valoare clară** - ce oferă Biserica Lighthouse prin Evanghelie
- **Limbaj compassionat** - fără judecată, cu referințe subtile la Isus și salvare
- **Accent pe confidențialitate și rugăciune** - pentru a construi încrederea și speranța

### Formular de Contact
- **Câmpuri minime** - pentru a nu copleși utilizatorii
- **Nume opțional** - pentru confidențialitate
- **Validare de formular** - cu mesaje de eroare prietenoase
- **Asigurare de confidențialitate** - text pentru a construi încrederea
- **Opțiune de urgență** - pentru situații critice

### Accesibilitate
- **Conformitate WCAG** - pentru utilizatori cu dizabilități
- **Suport pentru contrast ridicat** - pentru vizibilitate îmbunătățită
- **Suport pentru mișcare redusă** - pentru utilizatori sensibili
- **Navigare cu tastatura** - pentru accesibilitate completă
- **Etichete ARIA** - pentru cititorii de ecran

### Performanță
- **Încărcare rapidă** - critică pentru utilizatorii mobili în criză
- **Optimizări pentru mobil** - pentru experiență fluidă
- **Fonturi preîncărcate** - pentru performanță îmbunătățită
- **CSS critic inline** - pentru încărcare mai rapidă

## Tehnologii Utilizate

- **Vue.js 3** - Framework JavaScript progresiv
- **Vite** - Tool de build rapid
- **CSS3** - Cu variabile CSS și design responsive
- **HTML5** - Semantic și accesibil

## Instalare și Rulare

### Cerințe
- Node.js (versiunea 16 sau mai nouă)
- npm sau yarn

### Pași de instalare

1. **Instalează dependențele:**
   ```bash
   npm install
   ```

2. **Rulează serverul de dezvoltare:**
   ```bash
   npm run dev
   ```

3. **Construiește pentru producție:**
   ```bash
   npm run build
   ```

4. **Previzualizează build-ul de producție:**
   ```bash
   npm run preview
   ```

## Structura Proiectului

```
lighthouse-church-landing/
├── public/
│   └── favicon.svg          # Favicon cu iconița de far
├── src/
│   ├── components/
│   │   ├── LandingPage.vue  # Componenta principală
│   │   └── ContactForm.vue  # Formularul de contact
│   ├── App.vue              # Componenta rădăcină
│   ├── main.js              # Punctul de intrare
│   └── style.css            # Stiluri globale
├── index.html               # Template HTML principal
├── package.json             # Dependențe și scripturi
├── vite.config.js           # Configurația Vite
└── README.md                # Această documentație
```

## Personalizare

### Culori
Paleta de culori este definită în `src/style.css` folosind variabile CSS:
- `--primary-blue`: Albastrul principal (#4A90E2)
- `--soft-blue`: Albastru moale (#7BB3F0)
- `--warm-white`: Alb cald (#FEFEFE)

### Conținut
Toate textele sunt în română și pot fi modificate în:
- `src/components/LandingPage.vue` - Mesajele principale
- `src/components/ContactForm.vue` - Textele formularului

### Informații de Contact
Actualizează informațiile de contact în `src/components/ContactForm.vue`:
- Numărul de telefon
- Adresa de email
- Alte metode de contact

## Considerații pentru Producție

### Securitate
- Implementează validarea pe server pentru formularul de contact
- Folosește HTTPS pentru toate comunicațiile
- Implementează protecție CSRF pentru formulare

### Monitorizare
- Adaugă Google Analytics sau o alternativă pentru a urmări utilizarea
- Implementează logging pentru erorile JavaScript
- Monitorizează performanța paginii

### SEO
- Adaugă meta tags relevante
- Implementează schema markup pentru organizații
- Optimizează pentru cuvinte cheie relevante în română

## Suport și Contribuții

Pentru întrebări sau îmbunătățiri, contactează echipa de dezvoltare a Bisericii Lighthouse.

## Licență

MIT License - Vezi fișierul LICENSE pentru detalii.
