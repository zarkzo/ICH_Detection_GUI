# 🧠 ICH Detection System - GUI 

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12+-orange.svg)](https://www.tensorflow.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)]()

**Sistem Deteksi Perdarahan Intrakranial (ICH) Berbasis Deep Learning**  
*Menggunakan Arsitektur Hybrid Cascade EfficientNet-V2 dan ConvNeXt*

---

## 📋 Table of Contents

- Overview
- Features
- System Architecture
- Installation
- Usage
- API Documentation
- Model Information
- Project Structure
- Troubleshooting
- Collaboration
- Disclaimer
- Citation

---

## 🎯 Overview

This project is an **AI-powered Clinical Decision Support System (CDSS)** designed to assist in the early detection and classification of Intracranial Hemorrhage (ICH) from brain CT scans. The system employs a novel **Cascade EfficientNet-V2-ConvNeXt** architecture for multi-label classification across five ICH subtypes.

### Key Highlights

- **Multi-Model Approach**: Three independent models for robust prediction
- **Medical Image Processing**: DICOM support with Hounsfield Unit windowing
- **Multi-Label Classification**: Detects 6 ICH categories simultaneously
- **Real-Time Inference**: Fast prediction with comprehensive visualization
- **Educational Platform**: Integrated medical and technical documentation

### Developed By

**Putra Faaris Prayoga**  
Program Studi Teknik Biomedis  
Institut Teknologi Sumatra (ITERA)

### Collaborative Research

This project is a collaborative academic research initiative between:
- **Institut Teknologi Sumatra** (Indonesia)
- **Universiti Malaysia Perlis** (Malaysia)

---

## ✨ Features

### 🔬 Medical Imaging
- **DICOM File Support**: Native DICOM (.dcm) file processing
- **Hounsfield Unit Conversion**: Accurate radiodensity calculation
- **Multi-Window Processing**: Three-channel RGB creation (Blood/Brain/Bone windows)
- **Image Preprocessing**: Automated normalization and resizing to 256×256

### 🤖 AI Detection
- **Multi-Label Classification**: Detects 6 ICH categories:
  - Any ICH (Overall hemorrhage presence)
  - Epidural (EDH)
  - Subdural (SDH)
  - Subarachnoid (SAH)
  - Intraventricular (IVH)
  - Intraparenchymal (IPH)
- **Multi-Model Validation**: 3 or 4 independent models for increased reliability
- **Confidence Scoring**: Percentage confidence for each hemorrhage type
- **Threshold-Based Detection**: Customizable detection threshold (default: 50%)

### 🎨 User Interface
- **Apple-Style Design**: Clean, minimalist, professional interface
- **Dark/Light Mode**: Toggle with localStorage persistence
- **Interactive Results**: Animated confidence bars and detailed comparisons
- **Educational Modals**: Click-to-learn ICH type explanations
- **Responsive Design**: Mobile, tablet, and desktop support

### 📚 Educational Content
- **About ICH Page**: Medical education on hemorrhage types
- **Methodology Page**: Technical details and architecture explanation
- **Developer Information**: Project background and motivation
- **Interactive Learning**: Clickable elements with detailed medical information

---

## 🏗️ System Architecture

### Overall Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Frontend  │  HTTP   │   Backend    │  Load   │   Models    │
│  (HTML/JS)  │ ──────> │   (FastAPI)  │ ──────> │  (Keras)    │
│             │ <────── │              │ <────── │             │
└─────────────┘  JSON   └──────────────┘  Pred   └─────────────┘
```

### Cascade Model Architecture

```
Input (256×256×3)
    ↓
┌──────────────────┐
│ EfficientNet-V2  │ ← Front-End: Local Feature Extraction
│ (Fine-grained)   │
└────────┬─────────┘
         │
    Feature Fusion
         │
         ↓
┌──────────────────┐
│    ConvNeXt      │ ← Back-End: Global Context Understanding
│ (Global Context) │
└────────┬─────────┘
         │
         ↓
  Classification Head
         │
         ↓
6 ICH Categories (Multi-Label)
```

### Processing Pipeline

```
DICOM Upload
    ↓
Read with pydicom
    ↓
Extract Pixel Array
    ↓
Convert to Hounsfield Units
    ↓
Apply 3 Windows (Blood/Brain/Bone)
    ↓
Stack as RGB (256×256×3)
    ↓
Model Inference (3 Models)
    ↓
Confidence Scores + Detection Results
    ↓
Display Results with Visualization
```

---

## 🚀 Installation

### Prerequisites

- **Python**: 3.8 or higher (3.9-3.10 recommended)
- **pip**: Latest version
- **Virtual Environment**: Recommended
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/ich-detection-system.git
cd ich-detection-system
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Place Model Files

Place your trained Keras models in `backend/models/`:

```bash
backend/models/
├── efficientnet.keras    # Model A
├── conx.keras           # Model B
├── hybridv3.keras       # Model C
└── model_d.keras        # Model D (optional, can be 3 or 4 models)
```

**Important**: Update `MODEL_PATHS` in `backend/app/main.py` to match your model filenames:

```python
MODEL_PATHS = {
    "model_a": "models/your_model_a.keras",
    "model_b": "models/your_model_b.keras",
    "model_c": "models/your_model_c.keras",
    "model_d": "models/your_model_d.keras"  # Optional: Remove for 3-model setup
}
```

### Step 4: Frontend Setup

```bash
cd frontend

# No dependencies needed - uses vanilla HTML/CSS/JS
# Just ensure all files are in place
```

---

## 💻 Usage

### Starting the System

#### Quick Start (Recommended)

```bash
# Clone and setup
git clone https://github.com/your-username/ich-detection-system.git
cd ich-detection-system

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Place your model files in backend/models/
# Update MODEL_PATHS in app/main.py to match your filenames

# Start backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open new terminal for frontend:

```bash
# Frontend setup
cd frontend
python -m http.server 3000
```

#### Terminal 1: Start Backend

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
==================================================
Starting model loading process...
==================================================
✓ Found model_a: models/efficientnet.keras
✓ Found model_b: models/conx.keras
✓ Found model_c: models/hybridv3.keras
✓ Found model_d: models/model_d.keras
✓ Model A loaded successfully
✓ Model B loaded successfully
✓ Model C loaded successfully
✓ Model D loaded successfully
==================================================
✅ All 4 models loaded successfully - API ready
==================================================
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Note**: System supports both 3 or 4 models. If you only have 3 models, remove `model_d` from `MODEL_PATHS` in `main.py`.

#### Terminal 2: Start Frontend

```bash
cd frontend
python -m http.server 3000
```

### Accessing the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Configuration Options

#### Using 3 Models (Default)

Edit `backend/app/main.py`:
```python
MODEL_PATHS = {
    "model_a": "models/efficientnet.keras",
    "model_b": "models/conx.keras",
    "model_c": "models/hybridv3.keras",
}
```

#### Using 4 Models

Edit `backend/app/main.py`:
```python
MODEL_PATHS = {
    "model_a": "models/efficientnet.keras",
    "model_b": "models/conx.keras",
    "model_c": "models/hybridv3.keras",
    "model_d": "models/model_d.keras",  # Add 4th model
}
```

Frontend will automatically adjust to display 3 or 4 model cards.

### Using the System

1. **Home Page**: View project information and background
2. **Detection Page**: Upload a DICOM (.dcm) file
3. **Results Page**: View detection results from all models
4. **About ICH**: Learn about hemorrhage types
5. **Methodology**: Understand technical implementation

---

## 📡 API Documentation

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "models_loaded": {
    "model_a": true,
    "model_b": true,
    "model_c": true,
    "model_d": true
  },
  "total_models": 4
}
```

**Note**: `total_models` will be 3 or 4 depending on your configuration.

### Prediction Endpoint

```http
POST /predict
Content-Type: multipart/form-data
```

**Request:**
- **file**: DICOM file (.dcm)

**Response:**
```json
{
  "file_id": "abc-123-def-456",
  "original_image": "/outputs/abc-123_original.png",
  "processed_image": "/outputs/abc-123_processed.png",
  "predictions": {
    "model_a": {
      "model_name": "Model A",
      "confidences": {
        "Any ICH": 85.23,
        "Epidural": 12.45,
        "Subdural": 72.30,
        "Subarachnoid": 8.67,
        "Intraventricular": 15.89,
        "Intraparenchymal": 45.12
      },
      "detected": ["Any ICH", "Subdural"]
    },
    "model_b": { ... },
    "model_c": { ... },
    "model_d": { ... }
  },
  "model_info": {
    "model_a": "Model A - Primary",
    "model_b": "Model B - Secondary",
    "model_c": "Model C - Validation",
    "model_d": "Model D - Additional"
  }
}
```

**Note**: Response includes 3 or 4 model predictions depending on configuration.

### Testing with cURL

```bash
# Health check
curl http://localhost:8000/health

