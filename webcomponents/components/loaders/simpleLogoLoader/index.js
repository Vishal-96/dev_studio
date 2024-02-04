document.addEventListener("DOMContentLoaded", function () {
    // Simulate loading time
    setTimeout(function () {
        // Hide loader and show content
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "flex";
    }, 3000); // Adjust the duration as needed
});

// Simulate progress bar
let progressBar = document.getElementById("progress-bar");
let width = 0;

function updateProgressBar() {
    if (width < 100) {
        width += 10;
        progressBar.style.width = width + "%";
        setTimeout(updateProgressBar, 500); // Adjust the duration as needed
    }
}

updateProgressBar();
