# 🌍 Global Intellectual Property Intelligence Platform

<p align="center">

A Full-Stack Web Application for Intelligent Patent & Trademark Search, Portfolio Management, Legal Status Monitoring, Competitive Intelligence, and IP Analytics.

</p>

---

# 🔗 Live Application

https://global-ip-portal.netlify.app

---

# 📖 About The Project

Intellectual Property (IP) has become one of the most valuable assets for businesses, researchers, startups, universities, and legal organizations. However, IP information is highly fragmented across multiple databases, making it difficult to efficiently search, monitor, analyze, and track patents and trademarks.

The **Global Intellectual Property Intelligence Platform** was developed to solve this challenge by providing a centralized, intelligent, and interactive platform that enables users to search, manage, visualize, and monitor Intellectual Property assets from a single dashboard.

Instead of navigating through multiple platforms to track patent filings, trademark registrations, legal status, and competitor activities, users can access all critical information through one unified system.

The platform combines modern web technologies with an intuitive user interface to simplify Intellectual Property analysis and decision-making.

---

# ❗ Problem Statement

Managing Intellectual Property information is challenging because:

- IP data is scattered across multiple databases.
- Searching patents and trademarks requires visiting different websites.
- Monitoring competitor filings is time-consuming.
- Legal status tracking is difficult.
- Portfolio management lacks centralized visualization.
- Organizations struggle to derive actionable insights from IP data.

These challenges increase research time and reduce strategic decision-making efficiency.

---

# 💡 Proposed Solution

The Global Intellectual Property Intelligence Platform provides a centralized dashboard that allows users to:

- Search global patents and trademarks
- Track competitor filings
- Monitor legal status
- Analyze IP portfolios
- Visualize filings geographically
- Receive important notifications
- Manage subscriptions
- Access premium analytics

The platform transforms scattered IP information into a unified and intelligent decision-support system.

---

# 🎯 Project Objectives

The primary objectives of this project are:

- Build a centralized Intellectual Property dashboard
- Simplify global patent and trademark search
- Improve competitor analysis
- Provide real-time portfolio insights
- Enable legal status monitoring
- Deliver interactive visualizations
- Offer scalable subscription-based services
- Ensure secure authentication and authorization

---

# ✨ Key Features

## 🔐 Authentication & User Management

- User Registration
- User Login
- Admin Login
- Role-Based Access Control
- Profile Management
- Change Password
- Account Activation / Deactivation

---

## 🔍 Global IP Search

Users can search Intellectual Property using multiple filters:

- Patent Number
- Trademark
- Title
- Applicant
- Inventor
- Country
- Filing Date
- Publication Date
- Legal Status
- IP Type

---

## 📄 Detailed IP Information

Each IP record provides:

- Patent / Trademark Title
- Abstract
- Applicant
- Inventor
- Country
- Filing Date
- Publication Date
- Current Legal Status
- Complete Metadata

---

## 📌 Portfolio Tracking

Users can:

- Track important IP assets
- Build their own IP portfolio
- Monitor legal changes
- Receive updates

---

## 📈 Filing Tracker

Provides detailed tracking of:

- Application Date
- Publication Date
- Grant Date
- Current Filing Status
- Pending Filings
- Granted Assets

---

## ⚖ Legal Status Dashboard

Monitor:

- Pending
- Published
- Granted
- Expired
- Rejected
- Abandoned

along with graphical summaries.

---

## 🌍 Global IP Visualization

Interactive maps display:

- Country-wise Patent Distribution
- Trademark Distribution
- Filing Density
- Geographic Insights

---

## 📊 Analytics Dashboard

Includes:

- Total Filings
- Active Patents
- Pending Applications
- Granted Assets
- Monthly Trends
- Growth Statistics
- KPI Cards

---

## 🔔 Notification System

Users receive notifications for:

- Tracked Patent Updates
- Subscription Changes
- Legal Status Updates
- System Alerts

---

## 💳 Subscription Management

Subscription Plans:

### Basic

- Free Plan
- Basic Search
- Limited Features

### Professional

- Advanced Search
- Portfolio Tracking
- Legal Dashboard
- Enhanced Analytics

### Enterprise

- Complete Platform Access
- Premium Insights
- Unlimited Tracking
- Advanced Visualizations

---

## 💰 Razorpay Payment Integration

