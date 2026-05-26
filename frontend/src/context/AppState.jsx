import React, { createContext, useContext, useState, useEffect } from 'react';

const AppStateContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

// Realistic local fallbacks for event-based data
const LOCAL_SPONSORS = [
  { id: "dream11", name: "Dream11", logo: "🎯", placement: "Sight Screen / Jersey Sleeve", duration: "Full Season", historicalVisibility: 82, targetAudience: "Young sports fans, fantasy enthusiasts", spend: 1200000, color: "#ff3e3e" },
  { id: "tata", name: "TATA", logo: "🚙", placement: "Boundary Boards / Ground Car Showcase", duration: "Full Season", historicalVisibility: 94, targetAudience: "Automotive buyers, tech professionals", spend: 2500000, color: "#1e3a8a" },
  { id: "jio", name: "Jio", logo: "📱", placement: "Boundary Boards / Wicket Stumps", duration: "Full Season", historicalVisibility: 78, targetAudience: "Mobile users, digital service consumers", spend: 1800000, color: "#059669" },
  { id: "ceat", name: "CEAT", logo: "🚗", placement: "Boundary Boards / Bat Stickers", duration: "Full Season", historicalVisibility: 88, targetAudience: "Vehicle owners, cricket enthusiasts", spend: 800000, color: "#d97706" }
];

const LOCAL_MATCHES = [
  { id: "match-1", title: "IPL 2026 Final: Mumbai Indians vs Chennai Super Kings", date: "2026-05-24", duration: "20 Overs Completed", status: "Analyzed", importance: 1.2 },
  { id: "match-2", title: "IPL 2026 Qualifier 1: Royal Challengers Bengaluru vs Kolkata Knight Riders", date: "2026-05-21", duration: "20 Overs Completed", status: "Analyzed", importance: 1.1 }
];

