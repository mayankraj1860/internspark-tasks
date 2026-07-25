const apiKey = "trilogy";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMsg = document.getElementById("errorMsg");
const resultState = document.getElementById("resultState");

const poster = document.getElementById("poster");
const title = document.getElementById("title");
const year = document.getElementById("year");
const type = document.getElementById("type");
const rating = document.getElementById("rating");
const plot = document.getElementById("plot");
const platformsList = document.getElementById("platformsList");
const categoryTitle = document.getElementById("categoryTitle");

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
	document.documentElement.setAttribute("data-theme", "light");
	themeIcon.className = "fa-solid fa-sun";
}

themeToggle.addEventListener("click", () => {
	let theme = document.documentElement.getAttribute("data-theme");
	if (theme === "light") {
		document.documentElement.removeAttribute("data-theme");
		localStorage.setItem("theme", "dark");
		themeIcon.className = "fa-solid fa-moon";
	} else {
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
		themeIcon.className = "fa-solid fa-sun";
	}
});

// Top 20 Global Trending Titles (Movies, Series & Standup Specials)
const top20Trending = [
	"Panchayat",
	"Zakir Khan: Tathastu",
	"Bo Burnham: Inside",
	"Interstellar",
	"Anubhav Singh Bassi",
	"Breaking Bad",
	"Mirzapur",
	"The Dark Knight",
	"Chernobyl",
	"Ricky Gervais: Armageddon",
	"Inception",
	"KGF Chapter 2",
	"Squid Game",
	"Dave Chappelle: The Closer",
	"Farzi",
	"Oppenheimer",
	"Dangal",
	"Avatar",
	"3 Idiots",
	"Abhishek Upmanyu",
];

// Category Lists
const categoryData = {
	"Top 20 Worldwide": top20Trending,
	"Standup Comedy": [
		"Bo Burnham: Inside",
		"Zakir Khan: Tathastu",
		"Anubhav Singh Bassi",
		"Ricky Gervais: Armageddon",
		"Dave Chappelle: The Closer",
		"Abhishek Upmanyu",
		"Hannah Gadsby: Nanette",
	],
	"Web Series": [
		"Panchayat",
		"Mirzapur",
		"Breaking Bad",
		"Chernobyl",
		"Farzi",
		"Squid Game",
	],
	Hollywood: [
		"Interstellar",
		"The Dark Knight",
		"Inception",
		"Oppenheimer",
		"Avatar",
		"The Godfather",
	],
	Bollywood: ["3 Idiots", "Dangal", "Pathaan", "Jawan", "Shershaah", "Stree 2"],
	Action: [
		"The Dark Knight",
		"Inception",
		"KGF Chapter 2",
		"Pathaan",
		"Avatar",
	],
	Comedy: [
		"Panchayat",
		"3 Idiots",
		"Zakir Khan: Tathastu",
		"Bo Burnham: Inside",
		"Deadpool",
	],
	Crime: [
		"Breaking Bad",
		"Mirzapur",
		"The Godfather",
		"Chernobyl",
		"Pulp Fiction",
	],
	Drama: [
		"Panchayat",
		"Dangal",
		"Chernobyl",
		"Oppenheimer",
		"The Shawshank Redemption",
	],
	"Sci-Fi": ["Interstellar", "Inception", "Avatar", "The Matrix", "Tenet"],
	Thriller: ["Mirzapur", "Inception", "Se7en", "Shutter Island", "Parasite"],
};

// Platform Custom Mapping Rules
function getOTTPlatforms(titleName, genreStr) {
	const t = titleName.toLowerCase();
	const g = genreStr.toLowerCase();
	const platforms = [];

	if (
		t.includes("zakir") ||
		t.includes("panchayat") ||
		t.includes("mirzapur") ||
		t.includes("farzi")
	) {
		platforms.push({
			name: "Amazon Prime Video",
			class: "ott-prime",
			icon: "fa-video",
			url: "https://www.primevideo.com",
		});
	} else if (
		t.includes("bo burnham") ||
		t.includes("ricky gervais") ||
		t.includes("chappelle") ||
		t.includes("breaking bad") ||
		t.includes("squid game") ||
		t.includes("hannah")
	) {
		platforms.push({
			name: "Netflix",
			class: "ott-netflix",
			icon: "fa-film",
			url: "https://www.netflix.com",
		});
	} else if (
		t.includes("bassi") ||
		t.includes("upmanyu") ||
		g.includes("stand-up")
	) {
		platforms.push({
			name: "YouTube",
			class: "ott-youtube",
			icon: "fa-youtube",
			url: "https://www.youtube.com",
		});
		platforms.push({
			name: "SonyLIV",
			class: "ott-sonyliv",
			icon: "fa-tv",
			url: "https://www.sonyliv.com",
		});
	} else {
		platforms.push({
			name: "Netflix",
			class: "ott-netflix",
			icon: "fa-film",
			url: "https://www.netflix.com",
		});
		platforms.push({
			name: "Amazon Prime",
			class: "ott-prime",
			icon: "fa-video",
			url: "https://www.primevideo.com",
		});
	}

	return platforms;
}

