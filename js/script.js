// Function to create and display 9 gallery items using APOD data
function displayGallery(apodData) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  apodData.forEach(item => {
    if (item.media_type !== 'image') return;

    // Create gallery item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';

    // Create image
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.title;
    img.style.maxWidth = '100%';

    // Open modal on click
    img.addEventListener('click', () => openModal(item));

    // Title and date
    const title = document.createElement('h3');
    title.textContent = item.title;
    const date = document.createElement('p');
    date.textContent = `Date: ${item.date}`;

    itemDiv.appendChild(img);
    itemDiv.appendChild(title);
    itemDiv.appendChild(date);
    gallery.appendChild(itemDiv);
  });

  // Show placeholder if no images
  if (gallery.children.length === 0) {
    gallery.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-icon">🔭</div>
        <p>Select a date range and click \"Get Space Images\" to explore the cosmos!</p>
      </div>
    `;
  }
}

// Function to open the modal with full-size image and details
function openModal(item) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('apod-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'apod-modal';
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
      <div style="background:#fff;padding:20px;max-width:600px;width:90%;border-radius:8px;position:relative;">
        <span id="close-modal" style="position:absolute;top:10px;right:20px;cursor:pointer;font-size:24px;">&times;</span>
        <img id="apod-modal-img" src="" alt="" style="width:100%;max-height:400px;object-fit:contain;" />
        <h2 id="apod-modal-title"></h2>
        <p id="apod-modal-date"></p>
        <p id="apod-modal-explanation"></p>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal on click of X or outside content
    modal.addEventListener('click', function(e) {
      if (e.target.id === 'apod-modal' || e.target.id === 'close-modal') {
        modal.style.display = 'none';
      }
    });
  }

  // Fill modal with image info
  document.getElementById('apod-modal-img').src = item.hdurl || item.url;
  document.getElementById('apod-modal-img').alt = item.title;
  document.getElementById('apod-modal-title').textContent = item.title;
  document.getElementById('apod-modal-date').textContent = `Date: ${item.date}`;
  document.getElementById('apod-modal-explanation').textContent = item.explanation;
  modal.style.display = 'flex';
}
// ...end of script.js

// Example: Fetch and display gallery for the default date range



// NASA APOD API key
const API_KEY = 'B39OOa3nTPCm3unBxKujOMS1nia6oohXjzxucBGb';

// Get the date input elements and the button
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('.filters button');

// Set up the date pickers (from dateRange.js)
setupDateInputs(startInput, endInput);


// When the button is clicked, update the gallery
getImagesButton.addEventListener('click', updateGallery);

// Also update gallery when dates change
startInput.addEventListener('change', updateGallery);
endInput.addEventListener('change', updateGallery);

// Show images on page load
updateGallery();

// Function to update the gallery based on selected dates
async function updateGallery() {
  // Get the selected start and end dates
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Only fetch if both dates are selected
  if (!startDate || !endDate) return;

  // Array of fun space facts
  const spaceFacts = [
    "Did you know? A day on Venus is longer than a year on Venus!",
    "Did you know? Neutron stars can spin at a rate of 600 rotations per second!",
    "Did you know? There are more trees on Earth than stars in the Milky Way!",
    "Did you know? One million Earths could fit inside the Sun!",
    "Did you know? Space is completely silent because there is no air to carry sound!",
    "Did you know? The footprints on the Moon will be there for millions of years!",
    "Did you know? Jupiter has 95 known moons!",
    "Did you know? The hottest planet in our solar system is Venus!",
    "Did you know? The International Space Station travels at 28,000 km/h!",
    "Did you know? Saturn could float in water because it is mostly gas!"
  ];
  // Pick a random fact
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

  // Show loading message with random fact
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = `
    <div class="loading-message">
      <p style="color: #fff;">Loading space images...</p>
      <p style="color: #fff; font-size: 1rem; margin-top: 10px;">${randomFact}</p>
    </div>
  `;

  // Fetch APOD data and display the gallery
  const apodData = await fetchAPODData(startDate, endDate);
  displayGallery(apodData);
}
// Function to fetch APOD data for a date range
async function fetchAPODData(startDate, endDate) {
  // Build the API URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    return [];
  }
}
// ...existing code...


// ...existing code...

// ...existing code...
// Example usage: fetch data when dates are selected
// (You can call this function after the user picks dates)
//
// Example:
// fetchAPODData('2025-06-28', '2025-07-06').then(data => {
//   console.log(data); // Array of APOD objects
// });
