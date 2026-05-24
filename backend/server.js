const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. DATA ARCHITECTURE: MATCH DATA EVENTS
// ==========================================

let matches = [
  {
    id: "match-1",
    title: "IPL 2026 Final: Mumbai Indians vs Chennai Super Kings",
    date: "2026-05-24",
    duration: "20 Overs Completed",
    status: "Analyzed",
    importance: 1.2, // Match Importance Factor (e.g. Final = 1.2)
  },
  {
    id: "match-2",
    title: "IPL 2026 Qualifier 1: Royal Challengers Bengaluru vs Kolkata Knight Riders",
    date: "2026-05-21",
    duration: "20 Overs Completed",
    status: "Analyzed",
    importance: 1.1, // Qualifier = 1.1
  }
];

// Structured match timeline events (Event Agent Ingestion)
let matchEvents = {
  "match-1": [
    { id: "e1", matchId: "match-1", over: "Over 2.4", eventType: "Single", runs: 1, batter: "Rohit Sharma", bowler: "Ravindra Jadeja", description: "Soft push to mid-on. CEAT boundary banner visible in background.", timestamp: 240, momentum: 45 },
    { id: "e2", matchId: "match-1", over: "Over 5.2", eventType: "Boundary (Four)", runs: 4, batter: "Rohit Sharma", bowler: "Deepak Chahar", description: "Stunning cover drive! TATA boundary car board receives center screen focus.", timestamp: 520, momentum: 78 },
    { id: "e3", matchId: "match-1", over: "Over 9.5", eventType: "Dot Ball", runs: 0, batter: "Suryakumar Yadav", bowler: "Ravindra Jadeja", description: "Beaten on the outside edge. Jio wicket stumps branding captured.", timestamp: 950, momentum: 30 },
    { id: "e4", matchId: "match-1", over: "Over 14.1", eventType: "Boundary (Six)", runs: 6, batter: "Hardik Pandya", bowler: "Matheesha Pathirana", description: "Massive six over mid-wicket! Dream11 banner fully visible on sight screen.", timestamp: 1410, momentum: 94 },
    { id: "e5", matchId: "match-1", over: "Over 14.3", eventType: "Wicket", runs: 0, batter: "Hardik Pandya", bowler: "Matheesha Pathirana", description: "Bowled! Off-stump flying. CEAT logo on player bats and stumps in replay loop.", timestamp: 1430, momentum: 98 },
    { id: "e6", matchId: "match-1", over: "Over 18.6", eventType: "Boundary (Six)", runs: 6, batter: "MS Dhoni", bowler: "Jasprit Bumrah", description: "Classic Dhoni helicopter shot! Straight sight screen CEAT banner featured.", timestamp: 1860, momentum: 99 }
  ],
  "match-2": [
    { id: "e10", matchId: "match-2", over: "Over 1.2", eventType: "Boundary (Four)", runs: 4, batter: "Virat Kohli", bowler: "Mitchell Starc", description: "Flick through midwicket. CEAT boundary rope visible.", timestamp: 120, momentum: 72 },
    { id: "e11", matchId: "match-2", over: "Over 6.4", eventType: "Wicket", runs: 0, batter: "Faf du Plessis", bowler: "Varun Chakaravarthy", description: "Caught at slips! TATA interview backdrop shown in replay sequence.", timestamp: 640, momentum: 85 },
    { id: "e12", matchId: "match-2", over: "Over 12.3", eventType: "Single", runs: 1, batter: "Rajat Patidar", bowler: "Sunil Narine", description: "Tapped to deep square. Jio banners visible.", timestamp: 1230, momentum: 40 }
  ]
};

// ==========================================
// 2. DATA ARCHITECTURE: SPONSOR METADATA
// ==========================================

let sponsors = [
  {
    id: "dream11",
    name: "Dream11",
    logo: "🎯",
    placement: "Sight Screen / Jersey Sleeve",
    duration: "Full Season",
    historicalVisibility: 82, // % Historical exposure score
    targetAudience: "Young sports fans, fantasy enthusiasts",
    spend: 1200000,
    color: "#ff3e3e"
  },
  {
    id: "tata",
    name: "TATA",
    logo: "🚙",
    placement: "Boundary Boards / Ground Car Showcase",
    duration: "Full Season",
    historicalVisibility: 94,
    targetAudience: "Automotive buyers, tech professionals",
    spend: 2500000,
    color: "#1e3a8a"
  },
  {
    id: "jio",
    name: "Jio",
    logo: "📱",
    placement: "Boundary Boards / Wicket Stumps",
    duration: "Full Season",
    historicalVisibility: 78,
    targetAudience: "Mobile users, digital service consumers",
    spend: 1800000,
    color: "#059669"
  },
  {
    id: "ceat",
    name: "CEAT",
    logo: "🚗",
    placement: "Boundary Boards / Bat Stickers",
    duration: "Full Season",
    historicalVisibility: 88,
    targetAudience: "Vehicle owners, cricket enthusiasts",
    spend: 800000,
    color: "#d97706"
  }
];

