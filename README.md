# 🧠 Text Intelligence System

An AI-powered Named Entity Recognition (NER) application that extracts meaningful information from unstructured text using a pretrained BERT model.

## ✨ Features

- **Named Entity Recognition:** Identifies people, organizations, locations and miscellaneous entities.
- **BERT Integration:** Uses a pretrained transformer model for contextual entity extraction.
- **Confidence Scores:** Displays confidence scores for detected entities.
- **Interactive Dashboard:** Provides an intuitive interface for text analysis and results.
- **REST API:** Connects the frontend and ML model through FastAPI.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Python, FastAPI
- **Model:** BERT (`dslim/bert-base-NER`)
- **ML Framework:** Hugging Face Transformers, PyTorch

## ⚙️ Architecture

```text
User Input
    ↓
React Frontend
    ↓
FastAPI Backend
    ↓
Pretrained BERT Model
    ↓
Entity Extraction
    ↓
JSON Response
    ↓
Results Dashboard
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js and npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/GayatriVenkatesan/text-intelligence-ml.git
cd text-intelligence-ml
```

**2. Set up the backend**

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
```

**3. Run the backend**

```bash
uvicorn backend.main:app --reload
```

**4. Set up the frontend**

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` to access the application.

## 🤖 Model Information

**Model:** [`dslim/bert-base-NER`](https://huggingface.co/dslim/bert-base-NER)

The pretrained BERT model identifies four entity categories:

| Category | Description |
|---|---|
| PER | Person |
| ORG | Organization |
| LOC | Location |
| MISC | Miscellaneous |

## 🔮 Future Enhancements

- Document upload and text extraction.
- Multilingual entity recognition.
- Batch text processing.
- Docker-based containerization.
- Enhanced entity analytics.