Secure payment integration using Razorpay.

Supports:

- Subscription Purchase
- Plan Upgrade
- Payment Confirmation

---

## 👨‍💼 Admin Dashboard

Administrator Features:

- Secure Admin Login
- Dashboard Overview
- User Management
- Enable / Disable Users
- Monitor Subscriptions
- View Platform Statistics

---

# 🔄 Application Workflow

```text
                User
                  │
                  ▼
          User Registration
                  │
                  ▼
             User Login
                  │
                  ▼
          Authentication Check
                  │
         ┌────────┴────────┐
         ▼                 ▼
     User Dashboard     Admin Panel
         │
         ▼
     Search IP Assets
         │
         ▼
    View Patent Details
         │
         ▼
 Track / Save Portfolio
         │
         ▼
Legal Status Monitoring
         │
         ▼
 Subscription Upgrade
         │
         ▼
 Razorpay Payment
         │
         ▼
 Premium Dashboard Access
```

---

# 🏗 System Architecture

```text
                    React Frontend
                           │
                           │ REST API
                           ▼
                 Spring Boot Backend
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
 Authentication     Business Logic       Notifications
       │                   │
       ▼                   ▼
               PostgreSQL Database
```

---

# ⚙ Technology Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Bootstrap
- CSS3
- HTML5

---

## Backend

- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- Maven

---

## Database

- PostgreSQL

---

## Payment Gateway

- Razorpay

---

## Deployment

### Frontend

Netlify

### Backend

Render

### Containerization

Docker

### Version Control

Git & GitHub

---

# 📁 Project Structure

```
Global-IP-Platform

├── frontend
│   ├── public
│   ├── src
│   │
│   ├── assets
│   ├── api
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   └── BackendApplication.java
│
└── README.md
```

---

# 🔐 Authentication Flow

```
User Login

↓

Spring Boot Authentication

↓

User Validation

↓

Role Verification

↓

Dashboard Access
```

---

# 🗄 Database

Major Tables:

- Users
- IP Assets
- Notifications
- Subscriptions
- Subscription Permissions

---

# 🌐 REST APIs

Major APIs include:

| Module | APIs |
|---------|------|
| Authentication | Register, Login |
| IP Search | Search, Details |
| Tracking | Track IP, Tracked Assets |
| Dashboard | KPIs, Filing Tracker |
| Legal Status | Summary, Details |
| Notifications | Get, Clear |
| Subscription | Upgrade, Plans |
| Admin | Users, Enable/Disable |

---

# 🐳 Docker Deployment

## Build Image

```bash
docker build -t khileshwari/global-ipi-backend .
```

## Push Image

```bash
docker push khileshwari/global-ipi-backend:latest
```

Deploy the latest Docker image on Render.

---

# ⚙ Environment Variables

## Backend

```
DATASOURCE_URL
DATASOURCE_USER
DATASOURCE_PASSWORD
FRONTEND_URL
IP_API_KEY
IP_API_URL
```

## Frontend

```
VITE_API_BASE_URL
VITE_RAZORPAY_KEY
```

---

# 🚀 Local Installation

## Clone Repository

```bash
git clone https://github.com/Khileshwari28/Global-Intellectual-Property-Platform.git
```

---

## Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔒 Security Features

- Role-Based Authorization
- Secure REST APIs
- Environment Variables
- CORS Configuration
- Protected Admin Routes
- Dockerized Deployment

---

# 📸 Screenshots

Include screenshots for:

- Login
- Registration
- Dashboard
- Search
- Patent Details
- Filing Tracker
- Legal Status
- Global Map
- Pricing
- Notifications
- Admin Dashboard

---

# 🔮 Future Enhancements

- JWT Authentication
- OAuth Integration
- AI-Based Patent Recommendation
- Competitor Intelligence Dashboard
- PDF Report Generation
- Email Notifications
- Multi-language Support
- Advanced Analytics
- Dark Mode
- Patent Similarity Search
- Real-time Global IP APIs

---

# 👨‍💻 Developer

**Khileshwari Deshmukh**

B.Tech Computer Science Engineering

GitHub: https://github.com/Khileshwari28

---

# 📄 License

This project is developed for educational and research purposes. It demonstrates the implementation of a modern full-stack Intellectual Property Intelligence Platform using React, Spring Boot, PostgreSQL, Docker, and cloud deployment technologies.
