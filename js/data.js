// ============================================================
// EKSU FRESHER'S CUP 3.0 — TOURNAMENT DATA
// Admin: edit this file to update all tournament info
// ============================================================

const DATA = {

  // ---- TEAMS ----
  teams: [
    { id: 1, name: "CPE United", dept: "Computer Engineering", group: "A", color: "#4ade80" },
    { id: 2, name: "EEE Sparks", dept: "Electrical Engineering", group: "A", color: "#f59e0b" },
    { id: 3, name: "MCT Eagles", dept: "MCT", group: "A", color: "#60a5fa" },
    { id: 4, name: "Agric Stars", dept: "Agriculture", group: "A", color: "#f87171" },
    { id: 5, name: "MECH Warriors", dept: "Mechanical Engineering", group: "B", color: "#a78bfa" },
    { id: 6, name: "Civil Rockers", dept: "Civil Engineering", group: "B", color: "#fb923c" },
    { id: 7, name: "Law FC", dept: "Law", group: "B", color: "#34d399" },
    { id: 8, name: "Sci Boys", dept: "Sciences", group: "B", color: "#e879f9" },
    { id: 9, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 10, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 11, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 12, name: "TBD", dept: "TBD", group: "C", color: "#94a3b8" },
    { id: 13, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
    { id: 14, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
    { id: 15, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
    { id: 16, name: "TBD", dept: "TBD", group: "D", color: "#94a3b8" },
  ],

  // ---- MATCHES ----
  // status: "live" | "ft" | "upcoming"
  matches: [
    { id: 1, home: 1, away: 2, homeScore: 2, awayScore: 1, status: "live", minute: "73", round: "Group A · MD2", date: "2026-05-17", time: "2:00 PM", venue: "Field A" },
    { id: 2, home: 5, away: 6, homeScore: 1, awayScore: 1, status: "ft", minute: "FT", round: "Group B · MD2", date: "2026-05-17", time: "12:00 PM", venue: "Field B" },
    { id: 3, home: 3, away: 4, homeScore: 3, awayScore: 0, status: "ft", minute: "FT", round: "Group A · MD1", date: "2026-05-15", time: "2:00 PM", venue: "Field A" },
    { id: 4, home: 3, away: 1, homeScore: 0, awayScore: 0, status: "upcoming", minute: "", round: "Group A · MD3", date: "2026-05-19", time: "2:00 PM", venue: "Field A" },
    { id: 5, home: 4, away: 2, homeScore: 0, awayScore: 0, status: "upcoming", minute: "", round: "Group A · MD3", date: "2026-05-19", time: "4:00 PM", venue: "Field B" },
    { id: 6, home: 7, away: 8, homeScore: 0, awayScore: 0, status: "upcoming", minute: "", round: "Group B · MD3", date: "2026-05-21", time: "2:00 PM", venue: "Field A" },
    { id: 7, home: 5, away: 8, homeScore: 2, awayScore: 0, status: "ft", minute: "FT", round: "Group B · MD1", date: "2026-05-15", time: "4:00 PM", venue: "Field B" },
    { id: 8, home: 6, away: 7, homeScore: 2, awayScore: 1, status: "ft", minute: "FT", round: "Group B · MD1", date: "2026-05-15", time: "12:00 PM", venue: "Field A" },
  ],

  // ---- SCORERS ----
  scorers: [
    { name: "Rasheyy", team: 1, jersey: 8, goals: 4, assists: 1 },
    { name: "D. Okafor", team: 3, jersey: 10, goals: 3, assists: 2 },
    { name: "T. Adeleke", team: 5, jersey: 7, goals: 2, assists: 1 },
    { name: "K. Ibrahim", team: 6, jersey: 9, goals: 2, assists: 0 },
    { name: "M. Salami", team: 7, jersey: 11, goals: 1, assists: 2 },
    { name: "A. Bello", team: 1, jersey: 5, goals: 1, assists: 0 },
  ],

  // ---- ANNOUNCEMENTS ----
  announcements: [
    { date: "May 17, 2026", text: "Welcome to EKSU Fresher's Cup 3.0! The official tournament hub is now live. Follow all the action here.", important: true },
    { date: "May 16, 2026", text: "All team registrations are confirmed. Group stage fixtures will be published shortly.", important: false },
    { date: "May 15, 2026", text: "Opening matches were played today. MCT Eagles and MECH Warriors both won their first matches!", important: false },
  ],

  // ---- STREAM ----
  stream: {
    isLive: false,
    youtubeUrl: "", // paste YouTube live URL here when streaming
    facebookUrl: "",
    nextMatchInfo: "Next: CPE United vs MCT Eagles — May 19, 2:00 PM"
  },

  // ---- MOTM ----
  motm: {
    matchId: 1,
    candidates: [
      { name: "Rasheyy #8", votes: 62 },
      { name: "A. Bello #5", votes: 24 },
      { name: "O. Musa #3", votes: 14 },
    ],
    previous: { name: "T. Adeleke", match: "MECH Warriors vs Sci Boys" }
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
  adminPassword: "fierce2026", // change this!

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
