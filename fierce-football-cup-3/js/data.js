// ============================================================
// EKSU FRESHER'S CUP 3.0 — TOURNAMENT DATA
// Admin: edit this file to update all tournament info
// ============================================================

const DATA = {

  // ---- TEAMS ----
  teams: [
    // Group A
    { id: 1,  name: "ACC",       dept: "Accounting",              group: "A", color: "#4ade80" },
    { id: 2,  name: "KHE",       dept: "Health Education",        group: "A", color: "#f59e0b" },
    { id: 3,  name: "STAT",      dept: "Statistics",              group: "A", color: "#60a5fa" },
    { id: 4,  name: "MECH ENGR", dept: "Mechanical Engineering",  group: "A", color: "#f87171" },
    { id: 5,  name: "BCH",       dept: "Biochemistry",            group: "A", color: "#a78bfa" },
    { id: 6,  name: "GEO",       dept: "Geography",               group: "A", color: "#fb923c" },
    // Groups B/C/D — TBD until confirmed
    { id: 7,  name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 8,  name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 9,  name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 10, name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 11, name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 12, name: "TBD", dept: "TBD", group: "B", color: "#94a3b8" },
    { id: 13, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 14, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 15, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
    { id: 16, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
  ],

  // ---- MATCHES ----
  // status: "live" | "ft" | "upcoming"
  matches: [
    // DAY 1 — June 12, 2026 (Group A)
    { id: 1, home: 1, away: 2, homeScore: 0, awayScore: 1, status: "live", minute: "", round: "Group A · MD1", date: "2026-06-12", time: "8:30 AM", venue: "EKSU School Field" },
    { id: 2, home: 3, away: 4, homeScore: 0, awayScore: 0, status: "upcoming", minute: "", round: "Group A · MD1", date: "2026-06-12", time: "9:45 AM", venue: "EKSU School Field" },
    { id: 3, home: 5, away: 6, homeScore: 0, awayScore: 0, status: "upcoming", minute: "", round: "Group A · MD1", date: "2026-06-12", time: "11:00 AM", venue: "EKSU School Field" },
  ],

  // ---- SCORERS ----
  scorers: [],

  // ---- ANNOUNCEMENTS ----
  announcements: [
    { date: "June 12, 2026", text: "🔴 LIVE: ACC vs KHE — KHE lead 1-0! Group A action is underway at EKSU School Field!", important: true },
    { date: "June 12, 2026", text: "🔥 IT'S MATCHDAY! Fresher's Cup 3.0 Day 1 is here. Three Group A battles today — come out in your colours!", important: false },
  ],

  // ---- STREAM ----
  stream: {
    isLive: false,
    youtubeUrl: "",
    facebookUrl: "",
    nextMatchInfo: "Next: STAT vs MECH ENGR — June 12, 9:45 AM"
  },

  // ---- MOTM ----
  motm: {
    matchId: null,
    candidates: [],
    previous: null
  },

  // ---- BRACKET ----
  bracket: {
    qf: [
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
    ],
    sf: [
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
      { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
    ],
    final: { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
    champion: null,
    thirdPlace: { home: "TBD", away: "TBD", homeScore: null, awayScore: null },
  },

  // ---- ADMIN PASSWORD ----
  adminPassword: "fierce2026",

};

// Helper: get team by id
function getTeam(id) {
  return DATA.teams.find(t => t.id === id) || { name: "TBD", dept: "", color: "#94a3b8" };
}

// Helper: compute standings for a group
function getStandings(group) {
  const teams = DATA.teams.filter(t => t.group === group);
  const table = teams.map(t => ({ ...t, p:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0, form:[] }));

  DATA.matches.forEach(m => {
    if (m.status === "upcoming") return;
    const home = table.find(t => t.id === m.home);
    const away = table.find(t => t.id === m.away);
    if (!home || !away) return;
    home.p++; away.p++;
    home.gf += m.homeScore; home.ga += m.awayScore;
    away.gf += m.awayScore; away.ga += m.homeScore;
    if (m.homeScore > m.awayScore) {
      home.w++; home.pts += 3; home.form.push("W");
      away.l++; away.form.push("L");
    } else if (m.homeScore < m.awayScore) {
      away.w++; away.pts += 3; away.form.push("W");
      home.l++; home.form.push("L");
    } else {
      home.d++; home.pts++; home.form.push("D");
      away.d++; away.pts++; away.form.push("D");
    }
    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;
  });

  return table.sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}