# Prediction
curl -X POST http://localhost:8000/predict \
  -F "file=@path/to/your/scan.dcm"
```

---

## 🧠 Model Information

### Dataset

- **Name**: RSNA Intracranial Hemorrhage Dataset
- **Source**: Kaggle (Radiological Society of North America)
- **Size**: 25,000+ brain CT scans
- **Format**: DICOM files with expert annotations
- **Labels**: Multi-label for 5 ICH subtypes + Any ICH

### Architecture: Cascade EfficientNet-V2-ConvNeXt

#### Front-End Network: EfficientNet-V2
- **Purpose**: Local and fine-grained feature extraction
- **Strengths**: 
  - Efficient compound scaling
  - Optimized training speed
  - Small hemorrhage detection
  - Parameter efficiency

#### Back-End Network: ConvNeXt
- **Purpose**: Global spatial context understanding
- **Strengths**:
  - Large kernel convolutions (7×7)
  - Long-range dependency modeling
  - Anatomical relationship capture
  - Modern CNN architecture

#### Cascade Mechanism
- Progressive feature refinement through two stages
- Feature fusion between networks via skip connections
- Combines local details with global context
- Multi-label classification head

### Input Specifications

- **Format**: 256×256×3 RGB tensor
- **Channels**:
  - Red: Blood window (WL=75, WW=215)
  - Green: Brain window (WL=40, WW=80)
  - Blue: Bone window (WL=600, WW=2800)
- **Data Type**: Float32, normalized [0, 1]

### Output Specifications

- **Classes**: 6 (multi-label binary)
- **Format**: Sigmoid activations (0-1 range)
- **Threshold**: 0.5 (50%) for positive detection

### Training Details

- **Framework**: TensorFlow/Keras
- **Loss Function**: Binary Cross-Entropy (weighted)
- **Optimizer**: Adam with learning rate scheduling
- **Batch Size**: 32
- **Validation Strategy**: Stratified K-fold

---

## 📂 Project Structure

```
ich-detection-system/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── preprocessing.py     # DICOM processing pipeline
│   │   ├── inference.py         # Model loading & prediction
│   │   └── models.py            # Pydantic schemas
│   ├── models/
│   │   ├── efficientnet.keras   # Model A
│   │   ├── conx.keras           # Model B
│   │   ├── hybridv3.keras       # Model C
│   │   └── model_d.keras        # Model D (optional)
│   ├── uploads/                 # Temporary DICOM storage
│   ├── outputs/                 # Processed images
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── index.html               # Home page
│   ├── detection.html           # Detection interface
│   ├── results.html             # Results display
│   ├── about-ich.html           # Medical education
│   ├── methodology.html         # Technical documentation
│   ├── css/
│   │   ├── styles.css           # Main stylesheet
│   │   ├── dark-mode.css        # Theme styling
│   │   └── education-pages.css  # Educational pages
│   └── js/
│       ├── detection.js         # Upload & detection logic
│       ├── results-multimodel.js # Results display
│       ├── theme.js             # Dark/light mode manager
│       └── ich-modal.js         # ICH information modals
│
├── docs/
│   └── (additional documentation)
│
├── README.md                     # This file
└── LICENSE
```

---

## 🔧 Troubleshooting

### Backend Issues

#### Models Not Loading

**Error**: `Could not locate class 'Function'` or `weighted_bce`

**Solution**: Model uses custom loss function. Ensure `inference.py` has:
```python
def weighted_bce(y_true, y_pred):
    return tf.keras.losses.binary_crossentropy(y_true, y_pred)

