# 🎬 Movie Discovery App

A full-stack movie discovery application built with **React 19**, **Tailwind CSS**, **TMDB API**, **Express.js**, and **MongoDB**.

Search for movies, browse popular titles, and discover trending movies based on real search activity.

## 🚀 Live Demo

https://react-movie-discovery-app.netlify.app/

## ✨ Features

- 🔎 Search thousands of movies using the TMDB API
- 🎬 Browse popular movies
- 📈 Trending movies based on search frequency
- ⚡ 500ms debounced search
- 📱 Responsive UI
- 🔄 Loading and error states
- 🔗 Custom REST API for search tracking

## 🛠️ Tech Stack

### Frontend
- React 19
- JavaScript
- Vite
- Tailwind CSS
- React Hooks

### Backend
- Node.js
- Express.js
- MongoDB

### APIs & Deployment
- TMDB API
- Netlify — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 🏗️ Architecture

```text
React / Netlify
      │
      ├──────────► TMDB API
      │
      ▼
Express / Render
      │
      ▼
MongoDB Atlas
```

## 📈 Trending System

Movie searches are tracked through a custom Express REST API.

```text
User searches movie
        ↓
React
        ↓
POST /api/search
        ↓
Express
        ↓
MongoDB
        ↓
Increment movie search count
```

Trending movies are retrieved by sorting movies by search count and returning the top 5.

```text
GET /api/search/trending
        ↓
Express
        ↓
MongoDB
        ↓
Sort by count
        ↓
Top 5 movies
```

Searches are tracked using the **TMDB movie ID** rather than the search term, preventing the same movie from appearing multiple times when users use different search terms.

## 🔌 API Endpoints

### Record Search

```http
POST /api/search
```

Example request:

```json
{
  "searchTerm": "Batman",
  "movieId": 268,
  "posterUrl": "/poster.jpg"
}
```

### Get Trending Movies

```http
GET /api/search/trending
```

Returns the top 5 most searched movies.

## ⚡ Performance

Search requests are **debounced by 500ms** to reduce unnecessary API calls while the user is typing.

## 📁 Project Structure

```text
src/
├── components/
├── App.jsx
└── ...

server/
├── models/
│   └── Search.js
├── routes/
│   └── search.js
└── server.js
```

## 🎯 What This Project Demonstrates

- React component architecture
- React Hooks and state management
- REST API integration
- Debounced API requests
- Express.js backend development
- MongoDB and Mongoose
- Frontend/backend communication
- CORS configuration
- Environment variable management
- Full-stack deployment