// ==========================================
// 3. SOCIAL ENGAGEMENT DATA & HISTORICALS
// ==========================================

let socialEngagement = {
  "dream11": { likes: 245000, shares: 58000, comments: 32000, mentions: 45000, spikes: 4 },
  "tata": { likes: 310000, shares: 85000, comments: 48000, mentions: 62000, spikes: 6 },
  "jio": { likes: 180000, shares: 41000, comments: 29000, mentions: 22000, spikes: 2 },
  "ceat": { likes: 215000, shares: 34000, comments: 18000, mentions: 38000, spikes: 5 }
};

let historicalAnalytics = {
  "dream11": { prevMatches: 14, prevExposure: 79, prevEngagement: 310000, prevROI: 2.85 },
  "tata": { prevMatches: 14, prevExposure: 91, prevEngagement: 420000, prevROI: 2.10 },
  "jio": { prevMatches: 14, prevExposure: 74, prevEngagement: 230000, prevROI: 2.45 },
  "ceat": { prevMatches: 14, prevExposure: 85, prevEngagement: 280000, prevROI: 3.62 }
};

// Event Weight Configs for Exposure Engine
const eventWeights = {
  "Boundary (Six)": 1.5,
  "Boundary (Four)": 1.3,
  "Wicket": 1.4,
  "Single": 0.8,
  "Dot Ball": 0.5,
  "Double": 0.9
};

// ==========================================
// 4. STATICS & AI ENGINES LOGIC
// ==========================================

// EXPOSURE ENGINE:
// Formula: Exposure Score = Match Importance * Event Type Weight * Historical Performance * Engagement Factor
const calculateSponsorExposure = (matchId, sponsorId, eventType) => {
  const match = matches.find(m => m.id === matchId) || matches[0];
  const sponsor = sponsors.find(s => s.id === sponsorId);
  const social = socialEngagement[sponsorId];
  
  const matchImportance = match.importance;
  const eventWeight = eventWeights[eventType] || 0.8;
  const historicalPerf = sponsor.historicalVisibility / 100;
  
  // Engagement Factor (normalized between 0.8 and 1.5)
  const engagementFactor = 0.8 + (social.likes / 1000000);
  
  const rawScore = matchImportance * eventWeight * historicalPerf * engagementFactor * 100;
  const exposureScore = Math.round(Math.min(Math.max(rawScore, 0), 100));
  
  // Reach Score = Exposure Score * Base Factor
  const reachScore = Math.round(exposureScore * 135000);
  const visibilityProb = Math.min(Math.round(exposureScore + (Math.random() * 5)), 99);

  return {
    estimatedExposure: exposureScore,
    visibilityProbability: visibilityProb,
    reachScore: reachScore
  };
};

// EVENT AGENT:
// Generates: Event Impact Score, Engagement Opportunity, Exposure Estimate
const runEventAgent = (matchId, event) => {
  const baseImpact = event.momentum * 0.8;
  const eventImpactScore = Math.round(Math.min(baseImpact + (event.runs * 4), 100));
  
  let engagementOpp = "Medium Opportunity";
  if (eventImpactScore > 80) engagementOpp = "High Trigger: Deploy Social Boost Now";
  else if (eventImpactScore < 40) engagementOpp = "Low Traffic Window";

  return {
    eventImpactScore,
    engagementOpportunity: engagementOpp,
    exposureEstimate: Math.round(eventImpactScore * 0.9)
  };
};

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Core Configs
app.get('/api/matches', (req, res) => {
  res.json(matches);
});

app.get('/api/sponsors', (req, res) => {
  res.json(sponsors);
});

// 2. Events feeds
app.get('/api/events/:matchId', (req, res) => {
  const mId = req.params.matchId;
  const list = matchEvents[mId] || matchEvents["match-1"];
  res.json(list);
});

// 3. Process Exposure Calculations for Selected Event context
app.get('/api/exposure/:matchId/:sponsorId/:eventId', (req, res) => {
  const { matchId, sponsorId, eventId } = req.params;
  const eventsList = matchEvents[matchId] || matchEvents["match-1"];
  const event = eventsList.find(e => e.id === eventId) || eventsList[0];
  
  const exposureMetrics = calculateSponsorExposure(matchId, sponsorId, event.eventType);
  const agentDetails = runEventAgent(matchId, event);
  
  res.json({
    ...exposureMetrics,
    ...agentDetails,
    eventInfo: event
  });
});

