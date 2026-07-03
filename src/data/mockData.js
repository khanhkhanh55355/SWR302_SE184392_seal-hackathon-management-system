export const initialData = {
  users: [
    { id: 1, fullName: "Nguyen Minh Anh", email: "team@seal.com", password: "123456", role: "TEAM", status: "Active" },
    { id: 2, fullName: "Le Thanh Mentor", email: "mentor@seal.com", password: "123456", role: "MENTOR", status: "Active" },
    { id: 3, fullName: "Pham Judge", email: "judge@seal.com", password: "123456", role: "JUDGE", status: "Active" },
    { id: 4, fullName: "SEAL Coordinator", email: "coordinator@seal.com", password: "123456", role: "COORDINATOR", status: "Active" },
    { id: 5, fullName: "System Admin", email: "admin@seal.com", password: "123456", role: "ADMIN", status: "Active" },
    { id: 6, fullName: "Tran Gia Huy", email: "huy@student.fpt.edu.vn", password: "123456", role: "TEAM", status: "Active" },
    { id: 7, fullName: "Dr. Guest Judge", email: "guestjudge@seal.com", password: "123456", role: "JUDGE", status: "Active" }
  ],
  events: [
    { id: 1, eventName: "SEAL Spring Hackathon 2026", description: "Software Engineering Agile League Spring event", startDate: "2026-06-10", endDate: "2026-06-25", status: "Registration Open" },
    { id: 2, eventName: "SEAL Summer Challenge 2026", description: "Summer hackathon for software engineering students", startDate: "2026-08-05", endDate: "2026-08-20", status: "Scoring" }
  ],
  rounds: [
    { id: 1, eventId: 1, roundName: "Registration", startTime: "2026-06-10 08:00", endTime: "2026-06-15 23:59", status: "Open" },
    { id: 2, eventId: 1, roundName: "Final Submission", startTime: "2026-06-16 08:00", endTime: "2026-06-22 23:59", status: "Upcoming" },
    { id: 3, eventId: 2, roundName: "Final Scoring", startTime: "2026-08-12 08:00", endTime: "2026-08-18 23:59", status: "Open" }
  ],
  teams: [
    { id: 1, eventId: 1, leaderId: 1, teamName: "Code Seals", projectIdea: "AI Study Hub for students", status: "Submitted" },
    { id: 2, eventId: 1, leaderId: 6, teamName: "Bug Busters", projectIdea: "Hackathon scheduler and mentor tracking", status: "In Progress" },
    { id: 3, eventId: 2, leaderId: 1, teamName: "Agile Wolves", projectIdea: "Judge scoring consistency dashboard", status: "Scored" }
  ],
  teamMembers: [
    { id: 1, teamId: 1, userId: 1, memberRole: "Leader" },
    { id: 2, teamId: 1, userId: 6, memberRole: "Developer" },
    { id: 3, teamId: 2, userId: 6, memberRole: "Leader" }
  ],
  mentorAssignments: [
    { id: 1, mentorId: 2, teamId: 1 },
    { id: 2, mentorId: 2, teamId: 2 }
  ],
  submissions: [
    { id: 1, teamId: 1, roundId: 2, projectTitle: "AI Study Hub", repositoryUrl: "https://github.com/code-seals/ai-study-hub", demoUrl: "https://demo.ai-study-hub.local", status: "Submitted" },
    { id: 2, teamId: 2, roundId: 2, projectTitle: "Hackathon Scheduler", repositoryUrl: "https://github.com/bug-busters/scheduler", demoUrl: "", status: "Draft" },
    { id: 3, teamId: 3, roundId: 3, projectTitle: "JudgeSync", repositoryUrl: "https://github.com/agile-wolves/judgesync", demoUrl: "https://demo.judgesync.local", status: "Scored" }
  ],
  judgeAssignments: [
    { id: 1, judgeId: 3, submissionId: 1, status: "Assigned" },
    { id: 2, judgeId: 7, submissionId: 1, status: "Assigned" },
    { id: 3, judgeId: 3, submissionId: 3, status: "Scored" }
  ],
  scores: [
    { id: 1, judgeAssignmentId: 3, criterion: "Technical Quality", scoreValue: 22, comment: "Stable prototype and clear architecture." },
    { id: 2, judgeAssignmentId: 3, criterion: "Innovation", scoreValue: 21, comment: "Good focus on evaluation consistency." },
    { id: 3, judgeAssignmentId: 3, criterion: "Presentation", scoreValue: 14, comment: "Clear demo." }
  ],
  feedback: [
    { id: 1, mentorId: 2, teamId: 1, content: "Clarify the main workflow and improve the demo script.", createdAt: "2026-06-16 09:20" },
    { id: 2, mentorId: 2, teamId: 2, content: "Add a clear role-based permission flow before final submission.", createdAt: "2026-06-17 14:10" }
  ],
  auditLogs: [
    { id: 1, userId: 4, action: "Configured SEAL Spring Hackathon 2026", createdAt: "2026-06-10 08:35" },
    { id: 2, userId: 3, action: "Submitted score for JudgeSync", createdAt: "2026-06-18 10:05" },
    { id: 3, userId: 5, action: "Updated user role", createdAt: "2026-06-18 15:25" }
  ],
  conflicts: [
    { id: 1, judgeId: 7, submissionId: 2, reason: "Previously mentored one member of the team.", status: "Pending Review" }
  ],
  calibration: [
    { id: 1, judgeId: 3, status: "Completed", score: 86, note: "Judge calibrated successfully." }
  ],
  leaderboardPublished: true
};
