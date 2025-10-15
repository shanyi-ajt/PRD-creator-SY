# Problem and Background
PMs spend too much time turning rough feature ideas into clear PRDs and tickets. Output quality varies by person/time. We need a tool that:
- turns short feature briefs into a standardized PRD
- asks smart clarifying questions
- suggests a staged ticket breakdown tailored to AJT’s tech flow

# Goal
Create an app that helps product managers prepare clear and useful PRD.

# Project Overview
- Project Name: PRD creator
- Description: The PRD creator will help me prepare PRD based on the feature user submitted and a template.
- Target users: Product managers

# Core features
- Understand the feature user provides and prepare the PRD in a format
- Provide PRD based on the technical spec and flow of AJT

# User Flow (with ChatGPT Integration)
1. User types or pastes a short explanation of the feature.
2. Click “Generate PRD”
3. ChatGPT analyzes the brief and automatically generates a complete PRD using the standard format (Problem Alignment → Future Ideas).
4. The PRD follows the styling and format pprovided in template section.
5. ChatGPT also lists clarifying questions below the PRD to highlight missing or uncertain details.
6. ChatGPT suggests a ticket breakdown based on the PRD content and AJT’s technical flow:
- Frontend (FE): UI flows and GA4 event tracking.
- Backend (BE): API and database development, and Kibana event tracking (requires both FE and BE).
- Each API, database, kibana event, ga4 event should be suggested as different ticket.
- Additional tickets can be suggested for UI flow, content updates, or analytics if relevant.

# Technical Stack
Technical Requirements
Deployment: Netlify or Vercel (choose one or let AI recommend)

Works on: Both computers and mobile phones

Data Storage: [Do you need to save data? e.g., "Save user's tasks even after closing browser" or "No data needs to be saved"]

Note: You don't need to choose specific technologies (like React, HTML, etc.). The AI will help you choose based on your project needs. Just focus on describing WHAT you want to build.

# PRD template
## Feature summary
## 1. Problem Alignment
### 1.1 Objective
### 1.2 Hypothesis
### 1.3 Data Evidence
### 1.4 Competitors & Product Inspiration
## 2. Solution Alignment
### 2.1 User Stories
### 2.2 Key Features
### 2.3 Key Flow
### 2.4 Key Logic
table with columns:
- Platform
- Modules
- Description
Platform includes AJT (employer management web app) and MKRB (job hiring platforms)
#### 2.4.1 Comms Requirement
#### 2.4.2 Data tracking/Events
table with columns:
- Triggering conditions
- Tracking events
- Tracking parameters
- Values
## 3. Requirements Changelog
## 4. Marketing Plan
## 5. Timleline
a table with columns:
- Sprint
- Scope
- Tickets
## 6. Success Metrics
a table with columns:
- Metrics
- Before
- After
For each metric, provides understandable name, definition and formula
## 7. Appendix
Related documents
## 8. Future Ideas