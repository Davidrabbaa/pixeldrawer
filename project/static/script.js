// let html load first
document.addEventListener('DOMContentLoaded', function () {
    // all important elements that we need
    const gridCanvas = document.getElementById('gridCanvas');
    const colorPicker = document.getElementById('colorPicker');
    const gridSizeSelect = document.getElementById('gridSizeSelect');
    const sizeDisplay = document.getElementById('sizeDisplay');
    const btnDraw = document.getElementById('btnDraw');
    const btnErase = document.getElementById('btnErase');
    const btnClear = document.getElementById('btnClear');

    // default mode
    let currentMode = 'draw';
    // i have this to check if the mouse is down for drawing
    let isMouseDown = false;

    // initialize da grid
    // size for the grid. we can find the size in the last line when the function is called
    function createGrid(size) {
        // clear canvas
        gridCanvas.innerHTML = '';
        // set grid size
        gridCanvas.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
        gridCanvas.style.gridTemplateRows = 'repeat(' + size + ', 1fr)';

        // size * size because it's like 32x32 or 64x64 and so on
        // for this for loop, i used some ai assistance because i was mind blocked for a good minute
        // but simply what it does is that it loops through the number of pixels and creates a div for each pixel
        for (let i = 0; i < size * size; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');

            pixel.addEventListener('mousedown', function () {
                isMouseDown = true;
                paintPixel(this);
            });

            pixel.addEventListener('mouseenter', function () {
                if (isMouseDown) {
                    paintPixel(this);
                }
            });

            gridCanvas.appendChild(pixel);
        }
    }

    // if draw mode color da pixel if not then you're in erase mode so erase da pixel
    function paintPixel(pixel) {
        if (currentMode === 'draw') {
            pixel.style.backgroundColor = colorPicker.value;
        } else {
            pixel.style.backgroundColor = '#ffffff';
        }
    }

    // mouse track
    window.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    // tool switcher
    btnDraw.addEventListener('click', function () {
        currentMode = 'draw';
        btnDraw.classList.add('active');
        btnErase.classList.remove('active');
    });

    btnErase.addEventListener('click', function () {
        currentMode = 'erase';
        btnErase.classList.add('active');
        btnDraw.classList.remove('active');
    });

    // grid size changer
    gridSizeSelect.addEventListener('change', function () {
        const size = gridSizeSelect.value;
        sizeDisplay.textContent = size + 'x' + size;
        createGrid(size);
    });

    // clear 
    btnClear.addEventListener('click', function () {
        const pixels = document.querySelectorAll('.pixel');
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].style.backgroundColor = '#ffffff';
        }
    });

    // save
    const btnSave = document.getElementById('btnSave');
    const artTitle = document.getElementById('artTitle');

    btnSave.addEventListener('click', function () {
        const title = artTitle.value || 'Untitled';

        // get all pixel colors
        const pixelsList = [];
        const allPixels = document.querySelectorAll('.pixel');
        for (let i = 0; i < allPixels.length; i++) {
            const color = allPixels[i].style.backgroundColor || '#ffffff';
            pixelsList.push(color);
        }

        // we wanna fetch the data to the save endpoint that we have in our flask backend file,
        // and if it's successful we alert the user and redirect them to da gallery
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
        fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // turn the data into a string so we can send it to the backend
            body: JSON.stringify({
                title: title,
                pixels: JSON.stringify(pixelsList)
            })
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                alert(data.message);
                window.location.href = '/gallery';
            });
    });

    // initial grid size of 32x32
    createGrid(32);
});