custom_objects = {'weighted_bce': weighted_bce}
model = tf.keras.models.load_model(path, custom_objects=custom_objects, compile=False)
```

The `compile=False` parameter is crucial - it loads the model architecture and weights without needing the training configuration.

#### Missing Models

**Error**: `Missing model files`

**Solution**: 
- Check that model files exist in `backend/models/`
- Verify filenames match `MODEL_PATHS` in `main.py`
- System supports 3 or 4 models - adjust `MODEL_PATHS` accordingly

#### Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Find process
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill process or use different port
uvicorn app.main:app --port 8001
```

#### Module Not Found

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
# Ensure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Issues

#### CORS Error

**Error**: `Access blocked by CORS policy`

**Solution**: Backend already includes CORS middleware. Ensure backend is running on correct port.

#### Images Not Displaying

**Error**: `404 Not Found` for image URLs

**Solution**: 
- Check `outputs/` directory exists
- Verify backend created PNG files
- Check console for correct image paths

#### Dark Mode Not Persisting

**Solution**: Check browser localStorage is enabled:
```javascript
// In browser console
localStorage.setItem('test', '1')
localStorage.getItem('test')  // Should return '1'
```

### DICOM Processing Issues

#### Invalid DICOM File

**Error**: `Error reading DICOM file`

