      
	 
	 
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
        	const gridItems = []; // This will be a 2D array of grid items

        	function getRandomNumber(max) {
        		return Math.floor(Math.random() * max);
        	}

        	function initializeGrid() {
				// This function will initailize the grid
        		for (let row = 0; row < totalRows; row++) {
        			gridItems[row] = [];
        			for (let col = 0; col < totalColumns; col++) {
        				const gridItem = document.createElement('div');
        				gridItem.className = 'grid-item'; // References the grid-item class in the CSS
        				gridItem.addEventListener('click', handleGridItemClick); 
        				gridItems[row][col] = gridItem;
        				gridContainer.appendChild(gridItem);
        			}
        		}
        	}

        	function lightUpRandomSquare() {
        		const randomRow = getRandomNumber(totalRows);
        		const randomCol = getRandomNumber(totalColumns);
        		const gridItem = gridItems[randomRow][randomCol];
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
