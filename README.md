# Quran Application

A modern, feature-rich Progressive Web Application (PWA) for reading and studying the Holy Quran with multiple translations, tajweed colors, audio recitation, and daily reading tracking.

## Features

### 📖 Quran Reader
- **Page-by-page reading**: Navigate through all 604 pages of the Mushaf
- **Multiple font styles**: Uthmanic Hafs, KFGQPC Hafs Smart, and more
- **Tajweed colors**: Visual highlighting of tajweed rules for proper recitation
- **Swipe navigation**: Navigate between pages with touch gestures
- **Surah navigation**: Quick jump to any surah via dropdown menu
- **Page and Juz information**: Display current page number and Juz

### 🌍 Translations
Support for 20+ translation languages including:
- Arabic (Tafsir Muyassar, I'rab al-Muyassar)
- English (Abridged Explanation)
- French, Spanish, German, Italian
- Turkish, Persian, Urdu, Hindi
- Bengali, Indonesian, Japanese, Chinese
- Kurdish, Bosnian, Russian, Greek
- And more...

### 🔊 Audio Features
- Integrated audio recitation player
- Adjustable playback speed
- Repeat ayah functionality
- Synchronized highlighting with audio playback

### 📚 Additional Features
- **Bookmarks/Favorites**: Save and manage favorite ayahs
- **Search**: Full-text search across the Quran
- **Dark Mode**: Eye-friendly dark theme
- **Daily Reading Tracker (Khatma)**: Track your daily Quran reading progress through all 604 pages
- **Font Size Adjustment**: Customize text size for comfortable reading
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 📱 Progressive Web App (PWA)
- Installable on mobile and desktop devices
- Offline support via service worker
- App-like experience with standalone mode

## Project Structure

```
Qu-main/
├── index.html              # Main Quran reader page
├── kitma.html             # Daily reading tracker (Khatma)
├── search.html            # Search functionality
├── setting.html           # Settings page
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker for offline support
├── quran-data.js          # Quran metadata and structure
├── hafs-wasat/           # Mushaf page images (604 pages)
├── translite/            # Translation JSON files
├── QuranSound-main/      # Audio recitation module
├── assets/               # Fonts and additional data files
└── README.md             # This file
```

## Getting Started

### Installation

1. **Clone or download** this repository

2. **Set up a local web server** (required for proper functionality):
   
   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npm install -g http-server
   http-server -p 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**: Navigate to `http://localhost:8000`

### Direct File Access
⚠️ **Note**: Opening HTML files directly in the browser may cause issues due to CORS restrictions when loading JSON data files. A local web server is strongly recommended.

## Usage

### Main Reader (index.html)
- **Navigation**: Use swipe gestures or navigation buttons to move between pages
- **Surah Selection**: Click the surah dropdown to jump to any surah
- **Translation Toggle**: Use the translation button to show/hide translations
- **Audio Playback**: Click on ayahs to play audio recitation
- **Bookmarks**: Long press or use the bookmark button to save favorite ayahs

### Daily Reading Tracker (kitma.html)
- View all 604 pages in a calendar-like grid
- Click any page number to open and read
- Mark pages as read to track your progress
- Swipe left/right to navigate between pages in the modal view
- Your progress is saved locally in your browser

### Search (search.html)
- Enter search terms to find specific verses
- Results show surah name, ayah number, and text
- Click results to navigate directly to the verse

### Settings (setting.html)
- **Translation Language**: Select from 20+ available languages
- **Font Size**: Adjust text size (14px - 32px)
- **Dark Mode**: Toggle between light and dark themes
- **Audio Settings**: Configure playback speed and repeat options
- **Tajweed Colors**: Enable/disable tajweed rule highlighting

## Technical Details

### Technologies Used
- **HTML5/CSS3**: Modern web standards
- **JavaScript (Vanilla)**: No framework dependencies
- **jQuery**: Used for some UI interactions
- **Service Workers**: For PWA offline functionality
- **LocalStorage**: For user preferences and bookmarks
- **Web Fonts**: Custom Arabic fonts for authentic rendering

### Data Sources
- Quran text: QPC Hafs format
- Tajweed data: QPC Hafs Tajweed
- Translations: Multiple sources (see translite/ directory)
- Metadata: Based on Tanzil.info Quran metadata

### Browser Support
- Modern browsers with ES6 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Configuration

### Translation Languages
Add or modify translations by editing files in the `translite/` directory. The application supports JSON format translation files.

### Fonts
Custom Arabic fonts are included:
- Uthmanic Hafs v2.0
- KFGQPC Hafs Smart
- Surah name fonts

### Service Worker
The service worker (`sw.js`) caches essential files for offline functionality. Update the cache version when making significant changes.

## License

This project uses Quran data from Tanzil.info which is licensed under Creative Commons Attribution 3.0.

## Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

## Acknowledgments

- Quran text and metadata: [Tanzil.info](https://tanzil.net)
- Fonts: Various open-source Arabic font projects
- Translations: Multiple translation sources (see individual files for credits)

## Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**May this application be a source of blessing and guidance. Barakallahu feekum.**
