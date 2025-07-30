# 📝 Collaborative Editor

A real-time collaborative document editor built using **React (frontend)** and **Django Channels (backend)** with **WebSocket** support. Users can create, edit, and collaborate on documents in real-time. Each document is uniquely identified by its title and document ID.

---

## 📁 Project Structure

collaborative-editor/
├── backend/ # Django backend with Channels and WebSocket
├── frontend/ # React frontend for document editing
└── README.md

yaml
Copy code

---

## 🚀 Features

- ✅ Real-time text collaboration using WebSockets
- ✅ Create, edit, and save documents
- ✅ Prevent overwriting by unique document titles
- ✅ Load documents from saved list
- ✅ Backend API using Django REST Framework

---

## 🛠️ Tech Stack

| Frontend     | Backend       | Real-time       | Database   |
|--------------|---------------|-----------------|------------|
| React        | Django        | Django Channels | PostgreSQL |
| Tailwind CSS | Django REST   | WebSocket       | SQLite (dev) |

---

## ⚙️ Setup Instructions

### 🖥️ 1. Clone the Repo

```bash
git clone https://github.com/Naveenv26/collaborative-editor.git
cd collaborative-editor
📦 2. Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm start
Runs the frontend at http://localhost:3000.

🐍 3. Backend Setup (Django)
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Runs the backend at http://localhost:8000.

🔗 API Endpoint
GET /api/documents/ – List all documents

POST /api/documents/ – Save new document

PUT /api/documents/<doc_id>/ – Update a document

WebSocket endpoint: ws://localhost:8000/ws/editor/<doc_id>/

