/**
 * ⚠️ MOCK DATA — Milestone 1 only.
 *
 * Sample universities, groups, posts and comments that let every page render
 * before the database exists. Nothing here is persisted. This module is
 * replaced by real Supabase queries in Milestones 2–4 and then deleted.
 */
import type { Comment } from '@/features/comments/types'
import type { Group } from '@/features/groups/types'
import type { Post } from '@/features/posts/types'
import type { CurrentUser, PublicProfile } from '@/features/profile/types'
import type { University } from '@/features/universities/types'

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
}

export const mockCurrentUser: CurrentUser = {
  id: 'user-me',
  displayName: 'Alex Rivera',
  studentStatus: 'incoming',
  email: 'alex.rivera@example.edu',
  createdAt: '2026-09-01T15:00:00.000Z',
}

const me: PublicProfile = {
  id: mockCurrentUser.id,
  displayName: mockCurrentUser.displayName,
  studentStatus: mockCurrentUser.studentStatus,
}

const priya: PublicProfile = { id: 'user-priya', displayName: 'Priya Shah', studentStatus: 'current' }
const marcus: PublicProfile = { id: 'user-marcus', displayName: 'Marcus Lee', studentStatus: 'current' }
const sofia: PublicProfile = { id: 'user-sofia', displayName: 'Sofia Martinez', studentStatus: 'incoming' }
const jordan: PublicProfile = { id: 'user-jordan', displayName: 'Jordan Kim', studentStatus: 'current' }

export const mockUniversities: University[] = [
  { id: 1, name: 'University of Michigan-Ann Arbor', city: 'Ann Arbor', state: 'MI' },
  { id: 2, name: 'Georgia Institute of Technology', city: 'Atlanta', state: 'GA' },
  { id: 3, name: 'The University of Texas at Austin', city: 'Austin', state: 'TX' },
  { id: 4, name: 'University of California-Berkeley', city: 'Berkeley', state: 'CA' },
  { id: 5, name: 'University of Washington-Seattle Campus', city: 'Seattle', state: 'WA' },
  { id: 6, name: 'Ohio State University-Main Campus', city: 'Columbus', state: 'OH' },
  { id: 7, name: 'Purdue University-Main Campus', city: 'West Lafayette', state: 'IN' },
  { id: 8, name: 'University of North Carolina at Chapel Hill', city: 'Chapel Hill', state: 'NC' },
  { id: 9, name: 'University of Florida', city: 'Gainesville', state: 'FL' },
  { id: 10, name: 'Arizona State University Campus Immersion', city: 'Tempe', state: 'AZ' },
  { id: 11, name: 'Boston University', city: 'Boston', state: 'MA' },
  { id: 12, name: 'New York University', city: 'New York', state: 'NY' },
]

export const mockGroups: Group[] = mockUniversities.map((university) => ({
  id: `group-${university.id}`,
  university,
}))

/** Groups the mock user has joined. */
export const mockJoinedGroupIds: readonly string[] = ['group-1', 'group-2', 'group-3']

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    groupId: 'group-1',
    author: priya,
    title: 'Ask me anything about North Campus housing',
    body: "I've lived in Bursley and Baits II. Happy to answer questions about bus routes, dining halls, and which dorms are quieter for studying.",
    createdAt: hoursAgo(2),
    commentCount: 3,
  },
  {
    id: 'post-2',
    groupId: 'group-1',
    author: me,
    title: 'Incoming CS student: which intro courses should I take first?',
    body: 'I have AP credit for Calc AB. Is it better to start with EECS 183 or jump into EECS 280? Any advice on balancing it with a first-semester writing requirement?',
    createdAt: hoursAgo(9),
    commentCount: 2,
  },
  {
    id: 'post-3',
    groupId: 'group-1',
    author: marcus,
    title: 'Winter gear checklist for students from warm states',
    body: "Coming from Texas or Florida? Get a real parka, waterproof boots and good gloves before November. Thrift stores near campus have great options.",
    createdAt: hoursAgo(30),
    commentCount: 0,
  },
  {
    id: 'post-4',
    groupId: 'group-1',
    author: sofia,
    title: 'Looking for a roommate who likes early mornings',
    body: "I'm an incoming nursing student and an early riser. Anyone else looking for a roommate for fall?",
    createdAt: hoursAgo(76),
    commentCount: 0,
  },
  {
    id: 'post-5',
    groupId: 'group-2',
    author: jordan,
    title: 'Tips for surviving your first semester at Tech',
    body: 'Go to office hours early, use the CULC study rooms, and do not skip recitations. The workload ramps up fast after week four.',
    createdAt: hoursAgo(5),
    commentCount: 1,
  },
  {
    id: 'post-6',
    groupId: 'group-2',
    author: sofia,
    title: 'Is a car necessary in Atlanta?',
    body: 'Trying to decide whether to bring my car. How useful is MARTA and the campus shuttle?',
    createdAt: hoursAgo(48),
    commentCount: 0,
  },
]

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    author: sofia,
    body: 'Which dorm has the best dining hall nearby?',
    createdAt: hoursAgo(1.8),
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    author: priya,
    body: 'Bursley has its own dining hall, which is a big plus in winter!',
    createdAt: hoursAgo(1.5),
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    author: me,
    body: 'This is super helpful, thank you!',
    createdAt: hoursAgo(1),
  },
  {
    id: 'comment-4',
    postId: 'post-2',
    author: marcus,
    body: 'Start with EECS 183 if you have not programmed much before. 280 assumes you are comfortable with C++.',
    createdAt: hoursAgo(8),
  },
  {
    id: 'comment-5',
    postId: 'post-2',
    author: jordan,
    body: 'Agree with Marcus. Also check if your AP credit counts toward the Calc II prerequisite.',
    createdAt: hoursAgo(7),
  },
  {
    id: 'comment-6',
    postId: 'post-5',
    author: me,
    body: 'Thanks! Are the recitations recorded?',
    createdAt: hoursAgo(4),
  },
]
