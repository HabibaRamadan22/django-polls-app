# django-polls-app
A dynamic, dynamic, and modern web-based polling application built using **Django** and styled with modern frontend design patterns. This application allows users to browse available questions, cast votes, view real-time calculated results with animated progress bars, and search through polls seamlessly.
---

## ✨ Features

* **Interactive Voting System:** Select options and submit votes with instant feedback.
* **Dynamic Progress Bars:** Live calculation of vote percentages using Django template logic.
* **Instant Search:** Quickly filter through existing polls on the main page.
* **Dark / Light Mode Toggle:** Modern, responsive UI designed for smooth user experience.
* **Custom Admin Dashboard:** Comprehensive management interface for creating questions, choices, and managing permissions.
* **Atomic Vote Counting:** Implements Django's `F()` expressions to ensure race-condition-safe database updates.

---

## 🛠️ Tech Stack & Architecture

* **Backend:** Python 3, Django (MTV Architecture)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS animations & UI interactions)
* **Database:** SQLite (Relational structure with `Question` and `Choice` models)
* **Schema Design:** Designed using [dbdiagram.io](https://dbdiagram.io)

---

## 📊 Database Schema

The database architecture consists of two main models connected via a **One-to-Many** relationship (`ForeignKey` with `ON DELETE CASCADE`):

| Model | Field | Type | Description |
| :--- | :--- | :--- | :--- |
| **Question** | `id` | Auto / Primary Key | Unique poll identifier |
| | `question_text` | CharField(200) | The poll prompt |
| | `pub_date` | DateTimeField | Publication timestamp |
| **Choice** | `id` | Auto / Primary Key | Unique choice identifier |
| | `question` | ForeignKey | Relates choice to its specific question |
| | `choice_text` | CharField(200) | Option text |
| | `votes` | IntegerField | Vote counter (Default: 0) |

![Database Schema](Untitled.png)

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project locally on your machine:

### Prerequisites
* Python 3.8+ installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name

### 1- Create and activate a virtual environment:

Bash
# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# On Windows:
python -m venv venv
venv\Scripts\activate

### 2-Install dependencies:
Bash
pip install django


### 3-Apply database migrations:
Bash
python manage.py migrate

### 4-Create a superuser (for Django Admin access):

Bash
python manage.py createsuperuser

### 5-Run the development server:
Bash
python manage.py runserver
Open your browser and navigate to http://127.0.0.1:8000/polls/.

👥 Contributors
This project was developed as part of the Web Development Internship at Bibliotheca Alexandrina (BA) by:

Sara — Frontend Development & UI Animations

Habiba — Backend Architecture & Database Logic
