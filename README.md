Multichannel RAG Chatbot

A Retrieval-Augmented Generation (RAG) system that answers questions from your own PDF documents, accessible from multiple messaging channels — Telegram, Slack, and WhatsApp.

Built for a university course (individual project).

Stack: n8n · Pinecone · Groq (LLaMA 3.1) · HuggingFace embeddings

What it does
Loads and processes PDF documents.
Indexes their content into a vector database.
Lets users ask questions in natural language from Telegram, Slack, or WhatsApp.
Retrieves the most relevant content and generates an answer with an LLM.

The whole flow is orchestrated with n8n workflows, so each channel shares the same retrieval and answering logic.

Tech stack
Orchestration: n8n (workflows for PDF processing and each chat channel)
Embeddings: HuggingFace — sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
Vector database: Pinecone (cosine similarity)
LLM / answers: Groq — llama-3.1-8b-instant
Channels: Telegram Bot API, Slack API, WhatsApp (Twilio API)
Tunneling for webhooks: ngrok
How it's organized
proyecto-rag-multicanal/
├─ workflows/        # n8n workflows: PDF processing + one per channel
├─ docs/             # architecture, per-channel notes, user manual, testing report
├─ sprints/          # planning, standups, retrospective
└─ tests/pdfs/       # sample PDFs for testing

Development followed a clean Git workflow: work on feature branches, open Pull Requests into main, and keep main protected (no direct pushes).

Running it
Create a .env from credentials/.env.example and add your own keys:
HUGGINGFACE_TOKEN=your-token
GROQ_API_KEY=your-key
PINECONE_API_KEY=your-key
PINECONE_INDEX=proyecto-rag
# plus the channel keys you want to use (Telegram / Slack / Twilio)
Import the workflows from workflows/ into n8n.
Use ngrok to expose the webhooks for each bot.
Send a message to any connected channel and the bot answers from your indexed PDFs.

Keys live only in your local .env — never commit real credentials.
