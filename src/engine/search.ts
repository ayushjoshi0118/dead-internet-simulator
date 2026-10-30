// Fictional search engine logic

export interface SearchResult {
  url: string;
  title: string;
  description: string;
  tags: string[];
}

const DIRECTORY: SearchResult[] = [
  {
    url: 'altavault://search',
    title: 'AltaVault Search — Find It Before It\'s Gone',
    description: 'The internet\'s most reliable indexer. Now with Boolean support!',
    tags: ['search', 'directory', 'index'],
  },
  {
    url: 'hollow://webring',
    title: 'The Hollow Webring — Connected Minds',
    description: 'A community of thinkers, researchers, and truth-seekers linked together.',
    tags: ['webring', 'community', 'links', 'directory'],
  },
  {
    url: 'geocit://elara',
    title: "Elara's Corner — Personal Homepage",
    description: "Dr. Elara Valdris's personal web space. Last updated 2002.",
    tags: ['personal', 'homepage', 'valdris', 'elara', 'science'],
  },
  {
    url: 'usenet://sci.research.network',
    title: 'USENET Mirror — sci.research.network',
    description: 'Archived discussion threads from the sci.research.network newsgroup. 1999–2004.',
    tags: ['usenet', 'forum', 'research', 'discussion', 'archive'],
  },
  {
    url: 'blog://marcus-fenn',
    title: "Marcus Fenn's Notebook — Thoughts from the Inside",
    description: "Personal blog of Marcus Fenn, research assistant at the Valdris Institute. Archived.",
    tags: ['blog', 'personal', 'marcus', 'institute', 'research'],
  },
  {
    url: 'valdris://home',
    title: 'Valdris Institute — Advancing Network Consciousness Research',
    description: 'Official homepage of the Valdris Institute for Advanced Network Studies.',
    tags: ['institute', 'research', 'valdris', 'science', 'network'],
  },
  {
    url: 'valdris://restricted',
    title: 'Valdris Institute — Restricted Research Archive',
    description: '[ACCESS RESTRICTED] Internal research documents. Personnel only.',
    tags: ['institute', 'restricted', 'archive', 'research'],
  },
  {
    url: 'ciphex://terminal',
    title: 'CipheX Terminal — Cryptographic Tools Online',
    description: 'Online cipher tools and encoding utilities. Caesar, Vigenère, and more.',
    tags: ['cipher', 'crypto', 'tools', 'encode', 'decode'],
  },
  {
    url: 'news://daily-packet',
    title: 'The Daily Packet — Technology & Network News Archive',
    description: 'Archived tech news from 1997–2006. The internet remembers.',
    tags: ['news', 'archive', 'technology', 'internet', 'history'],
  },
  {
    url: 'room://404',
    title: 'Room 404 — The Chat That Never Ended',
    description: 'An IRC-style chatroom frozen in time. The last messages were left in 2003.',
    tags: ['chat', 'irc', 'frozen', 'community', 'mysterious'],
  },
  {
    url: 'shrine://midnight',
    title: 'Midnight Shrine — In Memory of the Work',
    description: "A fan tribute to Dr. Valdris and her research into network consciousness.",
    tags: ['shrine', 'fan', 'valdris', 'tribute', 'believers'],
  },
  {
    url: 'endpoint://the-endpoint',
    title: 'THE ENDPOINT',
    description: '[CLASSIFIED] Access requires authorization code.',
    tags: ['endpoint', 'final', 'classified'],
  },
  {
    url: 'valdris://final-message',
    title: "Valdris — Final Message (Unlocked)",
    description: 'A recovered transmission from Dr. Valdris, 2002.',
    tags: ['valdris', 'message', 'recovered', 'final'],
  },
];

export function search(query: string): SearchResult[] {
  if (!query.trim()) return DIRECTORY.slice(0, 8);
  const q = query.toLowerCase().trim();
  return DIRECTORY.filter(
    r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.includes(q))
  );
}

export function getAllSites(): SearchResult[] {
  return DIRECTORY;
}
