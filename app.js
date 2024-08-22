const viewsList = document.querySelector('#views');
const container = document.getElementById('timing');
let selectedTimeframe = 'daily'; // Default to daily

// Define colors for each activity (if you want to use them)
const colors = {
    "Work": "hsl(15, 100%, 70%)",
    "Play": "hsl(195, 74%, 62%)",
    "Study": "hsl(348, 100%, 68%)",
    "Exercise": "hsl(145, 58%, 55%)",
    "Social": "hsl(264, 64%, 52%)",
    "Self Care": "hsl(43, 84%, 65%)"
};

// Event listener for views list (timeframe buttons)
viewsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        
        selectedTimeframe = event.target.innerHTML;
        console.log('Selected timeframe:', selectedTimeframe);
        updateDisplay();
    }
});

// Function to fetch data and update the display
const updateDisplay = () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            container.innerHTML = '';

            // Only append items if there is data
            if (data.length) {
                data.forEach((item) => {
                    appendItem(item);
                });
            } else {
                // Optionally handle the case where there is no data
                container.innerHTML = '<li>No data available</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            container.innerHTML = '<li>Error loading data</li>';
        });
};

const appendItem = (item) => {
    const todo = document.createElement('LI');
    
    // Determine the timeframe to use
    const timeframeData = item.timeframes[selectedTimeframe];
    
    // Create the innerHTML for the list item
    todo.innerHTML = `
        <div class="back">
            <div class="front">
                <h2>${item.title}</h2>
                <img src="images/icon-ellipsis.svg" alt="">
                <h1>${timeframeData.current}hrs</h1>
                <p>Last <span>${selectedTimeframe}</span> - <span>${timeframeData.previous}hrs</span></p>
            </div>
        </div>`;
    
    // Apply the background color based on the item title
    const backDiv = todo.querySelector('.back');
    backDiv.style.backgroundColor = colors[item.title];
    
    // Set background image at the top left corner using SVG
    backDiv.style.backgroundImage = `url('images/icon-${item.title.toLowerCase().replace(' ', '-')}.svg')`;
    backDiv.style.backgroundPosition = 'top right';
    backDiv.style.backgroundRepeat = 'no-repeat';

    container.appendChild(todo);
};

// Initial display
updateDisplay();
    