const LOCAL_EVENTS = {
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

const LOCAL_SOCIALS = {
  "dream11": { likes: 245000, shares: 58000, comments: 32000, mentions: 45000, spikes: 4 },
  "tata": { likes: 310000, shares: 85000, comments: 48000, mentions: 62000, spikes: 6 },
  "jio": { likes: 180000, shares: 41000, comments: 29000, mentions: 22000, spikes: 2 },
  "ceat": { likes: 215000, shares: 34000, comments: 18000, mentions: 38000, spikes: 5 }
};

// Local fallback calculator for Event details (Exposure Engine)
const calculateLocalExposure = (mId, sId, eId) => {
  const eventsList = LOCAL_EVENTS[mId] || LOCAL_EVENTS["match-1"];
  const event = eventsList.find(e => e.id === eId) || eventsList[0];
  const match = LOCAL_MATCHES.find(m => m.id === mId) || LOCAL_MATCHES[0];
  const sponsor = LOCAL_SPONSORS.find(s => s.id === sId);
  
  // Weights
  const eventWeights = { "Boundary (Six)": 1.5, "Boundary (Four)": 1.3, "Wicket": 1.4, "Single": 0.8, "Dot Ball": 0.5 };
  const eventWeight = eventWeights[event.eventType] || 0.8;
  const historicalPerf = sponsor.historicalVisibility / 100;
  const social = LOCAL_SOCIALS[sId] || LOCAL_SOCIALS.ceat;
  const engagementFactor = 0.8 + (social.likes / 1000000);

  const rawScore = match.importance * eventWeight * historicalPerf * engagementFactor * 100;
  const exposureScore = Math.round(Math.min(Math.max(rawScore, 0), 100));
  
  const baseImpact = event.momentum * 0.8;
  const eventImpactScore = Math.round(Math.min(baseImpact + (event.runs * 4), 100));

  return {
    estimatedExposure: exposureScore,
    visibilityProbability: Math.min(Math.round(exposureScore + (Math.random() * 5)), 99),
    reachScore: Math.round(exposureScore * 135000),
    eventImpactScore,
    engagementOpportunity: eventImpactScore > 80 ? "High Trigger: Deploy Social Boost Now" : "Medium Opportunity",
    exposureEstimate: Math.round(eventImpactScore * 0.9),
    eventInfo: event
  };
};

// Local fallback calculator for ROI Leaderboard
const calculateLocalROI = (mId) => {
  const list = LOCAL_EVENTS[mId] || LOCAL_EVENTS["match-1"];
  const calculations = LOCAL_SPONSORS.map(s => {
    const social = LOCAL_SOCIALS[s.id];
    const sponsorEvents = list.filter(e => e.description.toLowerCase().includes(s.id));
    const visibilityBoost = 70 + (sponsorEvents.length * 5);
    const engagementFactor = (social.likes / 12000);
    const positiveSentiment = 70 + (s.id === 'tata' ? 15 : s.id === 'ceat' ? 5 : 0);
    const roi = ((visibilityBoost * engagementFactor * (positiveSentiment / 100)) / (s.spend / 100000)).toFixed(2);
    
    return {
      sponsorId: s.id,
      name: s.name,
      logo: s.logo,
      spend: s.spend,
      exposureScore: Math.min(Math.round(visibilityBoost), 100),
      impressions: Math.round(visibilityBoost * 145000),
      sentiment: { positive: positiveSentiment, neutral: 20, negative: 10 - (positiveSentiment - 70) },
      roi: parseFloat(roi)
    };
  }).sort((a, b) => b.roi - a.roi);

  return {
    matchId: mId,
    totalEvents: list.length,
    sponsors: calculations
  };
};

export const AppStateProvider = ({ children }) => {
  // Authentication
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sponsorscope_user');
    return saved ? JSON.parse(saved) : { email: 'demo@sponsorscope.ai', role: 'Admin', name: 'Alok Kumar' };
  });

  // System Core State
  const [matches, setMatches] = useState(LOCAL_MATCHES);
  const [sponsors, setSponsors] = useState(LOCAL_SPONSORS);
  const [selectedMatchId, setSelectedMatchId] = useState("match-1");
  const [selectedSponsorId, setSelectedSponsorId] = useState("ceat");
  
  // New Timeline Selection Core State
  const [selectedEventId, setSelectedEventId] = useState("e1");
  const [activeEventDetails, setActiveEventDetails] = useState(() => calculateLocalExposure("match-1", "ceat", "e1"));
  
  // Loaded Event Databases
  const [matchEvents, setMatchEvents] = useState(LOCAL_EVENTS["match-1"]);
  const [analytics, setAnalytics] = useState(() => calculateLocalROI("match-1"));
  const [loading, setLoading] = useState(false);

  // Copilot Chat state
  const [copilotHistory, setCopilotHistory] = useState([
    { role: 'assistant', content: 'Hi, I am your Sponsor ROI Copilot. Ask me: "When should campaign launch?" or "What caused ROI drop?"' }
  ]);

  // Global Floating AI Assistant state
  const [assistantHistory, setAssistantHistory] = useState([
    { role: 'assistant', content: 'Hello! I am SponsorScope AI, your overall Cricket Sponsorship Intelligence Agent. I can navigate pages (e.g. "go to Event Agent"), analyze ROI, and generate campaign ideas from match event metrics.' }
  ]);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Real-time Alerts / Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', text: 'Event Agent: Match events parsed.', time: '5m ago' },
    { id: 2, type: 'warning', text: 'Exposure drop warning: Dream11 logo obscured in Over 14.', time: '15m ago' }
  ]);

  // Calculations are resolved on load using local fallbacks and synchronized on backend responses.

  // Load matches & analytics
  const refreshData = async () => {
    setLoading(true);
    try {
      // 1. Matches list
      const matchRes = await fetch(`${BACKEND_URL}/matches`);
      if (matchRes.ok) {
        const matchesData = await matchRes.json();
        setMatches(matchesData);
      }

      // 2. Events list
      const eventsRes = await fetch(`${BACKEND_URL}/events/${selectedMatchId}`);
      if (eventsRes.ok) {
        const evData = await eventsRes.json();
        setMatchEvents(evData);
        // Default to first event in list
        if (evData.length > 0) {
          const firstEv = evData[0].id;
          setSelectedEventId(firstEv);
        }
      } else {
        setMatchEvents(LOCAL_EVENTS[selectedMatchId] || LOCAL_EVENTS["match-1"]);
        setSelectedEventId("e1");
      }

      // 3. ROI Rankings
      const roiRes = await fetch(`${BACKEND_URL}/roi/${selectedMatchId}`);
      if (roiRes.ok) {
        const roiData = await roiRes.json();
        setAnalytics(roiData);
      } else {
        setAnalytics(calculateLocalROI(selectedMatchId));
      }
      
    } catch (e) {
      console.warn("Backend server not responding, using premium mock database simulation.", e);
      // Fallback
      setMatchEvents(LOCAL_EVENTS[selectedMatchId] || LOCAL_EVENTS["match-1"]);
      setSelectedEventId("e1");
      setAnalytics(calculateLocalROI(selectedMatchId));
    } finally {
      setLoading(false);
    }
  };

  // Load exposure details when active event shifts
  const loadActiveEventExposure = async () => {
    if (!selectedEventId) return;
    try {
      const expRes = await fetch(`${BACKEND_URL}/exposure/${selectedMatchId}/${selectedSponsorId}/${selectedEventId}`);
      if (expRes.ok) {
        const data = await expRes.json();
        setActiveEventDetails(data);
      } else {
        throw new Error();
      }
    } catch (e) {
      setActiveEventDetails(calculateLocalExposure(selectedMatchId, selectedSponsorId, selectedEventId));
    }
  };

  useEffect(() => {
    refreshData();
  }, [selectedMatchId]);

  useEffect(() => {
    loadActiveEventExposure();
  }, [selectedEventId, selectedSponsorId]);

  // Auth Operations
  const login = (email, password, role) => {
    const newUser = { email, role: role || 'Sponsor', name: email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem('sponsorscope_user', JSON.stringify(newUser));
    addNotification('info', `Signed in as ${newUser.name} (${newUser.role})`);
    return true;
  };

  const signup = (name, email, password, role) => {
    const newUser = { email, role: role || 'Sponsor', name };
    setUser(newUser);
    localStorage.setItem('sponsorscope_user', JSON.stringify(newUser));
    addNotification('info', `Account created successfully.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sponsorscope_user');
    addNotification('info', `Signed out.`);
  };

  // Add Notification
  const addNotification = (type, text) => {
    const newAlert = {
      id: Date.now(),
      type,
      text,
      time: 'Just now'
    };
    setNotifications(prev => [newAlert, ...prev.slice(0, 4)]);
  };

  // Send Copilot Message
  const sendCopilotMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    setCopilotHistory(prev => [...prev, userMsg]);

    try {
      const response = await fetch(`${BACKEND_URL}/copilot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sponsorId: selectedSponsorId, matchId: selectedMatchId })
      });
      if (response.ok) {
        const data = await response.json();
        setCopilotHistory(prev => [...prev, { 
          role: 'assistant', 
          content: data.answer,
          uplift: data.expectedUplift,
          confidence: data.confidenceScore
        }]);
      } else {
        throw new Error();
      }
    } catch (e) {
      setTimeout(() => {
        let reply = `For CEAT's bat sticker placement, death-over events yield an estimated ROI efficiency increase of **18%**. Launches should schedule at Over 15 for max reach.`;
        setCopilotHistory(prev => [...prev, { role: 'assistant', content: reply, uplift: 18, confidence: 94 }]);
      }, 500);
    }
  };

  // Send Global Assistant Message
  const sendAssistantMessage = async (text, navigateCallback) => {
    const userMsg = { role: 'user', content: text };
    setAssistantHistory(prev => [...prev, userMsg]);

    try {
      const response = await fetch(`${BACKEND_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAssistantHistory(prev => [...prev, { role: 'assistant', content: data.answer }]);
        
        if (data.action === 'navigate' && navigateCallback) {
          setTimeout(() => {
            navigateCallback(data.payload.path);
          }, 1000);
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      setTimeout(() => {
        let reply = "I am operating in offline simulation mode. Ask me 'Which sponsor performed best?' or say 'Go to Event Agent page' to check timeline scorecards.";
        setAssistantHistory(prev => [...prev, { role: 'assistant', content: reply }]);
      }, 500);
    }
  };

  // Ingest new match event (Structured CSV/JSON)
  const ingestMatchEvent = async (eventData) => {
    addNotification('info', 'Ingesting new match event...');
    try {
      const res = await fetch(`${BACKEND_URL}/events/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventData, matchId: selectedMatchId })
      });
      if (res.ok) {
        const data = await res.json();
        addNotification('emerald', `Event ingested successfully: ${data.event.eventType}`);
        refreshData();
        return data;
      }
    } catch (e) {
      // Local offline ingestion
      const newEvent = {
        id: `e-${Date.now()}`,
        matchId: selectedMatchId,
        over: eventData.over || "Over 0.1",
        eventType: eventData.eventType || "Dot Ball",
        runs: parseInt(eventData.runs) || 0,
        batter: eventData.batter || "Virat Kohli",
        bowler: eventData.bowler || "Mitchell Starc",
        description: eventData.description || "Ball delivered. CEAT boundary banner visible.",
        timestamp: 400,
        momentum: parseInt(eventData.momentum) || 60
      };

      if (!LOCAL_EVENTS[selectedMatchId]) LOCAL_EVENTS[selectedMatchId] = [];
      LOCAL_EVENTS[selectedMatchId].push(newEvent);

      setMatchEvents(prev => [...prev, newEvent]);
      addNotification('emerald', `Ingestion Complete: Added ${newEvent.eventType} scorecard node.`);
      
      // Re-calculate local analytics
      setAnalytics(calculateLocalROI(selectedMatchId));
      return { event: newEvent };
    }
  };

  return (
    <AppStateContext.Provider value={{
      user,
      matches,
      sponsors,
      selectedMatchId,
      setSelectedMatchId,
      selectedSponsorId,
      setSelectedSponsorId,
      selectedEventId,
      setSelectedEventId,
      activeEventDetails,
      matchEvents,
      analytics,
      loading,
      notifications,
      copilotHistory,
      assistantHistory,
      isAssistantOpen,
      setIsAssistantOpen,
      login,
      signup,
      logout,
      sendCopilotMessage,
      sendAssistantMessage,
      ingestMatchEvent,
      refreshData,
      addNotification
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