**Solution**:
- Ensure file is valid DICOM format
- Check file has required DICOM tags
- Try with different DICOM file

#### Model Input Shape Mismatch

**Error**: `Input shape mismatch`

**Solution**: Update preprocessing to match your model's expected input size in `preprocessing.py`.

---

## 🤝 Collaboration

This project is a collaborative research initiative between:

### Institut Teknologi Sumatra (ITERA)
- **Location**: Lampung, Indonesia
- **Department**: Biomedical Engineering
- **Role**: Primary development and research

### Universiti Malaysia Perlis (UniMAP)
- **Location**: Perlis, Malaysia
- **Role**: Research collaboration and validation

---

## ⚠️ Disclaimer

### Academic and Research Purpose Only

This system is designed **strictly for academic research and thesis demonstration purposes**. It is **NOT intended for clinical diagnosis or medical decision-making**.

### Important Notices

- ❌ **Not FDA/CE Approved**: This system has not been approved by regulatory bodies
- ❌ **Not for Clinical Use**: Do not use for actual patient diagnosis
- ❌ **Not a Medical Device**: This is a research prototype
- ✅ **Educational Tool**: For learning and academic demonstration only
- ✅ **Consult Professionals**: Always seek qualified medical professionals for diagnosis

### Limitations

- Model performance may vary across different CT scanners and protocols
- System has not undergone clinical validation studies
- Results should be interpreted by qualified radiologists
- False positives and false negatives may occur
- Not suitable for emergency medical decisions

### Liability

The developers and affiliated institutions assume no liability for any medical decisions made based on this system's output. This tool is provided "as-is" for research and educational purposes.

---

## 📊 Performance Metrics

*Note: Add your actual metrics from validation/testing*

| Metric | Model A | Model B | Model C | Ensemble |
|--------|---------|---------|---------|----------|
| Accuracy | XX.X% | XX.X% | XX.X% | XX.X% |
| Sensitivity | XX.X% | XX.X% | XX.X% | XX.X% |
| Specificity | XX.X% | XX.X% | XX.X% | XX.X% |
| AUC-ROC | X.XXX | X.XXX | X.XXX | X.XXX |

---

## 📝 Citation

If you use this system in your research, please cite:

```bibtex
@misc{prayoga2024ich,
  title={AI-Based Intracranial Hemorrhage Detection using Cascade EfficientNet-V2-ConvNeXt},
  author={Prayoga, Putra Faaris},
  year={2024},
  institution={Institut Teknologi Sumatra},
  note={Collaborative research with Universiti Malaysia Perlis}
}
```

---

## 📧 Contact

**Developer**: Putra Faaris Prayoga  
**Institution**: Institut Teknologi Sumatra (ITERA)  
**Program**: Teknik Biomedis

For questions, issues, or collaboration inquiries:
- Open an issue on GitHub
- Contact through institutional email

---

## 📄 License

This project is licensed for **Academic Use Only**. See LICENSE file for details.

---

## 🙏 Acknowledgments

- **RSNA** for providing the Intracranial Hemorrhage dataset
- **Institut Teknologi Sumatra** for research support
- **Universiti Malaysia Perlis** for collaboration
- **TensorFlow/Keras** community for deep learning framework
- **FastAPI** community for backend framework

---

## 🔄 Version History

### Version 2.1.0 (Current)
- ✅ Support for 3 or 4 model configurations
- ✅ Flexible model loading system
- ✅ Enhanced error handling for custom loss functions
- ✅ Improved model path configuration

### Version 2.0.0
- ✅ Multi-model inference (3 models)
- ✅ Dark/light mode toggle
- ✅ Educational pages (About ICH, Methodology)
- ✅ Interactive ICH explanations
- ✅ Enhanced UI/UX
- ✅ Collaboration disclosure

### Version 1.0.0 (Initial)
- ✅ Single model inference
- ✅ Basic DICOM processing
- ✅ Detection interface
- ✅ Results visualization

---

**Made with ❤️ for advancing medical AI research**

🧠 **Institut Teknologi Sumatra** × **Universiti Malaysia Perlis**


