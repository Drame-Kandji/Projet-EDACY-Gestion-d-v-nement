# Event Manager

Application web de gestion des événements. Elle permet aux utilisateurs de s'inscrire, de créer, supprimer, modifier et de gérer des événements à travers une interface moderne et responsive. Deux rôles sont disponibles : **Admin** et **Utilisateur**.

## 🚀 Fonctionnalités

- Authentification (login/register)
- Gestion des événements (CRUD)
- Liste et calendrier interactif des événements
- Filtrage par date, lieu, catégorie
- Inscriptions aux événements
- Génération de PDF (liste d’inscrits)
- Notifications email (nouvelles inscriptions)

---

## 🛠️ Technologies utilisées

- **Backend** : Laravel 11 + Sanctum + JWT
- **Frontend** : Angular 19 + Tailwind CSS + FullCalendar + jsPDF
- **Base de données** : MySQL
- **API** : RESTful

---

## ⚙️ Installation

### 1. Backend (Laravel)

#### Pré-requis

- PHP >= 8.2
- Composer
- MySQL

#### Étapes

```bash
# Cloner le projet backend
git clone https://github.com/Drame-Kandji/H24Code-Gestion-d-v-nement.git
cd eventBackEnd

# Installer les dépendances PHP
composer install

# Installer Sanctum et JWT
composer require laravel/sanctum
composer require tymon/jwt-auth

# Publier les fichiers de config si nécessaire
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Copier le fichier .env
cp .env.example .env

# Configurer la base de données dans .env
# DB_DATABASE=sene_evens
# DB_USERNAME=root
# DB_PASSWORD=

# Générer la clé de l'application et le secret JWT
php artisan key:generate
php artisan jwt:secret

# Créer les tables
php artisan migrate

# Démarrer le serveur backend
php artisan serve
```

### 2. Frontend (Angular)

#### Pré-requis

- Node.js ≥ 18.x
- Angular CLI

#### Étapes

```bash
# Cloner le projet frontend si c'est pas encore fait
git clone https://github.com/Drame-Kandji/H24Code-Gestion-d-v-nement.git
cd eventfront

# Installer les dépendances Node.js
npm install

# Lancer le serveur frontend
ng serve
```

---

## 🔐 Authentification

- Utilise **Sanctum** et **JWT** pour sécuriser les endpoints.
- Login/Inscription via :
  - `POST /api/login`
  - `POST /api/register`

---

## 📬 Notifications & PDF

- Email SMTP : Configuré via Gmail dans `.env`
- PDF : jsPDF génère une liste d'inscrits téléchargeable pour chaque événement.

---

## ✅ Commandes utiles

```bash
# Backend
php artisan migrate:fresh --seed   # Réinitialise la BDD avec des données de test
php artisan serve                  # Lance le backend

# Frontend
ng serve                      # Lance le frontend


---

## 📝 Auteurs

- Aliou Dramé
- Université Iba Der Thiam de Thiès
---