// 4. Ingest new static CSV/JSON match event
app.post('/api/events/ingest', (req, res) => {
  const { matchId, over, eventType, runs, batter, bowler, description, momentum } = req.body;
  const mId = matchId || "match-1";
  
  const newEvent = {
    id: `e-${Date.now()}`,
    matchId: mId,
    over: over || "Over 0.1",
    eventType: eventType || "Dot Ball",
    runs: parseInt(runs) || 0,
    batter: batter || "Unnamed Batter",
    bowler: bowler || "Unnamed Bowler",
    description: description || "Ball delivered.",
    timestamp: 300,
    momentum: parseInt(momentum) || 50
  };

  if (!matchEvents[mId]) matchEvents[mId] = [];
  matchEvents[mId].push(newEvent);

  res.status(201).json({
    message: "Structured event ingested successfully",
    event: newEvent
  });
});

// 5. ROI analytics calculations
app.get('/api/roi/:matchId', (req, res) => {
  const mId = req.params.matchId;
  const match = matches.find(m => m.id === mId) || matches[0];
  const list = matchEvents[mId] || matchEvents["match-1"];

  // Average momentum score
  const avgMomentum = list.reduce((acc, curr) => acc + curr.momentum, 0) / list.length;
  
  const roiCalculations = sponsors.map(s => {
    const social = socialEngagement[s.id];
    // Custom calculation from static events count
    const sponsorEvents = list.filter(e => e.description.toLowerCase().includes(s.id));
    const visibilityBoost = 70 + (sponsorEvents.length * 5);
    
    const engagementFactor = (social.likes / 12000);
    const positiveSentiment = 70 + (s.id === 'tata' ? 15 : s.id === 'ceat' ? 5 : 0);
    
    // ROI = (Visibility * Engagement * Sentiment) / Contract Spend
    const roi = ((visibilityBoost * engagementFactor * (positiveSentiment / 100)) / (s.spend / 100000)).toFixed(2);
    const impressions = Math.round(visibilityBoost * 145000);

    return {
      sponsorId: s.id,
      name: s.name,
      logo: s.logo,
      spend: s.spend,
      exposureScore: Math.min(Math.round(visibilityBoost), 100),
      impressions,
      engagement: {
        likes: social.likes,
        shares: social.shares,
        comments: social.comments,
        views: social.likes * 25
      },
      sentiment: { positive: positiveSentiment, neutral: 20, negative: 10 - (positiveSentiment - 70) },
      roi: parseFloat(roi)
    };
  }).sort((a, b) => b.roi - a.roi);

  res.json({
    matchId: mId,
    totalEvents: list.length,
    sponsors: roiCalculations
  });
});

// 6. Ad Generator Agent
app.post('/api/ad-generator', (req, res) => {
  const { sponsorId, eventType } = req.body;
  const sponsor = sponsors.find(s => s.id === sponsorId) || sponsors[3];
  
  const brand = sponsor.name;
  const placement = sponsor.placement;

  const campaigns = {
    instagram: `🔥 MOMENTUM ALERT! When the boundaries fly, brand impact shoots up! 🏏✨ Check out ${brand}'s active placement branding live. Target: ${sponsor.targetAudience}. #IPL2026 #${brand}Analytics`,
    linkedin: `Event-Driven ROI: During the latest peak-momentum wickets, ${brand}'s ${placement} placement recorded a visibility spike of 91%. Discover how dynamic context outperforms static banners. 📈🏏 #SportsAnalytics #SponsorScope`,
    twitter: `Boom! 💥 Right past the ${brand} displays! The game is alive. What a momentum trigger! #IPL2026`,
    reel: `[Video Concept]: 5-second fast cuts of boundary wickets, with overlays displaying the live SponsorScope Event Impact Score shooting from 40 to 98. Text overlay: 'Banners occupy space. Events occupy minds.'`
  };

  res.json({
    campaigns,
    sponsor: brand,
    created: new Date().toISOString()
  });
});

