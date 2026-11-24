from transformers import pipeline

# Load the pretrained NER model
ner_model = pipeline(
    "ner",
    model="dslim/bert-base-NER",
    aggregation_strategy="simple"
)

# Input text
text = "Sundar Pichai announced that Google is opening a new office in Chennai."

# Send text to the model
results = ner_model(text)

# Display extracted entities
print("\nExtracted Entities:\n")

for entity in results:
    print(
        "Entity:", entity["word"],
        "| Category:", entity["entity_group"],
        "| Confidence:", round(entity["score"], 3)
    )