/*=========================================
        THEME TOGGLE
=========================================*/

const themeToggle = document.getElementById("themeToggle");

const body = document.body;

const icon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
	body.classList.add("light-mode");

	icon.classList.remove("bi-moon-stars");

	icon.classList.add("bi-sun");
}

themeToggle.addEventListener("click", () => {
	body.classList.toggle("light-mode");

	if (body.classList.contains("light-mode")) {
		icon.classList.remove("bi-moon-stars");

		icon.classList.add("bi-sun");

		localStorage.setItem("theme", "light");
	} else {
		icon.classList.remove("bi-sun");

		icon.classList.add("bi-moon-stars");

		localStorage.setItem("theme", "dark");
	}
});

/*=========================================
        CONTACT FORM
=========================================*/

function handleSubmit(event) {
	event.preventDefault();

	const message = document.getElementById("formMsg");

	message.innerHTML = "✅ Thank you! Your message has been received.";

	message.style.color = "#00ff88";

	event.target.reset();

	setTimeout(() => {
		message.innerHTML = "";
	}, 4000);
}

/*=========================================
        ACTIVE NAVBAR
=========================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
	let current = "";

	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 120;

		const sectionHeight = section.clientHeight;

		if (pageYOffset >= sectionTop) {
			current = section.getAttribute("id");
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove("active");

		if (link.getAttribute("href") === "#" + current) {
			link.classList.add("active");
		}
	});
});

/*=========================================
        SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(
	".glassy,.project-card,.skill-chip",
);

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = "1";

				entry.target.style.transform = "translateY(0px)";
			}
		});
	},

	{
		threshold: 0.15,
	},
);

revealElements.forEach((el) => {
	el.style.opacity = "0";

	el.style.transform = "translateY(40px)";

	el.style.transition = "all .7s ease";

	observer.observe(el);
});

/*=========================================
        SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const target = document.querySelector(this.getAttribute("href"));

		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
			});
		}
	});
});

/*=========================================
        PAGE LOADER
=========================================*/

window.addEventListener("load", () => {
	document.body.style.opacity = "1";
});

document.body.style.opacity = "0";

document.body.style.transition = ".5s";

/*=========================================
        CONSOLE MESSAGE
=========================================*/

console.log("Portfolio Developed by Mayank Raj");