// 7. Copilot Chat Agent (answers questions from static parameters)
app.post('/api/copilot/chat', (req, res) => {
  const { message, sponsorId, matchId } = req.body;
  const msg = message.toLowerCase();
  
  const sponsor = sponsors.find(s => s.id === sponsorId) || sponsors[3];
  const list = matchEvents[matchId || "match-1"] || matchEvents["match-1"];
  const brand = sponsor.name;

  let answer = "";
  let confidence = 92;
  let uplift = 0;

  if (msg.includes("roi") || msg.includes("dropped") || msg.includes("performance")) {
    const historical = historicalAnalytics[sponsor.id];
    answer = `Based on static event analysis, **${brand}**'s ROI efficiency is currently optimized at **3.88x** (due to Bat Sticker visibility on Dhoni's boundary-hitting events). However, ROI dropped slightly in qualifiers due to fewer high-momentum boundaries. We recommend boosting social campaigns immediately after wickets.`;
    uplift = 15;
    confidence = 94;
  } else if (msg.includes("placement") || msg.includes("exposure") || msg.includes("placement")) {
    answer = `For maximum visibility under our static model, **${brand}** should focus placements on the **Sight Screen (North)** during death overs. Wicket replays focus heavily on the bowler run-up, creating a 3.2x longer visibility duration.`;
    uplift = 22;
    confidence = 88;
  } else if (msg.includes("launch") || msg.includes("when") || msg.includes("schedule")) {
    answer = `Campaigns should launch precisely at the **beginning of Over 15**. Historical stats show that social engagement rises by **85%** during the second half of run chases, coinciding with peak audience retention.`;
    uplift = 35;
    confidence = 95;
  } else {
    answer = `I have completed a prediction sweep for **${brand}**. Placements during boundary events yield a **+22% reach increase** compared to standard match-play blocks.`;
    uplift = 18;
    confidence = 91;
  }

  res.json({
    answer,
    expectedUplift: uplift,
    confidenceScore: confidence,
    timestamp: new Date().toISOString()
  });
});

// 8. Global AI Assistant Agent (Multi-functional)
app.post('/api/assistant/chat', (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();
  
  let text = "";
  let action = null;
  let payload = {};

  if (msg.includes("navigate") || msg.includes("go to") || msg.includes("open") || msg.includes("show me")) {
    if (msg.includes("event") || msg.includes("timeline") || msg.includes("scorecard")) {
      text = "Navigating to the Event Agent Timeline.";
      action = "navigate";
      payload = { path: "/event-agent" };
    } else if (msg.includes("roi") || msg.includes("analyst") || msg.includes("map")) {
      text = "Opening the ROI analyst page.";
      action = "navigate";
      payload = { path: "/roi-agent" };
    } else if (msg.includes("ingest") || msg.includes("upload") || msg.includes("add event")) {
      text = "Redirecting to the Event Ingestion Center.";
      action = "navigate";
      payload = { path: "/upload-center" };
    } else if (msg.includes("sentiment") || msg.includes("opinion") || msg.includes("social")) {
      text = "Taking you to the Sentiment Hub.";
      action = "navigate";
      payload = { path: "/sentiment-engagement" };
    } else if (msg.includes("copilot")) {
      text = "Opening the Brand Copilot optimizer.";
      action = "navigate";
      payload = { path: "/copilot" };
    } else if (msg.includes("generator") || msg.includes("creative")) {
      text = "Entering Creative Studio.";
      action = "navigate";
      payload = { path: "/ad-generator" };
    } else if (msg.includes("reports") || msg.includes("export")) {
      text = "Navigating to Reports.";
      action = "navigate";
      payload = { path: "/reports" };
    } else {
      text = "Opening the ROI dashboard.";
      action = "navigate";
      payload = { path: "/dashboard" };
    }
  } else if (msg.includes("best sponsor") || msg.includes("highest roi") || msg.includes("who performed")) {
    text = "Based on static event tabulations, **CEAT** performed best with an ROI of **3.88x** because their spend sticker placement on player bats aligns directly with Dhoni and Kohli's high-momentum boundary events ($800k spend vs 13.0M impressions).";
  } else if (msg.includes("why roi dropped") || msg.includes("low roi")) {
    text = "TATA's ROI dropped to **2.28x** despite having the highest visibility duration. This is driven by their high $2.5M spend. To improve their score, TATA should shift placements to boundary car showcases during death over events which trigger 3x higher social engagement spikes.";
  } else if (msg.includes("launch") || msg.includes("when should campaign")) {
    text = "We recommend launching campaigns during **Overs 14 to 18**. Our Event Agent shows a 2.5x increase in sentiment triggers and interaction counts during this period, generating the highest reach probability.";
  } else if (msg.includes("increase exposure")) {
    text = "You can increase exposure by allocating placements to **Sight Screens** during spin-overs and **Mid-Wicket ropes** during run-chase boundaries. Re-positioning logos here yields a +25% reach uplift.";
  } else {
    text = "Hi, I am SponsorScope AI. I can navigate pages (e.g. 'Open Event Ingestion page'), explain performance stats, compare sponsors, or suggest campaign launch timings. Try asking: 'Which sponsor performed best?'!";
  }

  res.json({
    answer: text,
    action: action,
    payload: payload,
    timestamp: new Date().toISOString()
  });
});

// Export app for serverless deployment
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SponsorScope AI Event-Based Backend running on port ${PORT}`);
  });
}
