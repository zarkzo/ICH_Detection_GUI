# Multi-Model Detection System (4 Models)

Sistem ini mendukung **perbandingan prediksi 4 model** untuk deteksi Intracranial Hemorrhage (ICH) berbasis CT scan. Terdiri dari **backend** (FastAPI + TensorFlow/Keras) dan **frontend** (HTML/JS/CSS).

---

## 🔹 Backend Setup

### 1. Model Paths (`main.py`)
```python
MODEL_PATHS = {
    "model_a": "models/efficientnet.keras",
    "model_b": "models/conx.keras",
    "model_c": "models/hybridv3.keras",
    "model_d": "models/model_d.keras"
}

model_info = {
    "model_a": "Model A - Primary",
    "model_b": "Model B - Secondary",
    "model_c": "Model C - Validation",
    "model_d": "Model D - Additional"
}
````

### 2. Predict Function (`inference.py`)

Pastikan dictionary hasil prediksi menampung 4 model:

```python
results = {
    "model_a": None,
    "model_b": None,
    "model_c": None,
    "model_d": None
}
```

### 3. Menjalankan Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

Cek health endpoint:

```bash
curl http://localhost:8000/health
```

Expected response:

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

Cek prediksi:

```bash
curl -X POST http://localhost:8000/predict -F "file=@test.dcm" | jq '.predictions | keys'
```

Expected output:

```json
["model_a", "model_b", "model_c", "model_d"]
```

---

## 🔹 Frontend Setup

### 1. Model Config (`results-multimodel.js`)

```javascript
const MODEL_CONFIG = {
    model_a: {...},
    model_b: {...},
    model_c: {...},
    model_d: {
        title: "Model D",
        badge: "Additional",
        description: "Fourth detection model"
    }
};
```

### 2. Results Page (`results.html`)

```html
<h1 class="results-title">Multi-Model Detection Results (4 Models)</h1>
```

### 3. Jalankan Frontend

```bash
cd frontend
python -m http.server 3000
```

Buka browser: [http://localhost:3000](http://localhost:3000)
Upload file DICOM → tampilkan 4 cards prediksi.

### 4. Layout & Responsiveness

CSS grid:

```css
.model-comparison-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}
```

* Desktop (>1200px): 4 cards/row
* Tablet (768-1200px): 2 cards/row
* Mobile (<768px): 1 card/row

---

## 🔹 API Response Structure

```json
{
  "file_id": "uuid-123",
  "original_image": "/outputs/uuid-123_original.png",
  "processed_image": "/outputs/uuid-123_processed.png",
  "predictions": {
    "model_a": { ... },
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

---

## 🔹 Customization

* Ganti nama model di `main.py` (`model_info`)
* Ganti badge/warna di JS + CSS (`results-multimodel.js` + `dark-mode.css`)

---

## ✅ Checklist Sebelum Deploy

* 4 model files ada di `backend/models/`
* MODEL_PATHS di main.py sesuai
* Backend start tanpa error
* Health endpoint return 4 models
* Prediction endpoint return 4 predictions
* Frontend menampilkan 4 cards & confidence bars
* Dark mode aktif & responsive di mobile/tablet

---

## 🔄 Rollback ke 3 Models

1. Hapus `"model_d"` di backend (`main.py` & `inference.py`)
2. Hapus `model_d` di frontend (`results-multimodel.js`)
3. Ubah title frontend → "3 Models"

---

## 🎉 Done!

Sistem sudah support **4 model comparison** + frontend siap dijalankan di browser.

```

Kalau mau, saya bisa buatkan **versi README “super ringkas 1 halaman”** agar gampang dibaca cepat di terminal atau untuk dicetak.  
Apakah mau saya buatkan versi ringkasnya juga?
```
