document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the 'fade-in' class
    const observerElements = document.querySelectorAll('.fade-in');

    // Create an Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger CSS animation
                entry.target.classList.add('visible');
                // Unobserve the element once it has faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to each element
    observerElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
const API_KEY = "11eb2206320f90acef07072d52c0e952";

async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        // ✅ Check error FIRST
        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerHTML =
                "❌ City not found";
            return;
        }

        // 🌤 Get weather type
        const icon = data.weather[0].main;

        // 🎨 Convert to emoji
        let iconSymbol = "☁️";

        if (icon === "Clear") iconSymbol = "☀️";
        else if (icon === "Rain") iconSymbol = "🌧";
        else if (icon === "Clouds") iconSymbol = "☁️";
        else if (icon === "Snow") iconSymbol = "❄️";
        else if (icon === "Thunderstorm") iconSymbol = "⛈";
        if (icon === "Rain") {
   decision = "🌧 No irrigation needed";
} else if (data.main.temp > 30) {
   decision = "🔥 Increase irrigation";
}
        // 🖥 Show result
        const weatherHTML = `
            <h3>${data.name}</h3>
            <p>${iconSymbol} Condition: ${icon}</p>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;

        document.getElementById("weatherResult").innerHTML = weatherHTML;
        document.getElementById("weatherResult").classList.add("show");

    } catch (error) {
        console.log(error);
        document.getElementById("weatherResult").innerHTML =
            "⚠️ Error fetching data";
    }
}
