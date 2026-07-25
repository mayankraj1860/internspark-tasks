# StreamFinder - Global Movies, Web Series & Standup Catalog (Task 3)

**StreamFinder** is a feature-rich, fully responsive single-page web application designed to help users explore top-rated movies, web series, and stand-up comedy specials worldwide, along with their official streaming platform availability.

🌐 **Live Demo:** [https://mayankraj1860.github.io/task3-api-project/](https://mayankraj1860.github.io/task3-api-project/)

---

## ✨ Key Features & Enhancements

- **Full Screen Responsive Layout:** Optimized container width (up to 1400px) that utilizes screen space across mobile devices, tablets, laptops, and ultra-wide desktop monitors.
- **Top 20 Trending Hero Carousel:** An interactive, auto-moving carousel slider featuring 20 globally trending movies, web series, and stand-up specials.
- **REST API Data Integration:** Uses `async/await` to fetch live movie titles, IMDb ratings, poster art, release years, and plot summaries via the public OMDb REST API.
- **Stand-up Comedy & OTT Mapping:** Maps content directly to official platforms including Netflix, Amazon Prime Video, Disney+ Hotstar, YouTube, and SonyLIV.
- **Category & IMDb Genre Navigation:** Includes category filters for Web Series, Bollywood, Hollywood, Standup Specials, as well as an IMDb Genre dropdown menu.
- **Dark & Light Mode Toggle:** Smooth theme switcher with CSS variable overrides and `localStorage` state persistence.
- **Error & Loading Indicators:** Custom CSS spinner animation during API fetch operations and clean error handling for invalid search queries.

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Modern Flexbox, CSS Grid, and custom CSS variables for high-contrast dark/light mode execution.
- **JavaScript (ES6+):** Async Fetch API, DOM manipulation, Carousel Slider logic, and Event Listeners.
- **Font Awesome 6:** Vector icons for streaming badges and UI navigation.
- **OMDb API:** Public RESTful web service for movie and television metadata.

---

## 📂 Project Directory Structure

```text
task3-api-project/
├── index.html     # Application structure & HTML markup
├── style.css      # CSS variables, responsive grids, and carousel styling
├── script.js     # API fetch requests, theme toggling, and carousel logic
└── README.md      # Project documentation
```
