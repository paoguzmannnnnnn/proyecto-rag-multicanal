# proyecto-rag-multicanal
Repositorio principal del Proyecto RAG Multicanal

##  Objetivo general

Desarrollar un flujo de trabajo completo que permita:
1. Cargar y procesar documentos PDF.
2. Indexar la información en una base vectorial.
3. Consultar el contenido desde distintos canales de mensajería (Telegram, Slack y WhatsApp).
4. Unificar la lógica mediante **workflows en n8n**.


---

## Roles del equipo

| Persona | Rol | Rama asignada | Descripción |

| **P1** | Product Owner | `persona-1-backend` | Supervisa requerimientos y validación de entregas. |

| **P2** | Dev Telegram | `persona-2-telegram` | Desarrolla e integra el bot de Telegram. |

| **P3** | Dev Slack | `persona-3-slack` | Desarrolla e integra el bot de Slack. |

| **P4** | Dev WhatsApp | `persona-4-whatsapp` | Desarrolla e integra el bot de WhatsApp (Twilio API). |

| **P5** | QA + DevOps | `main` + revisión | Encargada del setup del repositorio, revisión de código, control de calidad e integración. |

---

##  Estructura del repositorio

proyecto-rag-multicanal/
├─ README.md
├─ .gitignore
├─ BACKLOG.md
├─ workflows/
│ ├─ 1-procesar-pdf.json
│ ├─ 2-bot-telegram.json
│ ├─ 3-bot-slack.json
│ └─ 4-bot-whatsapp.json
├─ docs/
│ ├─ arquitectura-backend.md
│ ├─ persona-1-backend.md
│ ├─ persona-2-telegram.md
│ ├─ persona-3-slack.md
│ ├─ persona-4-whatsapp.md
│ ├─ manual-usuario.md
│ └─ testing-report.md
├─ sprints/
│ ├─ sprint-planning.md
│ ├─ daily-standups.md
│ └─ sprint-retrospective.md
├─ credentials/
│ └─ .env.example
├─ tests/
│ └─ pdfs/
└─ assets/
└─ screenshots/

##  Flujo de trabajo

Ramas principales

main - rama protegida (solo merges por PR).

persona-1-backend - backend y RAG.

persona-2-telegram - bot de Telegram.

persona-3-slack - bot de Slack.

persona-4-whatsapp - bot de WhatsApp.

## Reglas del flujo Git
Reglas del flujo Git

1. Cada integrante trabaja solo en su rama asignada.
2. Al completar una tarea, debe crear un Pull Request (PR) hacia main.
3. Todo PR debe tener revisión y aprobación de al menos una persona (QA o Tech Lead).
4. Ningún cambio se hace directamente en main.


## Pruebas y control de calidad

Todos los flujos (workflows) deben probarse localmente en n8n antes de hacer merge. Los resultados de pruebas se documentan en docs/testing-report.md.QA (P5) verifica consistencia de respuestas entre canales y registra incidencias en Issues.

## Requisitos tecnicos

-n8n (para workflows)
-ngrok (para exponer webhooks)
-Pinecone (base vectorial)
-GROQ / OpenAI API (modelo de respuesta)
-Twilio API, Telegram Bot API, Slack API

## Buenas practicas

-Commits cortos y descriptivos (por ejemplo: feat: conectar bot de Telegram con RAG).
-No subir archivos grandes o PDFs de prueba fuera de /tests/pdfs.
-Revisar Issues antes de empezar una tarea.
-Documentar avances en los archivos de /sprints.

## Licencia

Este proyecto es académico y forma parte de la asignatura de desarrollo e integración de sistemas.

## Variables de entorno

Cada integrante debe crear su archivo `.env` local basado en `credentials/.env.example`.

```env
GROQ_API_KEY=
PINECONE_API_KEY=
PINECONE_ENV=
TWILIO_SID=
TWILIO_TOKEN=
TELEGRAM_BOT_TOKEN=
SLACK_BOT_TOKEN=
NGROK_AUTHTOKEN=



