from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI application
app = FastAPI(title="Text Intelligence API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pretrained NER model
ner_model = pipeline(
    "ner",
    model="dslim/bert-base-NER",
    aggregation_strategy="simple"
)

# Define the structure of incoming text
class TextInput(BaseModel):
    text: str

# Create an API endpoint
@app.post("/analyze")
def analyze_text(data: TextInput):

    # Send input text to the NER model
    results = ner_model(data.text)

    # Format extracted entities
    entities = []

    for entity in results:
        entities.append({
            "word": entity["word"],
            "category": entity["entity_group"],
            "confidence": round(float(entity["score"]), 3)
        })

    # Return results as JSON
    return {
        "entities": entities
    }