async function searchMedia(query) {
	if (!query.trim()) return;

	loadingState.classList.add("active");
	resultState.classList.remove("active");
	errorState.classList.remove("active");

	try {
		const res = await fetch(
			`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`,
		);
		const data = await res.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "No title found with that name.");
		}

		title.innerText = data.Title;
		year.innerText = data.Year;
		type.innerText = data.Type;
		rating.innerHTML = `<i class="fa-solid fa-star"></i> ${data.imdbRating !== "N/A" ? data.imdbRating : "8.8"}`;
		plot.innerText =
			data.Plot !== "N/A"
				? data.Plot
				: "Top-rated title available on digital platforms.";

		poster.src =
			data.Poster !== "N/A"
				? data.Poster
				: "https://via.placeholder.com/300x450/161b22/ffffff?text=Top+Rated";

		const platforms = getOTTPlatforms(data.Title, data.Genre || "");
		platformsList.innerHTML = "";
		platforms.forEach((p) => {
			const a = document.createElement("a");
			a.className = `ott-badge ${p.class}`;
			a.href = p.url;
			a.target = "_blank";
			a.innerHTML = `<i class="fa-solid ${p.icon}"></i> ${p.name}`;
			platformsList.appendChild(a);
		});

		loadingState.classList.remove("active");
		resultState.classList.add("active");
	} catch (err) {
		loadingState.classList.remove("active");
		errorMsg.innerText = err.message;
		errorState.classList.add("active");
	}
}

function quickSearch(titleName) {
	searchInput.value = titleName;
	searchMedia(titleName);
	window.scrollTo({ top: 0, behavior: "smooth" });
}

// Carousel Controls & Auto Sliding
let carouselPosition = 0;
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function slideCarousel(direction) {
	const cardWidth = 155; // Card width + gap
	const visibleWidth = document.getElementById("carouselContainer").offsetWidth;
	const maxPosition = -(top20Trending.length * cardWidth - visibleWidth);

	if (direction === "next") {
		carouselPosition -= cardWidth * 2;
		if (carouselPosition < maxPosition) carouselPosition = 0;
	} else {
		carouselPosition += cardWidth * 2;
		if (carouselPosition > 0) carouselPosition = maxPosition;
	}

	track.style.transform = `translateX(${carouselPosition}px)`;
}

nextBtn.addEventListener("click", () => slideCarousel("next"));
prevBtn.addEventListener("click", () => slideCarousel("prev"));

// Auto Slide every 4 seconds
setInterval(() => slideCarousel("next"), 4000);

// Populate Carousel
async function loadCarousel() {
	track.innerHTML = "";
	for (const titleName of top20Trending) {
		try {
			const res = await fetch(
				`https://www.omdbapi.com/?t=${encodeURIComponent(titleName)}&apikey=${apiKey}`,
			);
			const data = await res.json();

			if (data.Response === "True") {
				const card = document.createElement("div");
				card.className = "trending-card";
				card.onclick = () => quickSearch(data.Title);

				card.innerHTML = `
          <span class="tag-quality">4K</span>
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/150"}" alt="${data.Title}">
          <h4>${data.Title}</h4>
          <p>${data.Year} • <i class="fa-solid fa-star" style="color:#d4a72c;"></i> ${data.imdbRating !== "N/A" ? data.imdbRating : "8.8"}</p>
        `;
				track.appendChild(card);
			}
		} catch (e) {
			console.error(e);
		}
	}
}

// Filter Category
function filterCategory(categoryName) {
	const buttons = document.querySelectorAll(".cat-btn");
	buttons.forEach((btn) => {
		btn.classList.remove("active");
		if (btn.innerText.includes(categoryName)) {
			btn.classList.add("active");
		}
	});

	categoryTitle.innerHTML = `<i class="fa-solid fa-list-check"></i> ${categoryName} Catalog`;
	loadTrendingGrid(
		categoryData[categoryName] || categoryData["Top 20 Worldwide"],
	);
}

// Populate Grid Catalog
async function loadTrendingGrid(list = categoryData["Top 20 Worldwide"]) {
	const trendingGrid = document.getElementById("trendingGrid");
	if (!trendingGrid) return;
	trendingGrid.innerHTML = "";

	for (const titleName of list) {
		try {
			const res = await fetch(
				`https://www.omdbapi.com/?t=${encodeURIComponent(titleName)}&apikey=${apiKey}`,
			);
			const data = await res.json();

			if (data.Response === "True") {
				const card = document.createElement("div");
				card.className = "trending-card";
				card.onclick = () => quickSearch(data.Title);

				card.innerHTML = `
          <span class="tag-quality">1080p</span>
          <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/150"}" alt="${data.Title}">
          <h4>${data.Title}</h4>
          <p>${data.Year} • <i class="fa-solid fa-star" style="color:#d4a72c;"></i> ${data.imdbRating !== "N/A" ? data.imdbRating : "8.8"}</p>
        `;
				trendingGrid.appendChild(card);
			}
		} catch (e) {
			console.error(e);
		}
	}
}

searchBtn.addEventListener("click", () => searchMedia(searchInput.value));
searchInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") searchMedia(searchInput.value);
});

// Initial Load
loadCarousel();
loadTrendingGrid();
