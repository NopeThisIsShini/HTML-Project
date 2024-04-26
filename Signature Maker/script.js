document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('signature-pad');
    var context = canvas.getContext('2d');
    var backgroundColorPicker = document.getElementById('background-color-picker');
    var textColorPicker = document.getElementById('text-color-picker');
    var clearButton = document.getElementById('clear-button');
    var downloadButton = document.getElementById('download-button');
    var downloadNoBackgroundButton = document.getElementById('download-no-background-button');

    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;

    // Function to handle drawing on the canvas
    function draw(e) {
        if (isDrawing) {
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    }

    // Event listeners for mouse actions
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', function() {
        isDrawing = false;
    });

    // Clear button functionality
    clearButton.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Download button functionality (with background)
    downloadButton.addEventListener('click', function() {
        downloadSignature(true);
    });

    // Download button functionality without background
    downloadNoBackgroundButton.addEventListener('click', function() {
        downloadSignature(false);
    });

    // Function to download the signature
    function downloadSignature(withBackground) {
        // Save the current canvas state
        var dataUrl = canvas.toDataURL("image/png");

        // Create a new canvas to draw the signature with or without the background
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        var tempContext = tempCanvas.getContext('2d');

        if (withBackground) {
            // Draw the background color
            tempContext.fillStyle = backgroundColorPicker.value;
            tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }

        // Draw the signature with the selected text color
        tempContext.drawImage(canvas, 0, 0);

        // Create a download link and trigger the download
        var downloadLink = document.createElement('a');
        var filename = withBackground ? 'signature.jpg' : 'signature.png';
        downloadLink.setAttribute('download', filename);
        downloadLink.setAttribute('href', tempCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        downloadLink.click();
    }

    // Background color picker functionality
    backgroundColorPicker.addEventListener('change', function() {
        canvas.style.backgroundColor = backgroundColorPicker.value;
    });

    // Text color picker functionality
    textColorPicker.addEventListener('change', function() {
        context.strokeStyle = textColorPicker.value;
    });
});
