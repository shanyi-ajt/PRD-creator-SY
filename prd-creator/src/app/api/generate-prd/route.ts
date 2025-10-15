import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { brief } = await request.json();

  if (!brief) {
    return NextResponse.json({ error: 'Brief is required' }, { status: 400 });
  }

  const prdFormat = `
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
## 5. Timeline
table with columns:
- Sprint
- Scope
- Tickets
## 6. Success Metrics
table with columns:
- Metrics
% of Rate
Definition: 
Formula: (# of actions) ÷ (# of actions)
- Before
- After
## 7. Appendix
Related documents
## 8. Future Ideas
`;

  const ajtTechFlow = `
- Event tracking: GA4 requires FE, Kibana requires FE and BE
- APIs
- Database
- UI/UX
`;

  const ticketBreakdownInstructions = `
- Suggest a ticket breakdown based on the PRD content and AJT’s technical flow.
- Create separate tickets for Frontend (FE) and Backend (BE) tasks.
- For FE, include tickets for UI flows and GA4 event tracking.
- For BE, include tickets for API and database development, and Kibana event tracking (which requires both FE and BE).
- Each API, database, kibana event, and ga4 event should be suggested as a different ticket.
- Additional tickets can be suggested for UI flow, content updates, or analytics if relevant.
`;

  const prompt = `
Given the following feature brief, PRD format, and technical flow, generate a comprehensive PRD, a list of clarifying questions, and a list of tickets.

**Feature Brief:**
${brief}

**PRD Format:**
${prdFormat}

**Technical Flow:**
${ajtTechFlow}

**Ticket Breakdown Instructions:**
${ticketBreakdownInstructions}

**Response Format:**
Please provide the response as a single JSON object with the following keys: "prd", "questions", and "tickets".
- The "prd" value should be a string in markdown format.
- The "questions" value should be an array of strings.
- The "tickets" value should be an array of strings.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    console.log('Generated PRD Markdown:', response.prd);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate PRD from OpenAI' }, { status: 500 });
  }
}