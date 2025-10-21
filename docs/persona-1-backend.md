# Semana 1 – Product Owner (Backend Engineer)

## Objetivo
Implementar el flujo base de procesamiento de documentos para el Agente RAG Multicanal, que recibe un texto o PDF, lo divide en fragmentos y genera embeddings almacenados en Pinecone.

## Descripción del Workflow
El flujo se compone de seis nodos conectados en secuencia:

1. **Webhook (upload-pdf):** recibe el documento o texto a procesar mediante una solicitud POST.
2. **Edit Fields (Set):** define un texto de ejemplo para simular el contenido de un PDF.
3. **Code (Chunking):** divide el texto en fragmentos de aproximadamente 500 palabras.
4. **HTTP Request (HuggingFace):** genera embeddings de cada fragmento usando el modelo `sentence-transformers/all-MiniLM-L6-v2`.
5. **Code (Prepare Vector):** da formato al resultado de HuggingFace para que Pinecone pueda almacenarlo.
6. **HTTP Request (Pinecone):** guarda los vectores en el índice `proyecto-rag` dentro del namespace `ragagent`.

## Pruebas
Se ejecutó el flujo correctamente en n8n local (`http://localhost:5678`), obteniendo como respuesta:
```json
{"upsertedCount": 1}
