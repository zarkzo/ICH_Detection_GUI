/**
 * ICH Detection - Results Page Logic
 * Displays detection results with images and confidence scores
 */

// API Configuration
const API_URL = "http://localhost:8000";

// Detection threshold
const DETECTION_THRESHOLD = 50; // 50%

// ICH type descriptions
const ICH_DESCRIPTIONS = {
  "Any ICH": "Indicates presence of any type of intracranial hemorrhage",
  Intraparenchymal: "Bleeding within the brain tissue itself",
  Intraventricular: "Blood accumulates in the brain ventricles",
  Subarachnoid: "Bleeding in the space between brain and skull",
  Subdural: "Blood collection between brain and dura mater",
  Epidural: "Bleeding between skull and outer brain membrane",
};

/**
 * Initialize results page
 */
function init() {
  // Get results from sessionStorage
  const resultsJson = sessionStorage.getItem("detectionResult");

  if (!resultsJson) {
    // No results found, redirect to detection page
    alert("No detection results found. Please upload a DICOM file first.");
    window.location.href = "detection.html";
    return;
  }

  try {
    const results = JSON.parse(resultsJson);
    console.log("Loaded results:", results);

    // Display results
    displayImages(results);
    displaySummary(results);
    displayConfidenceScores(results);
  } catch (error) {
    console.error("Error parsing results:", error);
    alert("Error loading results. Please try again.");
    window.location.href = "detection.html";
  }
}

/**
 * Display original and processed images
 */
function displayImages(results) {
  const originalImg = document.getElementById("original-image");
  const processedImg = document.getElementById("processed-image");

  // Construct full URLs
  const originalUrl = `${API_URL}${results.original_image}`;
  const processedUrl = `${API_URL}${results.processed_image}`;

  originalImg.src = originalUrl;
  processedImg.src = processedUrl;

  console.log("Images loaded:", { originalUrl, processedUrl });
}

/**
 * Display detection summary
 */
function displaySummary(results) {
  const summaryContent = document.getElementById("summary-content");
  const detected = results.predictions.detected || [];

  let summaryHTML = "";

  if (detected.length === 0) {
    summaryHTML = `
            <div style="padding: 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                <p style="font-size: 18px; font-weight: 600; color: #065f46; margin-bottom: 8px;">
                    ✓ No Hemorrhage Detected
                </p>
                <p style="color: #047857;">
                    The model did not detect any significant intracranial hemorrhage 
                    in this CT scan based on the confidence threshold of ${DETECTION_THRESHOLD}%.
                </p>
            </div>
        `;
  } else {
    summaryHTML = `
            <div style="padding: 20px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                <p style="font-size: 18px; font-weight: 600; color: #991b1b; margin-bottom: 12px;">
                    ⚠️ Hemorrhage Detected
                </p>
                <p style="color: #7f1d1d; margin-bottom: 16px;">
                    The model detected the following types of intracranial hemorrhage:
                </p>
                <div class="detected-list">
                    ${detected
                      .map(
                        (label) =>
                          `<span class="detected-badge">${label}</span>`
                      )
                      .join("")}
                </div>
                <p style="margin-top: 16px; font-size: 14px; color: #7f1d1d; font-style: italic;">
                    Note: This is an AI prediction for research purposes only. 
                    Clinical diagnosis should be made by qualified medical professionals.
                </p>
            </div>
        `;
  }

  summaryContent.innerHTML = summaryHTML;
}

/**
 * Display confidence scores as visual bars
 */
function displayConfidenceScores(results) {
  const scoresTable = document.getElementById("scores-table");
  const confidences = results.predictions.confidences || {};

  let scoresHTML = "";

  // Sort by confidence (highest first)
  const sortedScores = Object.entries(confidences).sort((a, b) => b[1] - a[1]);

  sortedScores.forEach(([label, confidence]) => {
    const isDetected = confidence >= DETECTION_THRESHOLD;
    const barColor = isDetected ? "#ef4444" : "#0071e3";

    scoresHTML += `
            <div class="score-row">
                <div class="score-label">
                    ${label}
                    ${
                      isDetected
                        ? '<span style="color: #ef4444; font-size: 18px;">⚠️</span>'
                        : ""
                    }
                </div>
                <div class="score-bar-container">
                    <div class="score-bar" 
                         style="width: ${confidence}%; background: ${barColor};">
                    </div>
                </div>
                <div class="score-value">${confidence.toFixed(1)}%</div>
            </div>
        `;
  });

  scoresTable.innerHTML = scoresHTML;

  // Animate bars after a short delay
  setTimeout(() => {
    const bars = document.querySelectorAll(".score-bar");
    bars.forEach((bar) => {
      bar.style.width = bar.style.width; // Trigger animation
    });
  }, 100);
}

/**
 * Format confidence value with color coding
 */
function formatConfidence(confidence) {
  const value = confidence.toFixed(1);
  let color = "#6e6e73"; // Default gray

  if (confidence >= DETECTION_THRESHOLD) {
    color = "#ef4444"; // Red for detected
  } else if (confidence >= 30) {
    color = "#f59e0b"; // Amber for moderate
  } else {
    color = "#10b981"; // Green for low
  }

  return `<span style="color: ${color}; font-weight: 600;">${value}%</span>`;
}

/**
 * Get description for ICH type
 */
function getDescription(label) {
  return ICH_DESCRIPTIONS[label] || "No description available";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", init);

// Handle print
window.addEventListener("beforeprint", () => {
  console.log("Preparing to print results...");
});
