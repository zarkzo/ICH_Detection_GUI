const API_URL = "http://localhost:8000";
const DETECTION_THRESHOLD = 50; // 50% confidence threshold

// Model display configuration (4 models)
const MODEL_CONFIG = {
  model_a: {
    title: "Efficientnet V2",
    badge: "Base",
    description: "First detection model",
  },
  model_b: {
    title: "ConvNext",
    badge: "Base",
    description: "Second detection model",
  },
  model_c: {
    title: "Cascade EfficientNetV2-ConvNeXT",
    badge: "Hybrid",
    description: "Third detection model",
  },
  model_d: {
    title: "Modified Cascade EfficientNetV2-ConvNeXT",
    badge: "Hybrid",
    description: "Fourth detection model",
  },
};

/**
 * Initialize results page
 */
function init() {
  const resultsJson = sessionStorage.getItem("detectionResult");

  if (!resultsJson) {
    alert("No detection results found. Please upload a DICOM file first.");
    window.location.href = "detection.html";
    return;
  }

  try {
    const results = JSON.parse(resultsJson);
    console.log("Loaded multi-model results:", results);

    // Display images
    displayImages(results);

    // Display all model comparisons
    displayModelComparison(results);
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
 * Display all model predictions in comparison grid
 */
function displayModelComparison(results) {
  const container = document.getElementById("model-comparison");
  const predictions = results.predictions;

  if (!predictions) {
    console.error("No predictions found in results");
    container.innerHTML = "<p>No predictions available</p>";
    return;
  }

  let html = "";

  // Render each model (model_a, model_b, model_c, model_d)
  for (const [modelKey, config] of Object.entries(MODEL_CONFIG)) {
    const modelData = predictions[modelKey];

    if (!modelData) {
      console.warn(`No data for ${modelKey}`);
      continue;
    }

    html += renderModelCard(modelKey, modelData, config);
  }

  container.innerHTML = html;

  // Animate score bars after render
  setTimeout(() => animateScoreBars(), 100);
}

/**
 * Render a single model card
 */
function renderModelCard(modelKey, modelData, config) {
  const detected = modelData.detected || [];
  const confidences = modelData.confidences || {};

  // Sort confidences by value (highest first)
  const sortedConfidences = Object.entries(confidences).sort(
    (a, b) => b[1] - a[1]
  );

  // Build HTML
  return `
        <div class="model-card">
            <div class="model-header">
                <h3 class="model-name">${config.title}</h3>
                <span class="model-badge primary">
                    ${config.badge}
                </span>
            </div>
            
            <div class="model-summary ${
              detected.length > 0 ? "detected" : "no-detection"
            }">
                <h4>${
                  detected.length > 0
                    ? "⚠️ Hemorrhage Detected"
                    : "✓ No Hemorrhage Detected"
                }</h4>
                ${
                  detected.length > 0
                    ? `
                    <div class="model-detected-list">
                        ${detected
                          .map(
                            (label) =>
                              `<span class="model-detected-badge">${label}</span>`
                          )
                          .join("")}
                    </div>
                `
                    : `
                    <p style="margin: 8px 0 0; font-size: 14px; color: var(--text-secondary);">
                        No significant hemorrhage detected above ${DETECTION_THRESHOLD}% threshold
                    </p>
                `
                }
            </div>
            
            <div class="model-scores">
                ${sortedConfidences
                  .map(([label, confidence]) => {
                    const isDetected = confidence >= DETECTION_THRESHOLD;
                    return `
                        <div class="model-score-row">
                            <div class="model-score-label">
                                ${label}
                                ${
                                  isDetected
                                    ? '<span style="color: #ef4444;">⚠️</span>'
                                    : ""
                                }
                            </div>
                            <div class="model-score-bar-container">
                                <div class="model-score-bar ${
                                  isDetected ? "detected" : ""
                                }" 
                                     data-width="${confidence}">
                                </div>
                            </div>
                            <div class="model-score-value">${confidence.toFixed(
                              1
                            )}%</div>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        </div>
    `;
}

/**
 * Animate score bars with smooth transition
 */
function animateScoreBars() {
  const bars = document.querySelectorAll(".model-score-bar");

  bars.forEach((bar) => {
    const width = bar.getAttribute("data-width");

    // Start from 0
    bar.style.width = "0%";

    // Animate to target width after short delay
    setTimeout(() => {
      bar.style.width = `${width}%`;
    }, 50);
  });
}

/**
 * Get color for confidence level (for future enhancements)
 */
function getConfidenceColor(confidence) {
  if (confidence >= DETECTION_THRESHOLD) {
    return "#ef4444"; // Red - detected
  } else if (confidence >= 30) {
    return "#f59e0b"; // Amber - moderate
  } else {
    return "#10b981"; // Green - low
  }
}

/**
 * Format confidence value with appropriate color
 */
function formatConfidence(confidence) {
  const value = confidence.toFixed(1);
  const color = getConfidenceColor(confidence);
  return `<span style="color: ${color}; font-weight: 600;">${value}%</span>`;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Results page initializing...");
  init();
});
