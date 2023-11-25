      
	 
	 
	    let gameInterval;
        let correctClicks = 0;
        let missedClicks = 0;
        let counterElement;
        let missedCounterElement;


        
        document.addEventListener('DOMContentLoaded', function() {
        	counterElement = document.getElementById('counter');
        	missedCounterElement = document.getElementById('missedCount'); // Corrected ID
        	const gridContainer = document.getElementById('gridContainer');
        	
			// The below are the total number of columns and rows in the grid
			const totalColumns = 50; // Defiend manually
        	const totalRows = 50; // Defined manually
        	const fullGrid = []; // This will be a 2D array of grid items

        	function getRandomNumber(max) {
        		return Math.floor(Math.random() * max);
        	}

        	function initializeGrid() { // This function initializes a grid of individuals squares
        		for (let row = 0; row < totalRows; row++) { // A loop that runs for the equivilent amount of rows  
        			fullGrid[row] = []; // The grid is refferenced as a 2D array, so this allows for index row to be an array
        			for (let col = 0; col < totalColumns; col++) {
        				const gridItem = document.createElement('div'); // Initalizes the gridItem variable to create a div element
        				gridItem.className = 'grid-item'; // Assigns gridItem the grid-item CSS class
        				gridItem.addEventListener('click', handleGridItemClick); // Assigning gridItem an event listner, upon that event, JS will run the handleGridItemClick function
        				fullGrid[row][col] = gridItem; // Assigns [row][col] to gridItem object this allows JS to reference the gridItem
        				gridContainer.appendChild(gridItem); // This adds gridItem visually to the DOM
        			}
        		}
        	}

        	function lightUpRandomSquare() {
        		const randomRow = getRandomNumber(totalRows);
        		const randomCol = getRandomNumber(totalColumns);
        		const gridItem = fullGrid[randomRow][randomCol];
        		gridItem.classList.add('active');
        		gridItem.clicked = false;
        		setTimeout(() => {
        			gridItem.classList.remove('active');
        			// Increment the missed clicks counter and update the UI
        			if (!gridItem.clicked) {
        				missedClicks++;
        				missedCounterElement.textContent = missedClicks; // Corrected element
        			}
        		}, 1000);
        	}

        	function handleGridItemClick(event) {
        		if (event.target.classList.contains('active')) {
        			correctClicks++;
        			counterElement.textContent = correctClicks;
        			// Remove 'active' class and decrease opacity immediately for correct clicks
        			event.target.classList.remove('active');
        			event.target.clicked = true;
        		}
        	}


            function startGame() {
                correctClicks = 0;
                missedClicks = 0;
                counterElement.textContent = correctClicks;
                missedCounterElement.textContent = missedClicks;
                gameInterval = setInterval(lightUpRandomSquare, 2000);
            }
            
            function stopGame() {
                clearInterval(gameInterval);
            }
            
            function resetGame() {
                stopGame();
                correctClicks = 0;
                missedClicks = 0;
                counterElement.textContent = correctClicks;
                missedCounterElement.textContent = missedClicks;
            }

        	initializeGrid();
        	document.getElementById('startButton').addEventListener('click', startGame);
        	document.getElementById('stopButton').addEventListener('click', stopGame);
        	document.getElementById('resetButton').addEventListener('click', resetGame);
        });

        window.startGame = startGame;
        window.stopGame = stopGame;


