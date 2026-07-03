export function findById(list, id) {
  return list.find((item) => Number(item.id) === Number(id));
}

export function teamName(data, teamId) {
  return findById(data.teams, teamId)?.teamName || "Unknown Team";
}

export function userName(data, userId) {
  return findById(data.users, userId)?.fullName || "Unknown User";
}

export function eventName(data, eventId) {
  return findById(data.events, eventId)?.eventName || "Unknown Event";
}

export function submissionTitle(data, submissionId) {
  return findById(data.submissions, submissionId)?.projectTitle || "Unknown Submission";
}

export function calculateSubmissionScore(data, submissionId) {
  const assignments = data.judgeAssignments.filter((a) => Number(a.submissionId) === Number(submissionId));
  const assignmentIds = assignments.map((a) => a.id);
  const scores = data.scores.filter((s) => assignmentIds.includes(Number(s.judgeAssignmentId)));
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, s) => sum + Number(s.scoreValue), 0) / assignments.length);
}
