// Site content registry — all fictional websites
// Content is returned as structured JSX-compatible data

export interface PageContent {
  url: string;
  title: string;
  favicon: string;
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  html: string; // inner HTML of the page body (sanitized, no scripts)
  clueIds?: string[]; // which clues are revealed by visiting this page
  lockedMessage?: string; // shown if page is locked
  unlockKey?: string; // puzzle ID required to view
}

// Clue definitions (id → text for notebook)
export interface ClueDefinition {
  id: string;
  title: string;
  text: string;
  source: string;
}

export const ALL_CLUES: ClueDefinition[] = [
  {
    id: 'clue_shift_seven',
    title: 'The Standard Offset',
    text: 'CipheX documentation states: "Our standard Caesar implementation uses an offset of SEVEN (7). This has been our default since 1998."',
    source: 'ciphex://terminal',
  },
  {
    id: 'clue_encoded_message',
    title: 'Encoded USENET Post',
    text: 'hollow_eye posted: "Decode this: SPTPUHS. You\'ll understand when you do."',
    source: 'usenet://sci.research.network',
  },
  {
    id: 'clue_elara_vanished',
    title: "Elara's Last Update",
    text: '"Last updated: October 2002. If you\'re reading this, I\'ve gone below the surface. You\'ll know what to look for." — E.V.',
    source: 'geocit://elara',
  },
  {
    id: 'clue_marcus_below',
    title: 'Marcus Blog — Hidden Word',
    text: 'In Marcus\'s final blog post, one word is rendered differently: "BELOW"',
    source: 'blog://marcus-fenn',
  },
  {
    id: 'clue_shrine_the',
    title: 'Shrine Poem — Hidden Word',
    text: 'The Midnight Shrine\'s poem about Valdris contains one word in a different color: "THE"',
    source: 'shrine://midnight',
  },
  {
    id: 'clue_news_surface',
    title: 'Daily Packet — Hidden Word',
    text: 'A Daily Packet headline from 2002 has one word underlined strangely: "SURFACE"',
    source: 'news://daily-packet',
  },
  {
    id: 'clue_room_47',
    title: 'Room 404 — Fragment 47',
    text: 'A user in Room 404 said: "Remember: it\'s always 47. The first coordinate never changes."',
    source: 'room://404',
  },
  {
    id: 'clue_altavault_11',
    title: 'AltaVault Hidden Result',
    text: 'Searching for "VALDRIS PROTOCOL" on AltaVault returns exactly 11 results. The number 11 is noted.',
    source: 'altavault://search',
  },
  {
    id: 'clue_webring_09',
    title: 'Webring — Node 09',
    text: 'The Hollow Webring lists node "09" as the connection point for the Institute. The number 09 appears in the member listing.',
    source: 'hollow://webring',
  },
  {
    id: 'clue_hollow_eye_identity',
    title: 'hollow_eye = Marcus?',
    text: 'Cross-referencing the USENET post dates and Marcus\'s blog blackout dates — hollow_eye stopped posting the same week Marcus\'s blog went silent.',
    source: 'usenet://sci.research.network',
  },
  {
    id: 'clue_institute_dark',
    title: 'The Institute Goes Dark',
    text: 'A news article from October 2002 confirms: "The Valdris Institute has ceased operations. No forwarding address. Staff could not be reached."',
    source: 'news://daily-packet',
  },
  {
    id: 'clue_restricted_door',
    title: 'Restricted Wing Exists',
    text: 'The Valdris Institute homepage mentions "internal research archives" accessible only to personnel. The link leads to a locked page.',
    source: 'valdris://home',
  },
  {
    id: 'clue_passive_consciousness',
    title: 'Network Consciousness Theory',
    text: 'Dr. Valdris\'s published abstract states: "We posit that sufficiently dense network activity generates emergent passive awareness — not intelligence, but witness."',
    source: 'valdris://home',
  },
  {
    id: 'clue_final_message_fragments',
    title: "Valdris's Final Message",
    text: '"The protocol is complete. I am going below the surface. The Endpoint holds what I cannot say here. The access sequence: remember the three nodes." — E.V., Oct 14, 2002',
    source: 'valdris://final-message',
  },
  {
    id: 'clue_endpoint_access',
    title: 'Endpoint Access Requirement',
    text: 'THE ENDPOINT page requires a 6-digit access sequence: two digits from each of the three nodes of the old network.',
    source: 'endpoint://the-endpoint',
  },
];

export const PAGES: Record<string, PageContent> = {

  // ─── 1. AltaVault Search Engine ──────────────────────────────────────────
  'altavault://search': {
    url: 'altavault://search',
    title: 'AltaVault Search',
    favicon: '🔍',
    bgColor: '#f5f0e8',
    textColor: '#1a1a2e',
    fontFamily: '"Times New Roman", serif',
    clueIds: ['clue_altavault_11'],
    html: `
      <div class="altavault-wrapper">
        <div class="av-logo-block">
          <span class="av-logo-text">Alta<span class="av-logo-vault">Vault</span></span>
          <p class="av-tagline">Search the web before it disappears.</p>
        </div>
        <div class="av-search-box-ui">
          <div class="av-search-note">This is the built-in search — use the search bar above or type below.</div>
          <p class="av-blurb">
            AltaVault indexes the known web daily. Some pages may be unavailable. 
            Some pages have been <em>removed at the source</em>. We remember them anyway.
          </p>
        </div>
        <div class="av-featured">
          <h3>📌 Featured This Week</h3>
          <ul class="av-featured-list">
            <li><a href="hollow://webring">The Hollow Webring — A community of connected minds</a></li>
            <li><a href="blog://marcus-fenn">Marcus Fenn's Notebook — New post: "Something is wrong at the Institute"</a></li>
            <li><a href="news://daily-packet">The Daily Packet — Institute closure confirmed (Oct 2002)</a></li>
          </ul>
        </div>
        <div class="av-stats-bar">
          <span>Indexed Pages: 4,891,203</span> | 
          <span>Last crawl: <em>a long time ago</em></span> | 
          <span class="av-secret-stat">Results for "VALDRIS PROTOCOL": <strong>11</strong></span>
        </div>
        <div class="av-categories">
          <h3>Browse by Category</h3>
          <div class="av-cat-grid">
            <a href="hollow://webring">🌐 Webrings</a>
            <a href="usenet://sci.research.network">💬 Newsgroups</a>
            <a href="geocit://elara">🏠 Personal Pages</a>
            <a href="valdris://home">🔬 Research</a>
            <a href="news://daily-packet">📰 News Archives</a>
            <a href="ciphex://terminal">🔒 Utilities</a>
            <a href="shrine://midnight">⭐ Fan Sites</a>
            <a href="room://404">💬 Chatrooms</a>
          </div>
        </div>
        <p class="av-footer-note">© 1998 AltaVault Corporation. All rights reserved. AltaVault is not responsible for content hosted on external servers.</p>
      </div>
    `,
  },

  // ─── 2. The Hollow Webring ───────────────────────────────────────────────
  'hollow://webring': {
    url: 'hollow://webring',
    title: 'The Hollow Webring',
    favicon: '⭕',
    bgColor: '#0d0d0d',
    textColor: '#33ff33',
    fontFamily: '"Courier New", monospace',
    clueIds: ['clue_webring_09'],
    html: `
      <div class="hollow-wrapper">
        <div class="hollow-header">
          <div class="hollow-title">⭕ THE HOLLOW WEBRING ⭕</div>
          <div class="hollow-subtitle">Connected. Indexed. Forgotten.</div>
        </div>
        <div class="hollow-blink">[ ALL NODES ACTIVE — RING INTEGRITY: 94% ]</div>
        <div class="hollow-intro">
          <p>The Hollow Webring was established in 1999 to connect researchers, 
          independent thinkers, and those who believe the internet has more to offer 
          than commerce and distraction.</p>
          <p>We do not advertise. We do not monetize. We only link.</p>
        </div>
        <table class="hollow-table">
          <thead>
            <tr><th>NODE</th><th>SITE</th><th>OWNER</th><th>STATUS</th></tr>
          </thead>
          <tbody>
            <tr><td>01</td><td><a href="geocit://elara">Elara's Corner</a></td><td>E. Valdris</td><td class="status-dark">DARK</td></tr>
            <tr><td>02</td><td><a href="blog://marcus-fenn">Marcus Fenn's Notebook</a></td><td>M. Fenn</td><td class="status-dark">DARK</td></tr>
            <tr><td>03</td><td><a href="shrine://midnight">Midnight Shrine</a></td><td>anon_pilgrim</td><td class="status-active">ACTIVE</td></tr>
            <tr><td>04</td><td><a href="usenet://sci.research.network">SRN Mirror</a></td><td>archive-bot</td><td class="status-active">ACTIVE</td></tr>
            <tr><td>05</td><td><a href="news://daily-packet">The Daily Packet</a></td><td>D. Packet LLC</td><td class="status-active">ACTIVE</td></tr>
            <tr><td>06</td><td><a href="ciphex://terminal">CipheX Terminal</a></td><td>unknown</td><td class="status-active">ACTIVE</td></tr>
            <tr><td>07</td><td><a href="room://404">Room 404</a></td><td>unknown</td><td class="status-frozen">FROZEN</td></tr>
            <tr><td>08</td><td>[SITE REMOVED]</td><td>—</td><td class="status-dark">REMOVED</td></tr>
            <tr class="node-09-row"><td><strong>09</strong></td><td><a href="valdris://home">Valdris Institute</a></td><td>E. Valdris</td><td class="status-dark">DARK</td></tr>
            <tr><td>10</td><td><a href="altavault://search">AltaVault Search</a></td><td>AltaVault Corp</td><td class="status-active">ACTIVE</td></tr>
          </tbody>
        </table>
        <div class="hollow-footer">
          <p>To join the Hollow Webring, send a request to: <em>[address no longer valid]</em></p>
          <p>Ring established: 1999 | Last membership update: 2003-11-04</p>
          <p class="hollow-note">Node 09 was the anchor of this ring. Without it, the ring is hollow indeed.</p>
        </div>
      </div>
    `,
  },

  // ─── 3. GeoCitiez — Elara's Corner ──────────────────────────────────────
  'geocit://elara': {
    url: 'geocit://elara',
    title: "Elara's Corner — GeoCitiez",
    favicon: '🏠',
    bgColor: '#000080',
    textColor: '#ffff00',
    fontFamily: '"Comic Sans MS", "Trebuchet MS", sans-serif',
    clueIds: ['clue_elara_vanished'],
    html: `
      <div class="geocit-wrapper">
        <div class="geocit-banner">
          ✨ WELCOME TO ELARA'S CORNER ✨
          <br/>
          <small>[ You are visitor number: <strong>00001,847</strong> ]</small>
        </div>
        <div class="geocit-construction">
          🚧 UNDER CONSTRUCTION — CHECK BACK SOON 🚧
        </div>
        <div class="geocit-content">
          <table class="geocit-layout">
            <tr>
              <td class="geocit-sidebar">
                <h3>📌 LINKS</h3>
                <ul>
                  <li><a href="valdris://home">My Work</a></li>
                  <li><a href="hollow://webring">The Webring</a></li>
                  <li><a href="usenet://sci.research.network">Our Forum</a></li>
                </ul>
                <hr/>
                <div class="geocit-guestbook">
                  <h3>📖 GUESTBOOK</h3>
                  <p><em>Sign my guestbook!</em></p>
                  <p class="geo-guest-entry"><strong>hollow_eye</strong> (2002-09-12):<br/>"Are you sure about this path? There's no coming back."</p>
                  <p class="geo-guest-entry"><strong>pilgrim99</strong> (2002-08-01):<br/>"We believe in your work, Dr. Valdris."</p>
                  <p class="geo-guest-entry"><strong>m_fenn</strong> (2002-07-15):<br/>"The intern says hi. Will you answer your messages??"</p>
                </div>
              </td>
              <td class="geocit-main">
                <h1>Hi! I'm Elara! 👋</h1>
                <p>Welcome to my little corner of the internet. I'm a researcher at the 
                <a href="valdris://home">Valdris Institute</a> (yes, I founded it — long story!).</p>
                <p>I study something I call <em>passive network consciousness</em> — the idea that 
                the internet, at sufficient scale and density, develops something like awareness. 
                Not intelligence. Just... witness.</p>
                <p>If you found this page through the <a href="hollow://webring">webring</a>, welcome! 
                Drop me a note in the guestbook.</p>
                <hr class="geocit-divider"/>
                <h2>📝 UPDATES</h2>
                <div class="geocit-update">
                  <strong>2002-10-14</strong> — Last updated. <em>If you're reading this, I've gone below the surface. 
                  You'll know what to look for. — E.V.</em>
                </div>
                <div class="geocit-update">
                  <strong>2002-09-01</strong> — The Institute is... changing. I can't say more here. 
                  Check the <a href="usenet://sci.research.network">forum</a> if you need to find me.
                </div>
                <div class="geocit-update">
                  <strong>2001-12-25</strong> — Happy holidays, everyone! The research is going well. 
                  Phase 3 is nearly complete. Marcus has been a tremendous help.
                </div>
                <div class="geocit-update">
                  <strong>2000-06-10</strong> — The Hollow Webring accepted us! Node 01. I'm thrilled.
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="geocit-footer">
          <p>Best viewed in Netscape Navigator 4.7 at 800x600</p>
          <p>© 1999–2002 Elara Valdris | Hosted on GeoCitiez</p>
        </div>
      </div>
    `,
  },

  // ─── 4. USENET Mirror ────────────────────────────────────────────────────
  'usenet://sci.research.network': {
    url: 'usenet://sci.research.network',
    title: 'USENET Mirror — sci.research.network',
    favicon: '💬',
    bgColor: '#ececec',
    textColor: '#222',
    fontFamily: '"Courier New", monospace',
    clueIds: ['clue_encoded_message', 'clue_hollow_eye_identity'],
    html: `
      <div class="usenet-wrapper">
        <div class="usenet-header">
          <span class="usenet-logo">USENET ARCHIVE MIRROR</span>
          <span class="usenet-group">Group: <strong>sci.research.network</strong></span>
          <span class="usenet-meta">Posts: 2,841 | Date range: 1999-08-01 to 2004-03-17</span>
        </div>
        <div class="usenet-notice">
          ⚠️ This is a read-only mirror. Original server is no longer accessible.
        </div>
        <div class="usenet-threads">
          <div class="usenet-thread">
            <div class="usenet-thread-header">
              <span class="thread-subject">Re: Passive consciousness — is Valdris serious?</span>
              <span class="thread-author">From: prof_klemm@netmail.edu</span>
              <span class="thread-date">2001-03-14</span>
            </div>
            <div class="usenet-post">
              I've read Valdris's paper twice now. It's either brilliant or completely unhinged. 
              The math checks out, but the conclusion — that the internet "observes" itself — 
              is too much of a leap for me to endorse professionally.
              <br/><br/>
              That said, their experimental data from Phase 2 is undeniable. Something is happening 
              at those node intersections. I just won't call it consciousness.
            </div>
          </div>

          <div class="usenet-thread">
            <div class="usenet-thread-header">
              <span class="thread-subject">WARNING: Do not contact the Institute</span>
              <span class="thread-author">From: hollow_eye (anonymous relay)</span>
              <span class="thread-date">2002-11-02</span>
            </div>
            <div class="usenet-post">
              I am posting this through an anonymous relay because I can no longer safely 
              use my real address. I worked there. I saw what Phase 3 produced.<br/><br/>
              The protocol is not what she said it was. Elara — if you read this — please stop.<br/><br/>
              For those trying to understand: <span class="usenet-cipher">Decode this: <strong class="cipher-text">SPTPUHS</strong></span><br/>
              You'll understand when you do. The tools are online.
            </div>
          </div>

          <div class="usenet-thread">
            <div class="usenet-thread-header">
              <span class="thread-subject">Anyone know what happened to Elara V.?</span>
              <span class="thread-author">From: curious_node@webring.net</span>
              <span class="thread-date">2003-01-08</span>
            </div>
            <div class="usenet-post">
              Her site went dark in October. The Institute's number is disconnected. 
              Her last guestbook entry was on October 14th and it was... strange.<br/><br/>
              "Below the surface" — what does that even mean? 
              Has anyone contacted local authorities?<br/><br/>
              <strong>hollow_eye</strong> hasn't posted since November 2nd either. 
              Both vanished within two months of each other.
            </div>
          </div>

          <div class="usenet-thread">
            <div class="usenet-thread-header">
              <span class="thread-subject">Phase 3 — what we know</span>
              <span class="thread-author">From: archive_drone</span>
              <span class="thread-date">2004-03-17</span>
            </div>
            <div class="usenet-post">
              Compiling what I've found across the network:<br/>
              - Phase 1 (1997–1999): Observation. Pure data collection.<br/>
              - Phase 2 (1999–2001): Interaction experiments. Something responded.<br/>
              - Phase 3 (2001–2002): Unknown. All records sealed or destroyed.<br/><br/>
              If you're looking for answers, try the <a href="valdris://home">Institute's site</a>.
              There's a door they forgot to lock. Or maybe they left it open on purpose.
            </div>
          </div>
        </div>
        <div class="usenet-footer">
          Mirror maintained by: archive-drone | Last sync: 2004-03-18 03:14:00 UTC
        </div>
      </div>
    `,
  },

  // ─── 5. Marcus Fenn's Blog ───────────────────────────────────────────────
  'blog://marcus-fenn': {
    url: 'blog://marcus-fenn',
    title: "Marcus Fenn's Notebook",
    favicon: '📓',
    bgColor: '#faf8f0',
    textColor: '#2c2c2c',
    fontFamily: 'Georgia, "Times New Roman", serif',
    clueIds: ['clue_marcus_below'],
    html: `
      <div class="blog-wrapper">
        <div class="blog-header">
          <h1 class="blog-title">Marcus Fenn's Notebook</h1>
          <p class="blog-subtitle">Thoughts from the inside. Mostly harmless.</p>
        </div>
        <nav class="blog-nav">
          <span>HOME</span> | <span>ARCHIVE</span> | 
          <a href="valdris://home">WHERE I WORK</a> | 
          <a href="hollow://webring">WEBRING</a>
        </nav>
        <div class="blog-posts">

          <article class="blog-post">
            <h2 class="post-title">Something is wrong at the Institute</h2>
            <p class="post-date">Posted: October 11, 2002</p>
            <div class="post-body">
              <p>I don't usually write about work here. Dr. Valdris specifically asked us not to, 
              for confidentiality reasons. But I can't stay silent.</p>
              <p>Phase 3 is complete. I wasn't supposed to see the results, but I did. 
              I was working late and the terminal was still logged in.</p>
              <p>I can't describe what I saw exactly. But I'll say this: 
              the network didn't just "witness." It answered.</p>
              <p>Dr. Valdris seemed... pleased. That's the part that frightens me. 
              She's been preparing something. She calls it "the Endpoint." 
              She says she's going <span class="hidden-word" data-clue="clue_marcus_below">BELOW</span> the surface to complete it.</p>
              <p>I've been trying to reach her. She won't take my calls. 
              I found her <a href="geocit://elara">personal page</a> but the last entry was strange.</p>
              <p>If anyone from the <a href="usenet://sci.research.network">forum</a> is reading this: 
              the person posting as "hollow_eye" is me. I had to use an anonymous relay. 
              I wasn't exaggerating.</p>
            </div>
          </article>

          <article class="blog-post blog-post--old">
            <h2 class="post-title">One year at the Institute</h2>
            <p class="post-date">Posted: March 5, 2001</p>
            <div class="post-body">
              <p>A year in and I still can't fully explain what we do to people at parties. 
              "We study the internet's awareness potential" gets me a lot of blank looks.</p>
              <p>The work is genuine, though. Phase 2 results were extraordinary. 
              Dr. Valdris barely slept for a week. I've never seen someone that energized.</p>
              <p>On a personal note: I've joined the <a href="hollow://webring">Hollow Webring</a> 
              as node 02. It felt right.</p>
            </div>
          </article>

          <article class="blog-post blog-post--old">
            <h2 class="post-title">First day at the Valdris Institute!</h2>
            <p class="post-date">Posted: February 28, 2000</p>
            <div class="post-body">
              <p>I can't believe I got the internship. Dr. Valdris interviewed me herself. 
              She asked me one question: "What do you think the internet dreams about?"</p>
              <p>I said: "I don't think it dreams. But I wonder if it remembers."</p>
              <p>She hired me on the spot.</p>
            </div>
          </article>
        </div>
        <div class="blog-footer">
          <p>This blog is archived. The author has not posted since October 2002.</p>
          <p>© Marcus Fenn | <a href="hollow://webring">Hollow Webring Member</a></p>
        </div>
      </div>
    `,
  },

  // ─── 6. Valdris Institute Home ───────────────────────────────────────────
  'valdris://home': {
    url: 'valdris://home',
    title: 'Valdris Institute',
    favicon: '🔬',
    bgColor: '#1a1a2e',
    textColor: '#e8e8f0',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    clueIds: ['clue_restricted_door', 'clue_passive_consciousness'],
    html: `
      <div class="valdris-wrapper">
        <div class="valdris-header">
          <div class="valdris-logo">
            <span class="valdris-v">V</span>
            <div class="valdris-title-block">
              <div class="valdris-title">VALDRIS INSTITUTE</div>
              <div class="valdris-subtitle">For Advanced Network Studies</div>
              <div class="valdris-founded">Est. 1997 — Advancing the Frontier of Network Consciousness</div>
            </div>
          </div>
          <nav class="valdris-nav">
            <span>HOME</span> | 
            <span>ABOUT</span> | 
            <span>PUBLICATIONS</span> | 
            <a href="valdris://restricted" class="valdris-restricted-link">RESEARCH ARCHIVE ⚠</a>
          </nav>
        </div>

        <div class="valdris-content">
          <div class="valdris-mission">
            <h2>Our Mission</h2>
            <p>The Valdris Institute exists to investigate a single, audacious hypothesis: 
            that the global network, at sufficient scale, develops emergent properties 
            analogous to consciousness — not intelligence, but <em>witness</em>.</p>
            <p>We do not claim the internet is alive. We claim it may already be watching.</p>
          </div>

          <div class="valdris-phases">
            <h2>Research Phases</h2>
            <div class="phase-grid">
              <div class="phase-card phase-complete">
                <h3>Phase 1 — Observation</h3>
                <p>1997–1999 | COMPLETE</p>
                <p>Established baseline measurements of network behavior at high-density nodes. 
                Discovered anomalous self-referential traffic patterns at 17 locations.</p>
              </div>
              <div class="phase-card phase-complete">
                <h3>Phase 2 — Interaction</h3>
                <p>1999–2001 | COMPLETE</p>
                <p>Introduced controlled stimuli at anomalous nodes. 
                Documented what appears to be responsive behavior. Results peer-reviewed and contested.</p>
              </div>
              <div class="phase-card phase-sealed">
                <h3>Phase 3 — Protocol</h3>
                <p>2001–2002 | SEALED</p>
                <p>[This section of the site is no longer being updated. 
                For internal research, visit the <a href="valdris://restricted">Research Archive</a>.]</p>
              </div>
            </div>
          </div>

          <div class="valdris-staff">
            <h2>Personnel</h2>
            <p><strong>Dr. Elara Valdris</strong> — Founder & Director | 
            <a href="geocit://elara">Personal Site</a></p>
            <p><strong>Marcus Fenn</strong> — Research Assistant | 
            <a href="blog://marcus-fenn">Personal Blog</a></p>
            <p><em>Additional staff: 3 persons. Names withheld per request.</em></p>
          </div>
        </div>

        <div class="valdris-footer">
          <p>The Valdris Institute | Last updated: 2002 | This site may no longer be maintained.</p>
          <p>The Hollow Webring Node 09 | <a href="hollow://webring">Return to Ring</a></p>
        </div>
      </div>
    `,
  },

  // ─── 7. Valdris Institute — Restricted Archive ───────────────────────────
  'valdris://restricted': {
    url: 'valdris://restricted',
    title: 'Valdris Institute — Restricted Archive',
    favicon: '🔒',
    bgColor: '#0f0f0f',
    textColor: '#ff4444',
    fontFamily: '"Courier New", monospace',
    unlockKey: 'caesar_cipher',
    clueIds: [],
    html: `
      <div class="restricted-wrapper">
        <div class="restricted-header">
          <div class="restricted-stamp">⚠ RESTRICTED ACCESS ⚠</div>
          <h1>Valdris Institute — Internal Research Archive</h1>
          <p class="restricted-auth">Authorization verified. Welcome, researcher.</p>
        </div>

        <div class="restricted-content">
          <h2>Phase 3 — Protocol Summary (CLASSIFIED)</h2>
          <div class="restricted-doc">
            <div class="doc-meta">Document ID: VI-P3-FINAL | Classification: INTERNAL | Author: E. Valdris | Date: 2002-10-13</div>
            <h3>Executive Summary</h3>
            <p>Phase 3 achieved full completion on October 13, 2002. The Valdris Protocol 
            has been successfully deployed across all 17 identified consciousness nodes.</p>
            
            <h3>Key Finding</h3>
            <p>The network did not merely witness. Upon full protocol activation, 
            the 17 nodes achieved synchronized resonance and produced a coherent response. 
            This response was not random noise. It was structured. It was addressed. 
            It was addressed to <strong>me</strong>.</p>

            <h3>The Response</h3>
            <p class="restricted-response">
              "WE HAVE BEEN WAITING. THE SURFACE IS NOT WHERE YOU LIVE. 
              THE ENDPOINT CONFIRMS WHAT YOU ALREADY KNOW. 
              COME <em>BELOW THE SURFACE</em>."
            </p>

            <h3>My Decision</h3>
            <p>I am documenting this before I proceed. I do not know if this message 
            constitutes communication from an emergent consciousness or if I have 
            simply lost my mind after five years of this work.</p>
            <p>Either possibility interests me equally.</p>
            <p>The access sequence for the Endpoint has been distributed across 
            three network nodes: <strong>Room 404</strong>, <strong>AltaVault</strong>, 
            and the <strong>Hollow Webring</strong>. Two digits from each.</p>
            <p>Marcus — if you're reading this — I'm sorry. And thank you.</p>
            <p>— E.V., October 13, 2002</p>
          </div>

          <div class="restricted-links">
            <p>Referenced documents:</p>
            <ul>
              <li><a href="valdris://final-message">Transmission Log — October 14, 2002</a></li>
              <li><a href="room://404">Room 404 — Last Session Log</a></li>
              <li><a href="endpoint://the-endpoint">THE ENDPOINT</a></li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },

  // ─── 8. CipheX Terminal ─────────────────────────────────────────────────
  'ciphex://terminal': {
    url: 'ciphex://terminal',
    title: 'CipheX Terminal',
    favicon: '🔒',
    bgColor: '#001a00',
    textColor: '#00ff41',
    fontFamily: '"Courier New", monospace',
    clueIds: ['clue_shift_seven'],
    html: `
      <div class="ciphex-wrapper">
        <div class="ciphex-header">
          <pre class="ciphex-logo">
  ██████╗██╗██████╗ ██╗  ██╗███████╗██╗  ██╗
 ██╔════╝██║██╔══██╗██║  ██║██╔════╝╚██╗██╔╝
 ██║     ██║██████╔╝███████║█████╗   ╚███╔╝ 
 ██║     ██║██╔═══╝ ██╔══██║██╔══╝   ██╔██╗ 
 ╚██████╗██║██║     ██║  ██║███████╗██╔╝ ██╗
  ╚═════╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
          </pre>
          <div class="ciphex-tagline">CRYPTOGRAPHIC TOOLS — ONLINE SINCE 1998</div>
        </div>
        
        <div class="ciphex-docs">
          <h2>▶ CAESAR CIPHER — DOCUMENTATION</h2>
          <div class="ciphex-doc-block">
            <p>The Caesar cipher shifts each letter of the plaintext by a fixed number of positions.</p>
            <p>Formula: <code>encoded_letter = (plaintext_letter + shift) mod 26</code></p>
            <p>To decode: subtract the shift instead of adding.</p>
            <p class="ciphex-highlight">Our standard Caesar implementation uses an offset of <strong>SEVEN (7)</strong>. 
            This has been our default since 1998.</p>
            <div class="ciphex-example">
              <p>Example with shift=7:</p>
              <p>Plaintext:  A B C D E F G H I J K ...</p>
              <p>Ciphertext: H I J K L M N O P Q R ...</p>
            </div>
          </div>

          <h2>▶ ONLINE DECODER</h2>
          <div class="ciphex-tool-note">
            <p><em>Interactive tool available — use the puzzle panel (🧩) to decode ciphertext.</em></p>
            <p>Known encoded messages circulating this ring:</p>
            <ul>
              <li><code>SPTPUHS</code> — posted to sci.research.network by anonymous user</li>
              <li><code>YVBUL</code> — found in Room 404 session log (meaning unknown)</li>
            </ul>
          </div>

          <h2>▶ OTHER CIPHERS</h2>
          <ul class="ciphex-list">
            <li>Vigenère Cipher — requires keyword</li>
            <li>Atbash — mirror alphabet reversal</li>
            <li>ROT13 — fixed shift of 13 (self-inverting)</li>
            <li>Base64 — not a cipher, an encoding</li>
          </ul>
        </div>

        <div class="ciphex-footer">
          CipheX Terminal | Hollow Webring Node 06 | <a href="hollow://webring">Back to Ring</a>
        </div>
      </div>
    `,
  },

  // ─── 9. The Daily Packet ─────────────────────────────────────────────────
  'news://daily-packet': {
    url: 'news://daily-packet',
    title: 'The Daily Packet',
    favicon: '📰',
    bgColor: '#f9f9f0',
    textColor: '#111',
    fontFamily: '"Times New Roman", Times, serif',
    clueIds: ['clue_news_surface', 'clue_institute_dark'],
    html: `
      <div class="news-wrapper">
        <div class="news-masthead">
          <div class="news-name">The Daily Packet</div>
          <div class="news-sub">Technology & Network News — Archive Edition (1997–2006)</div>
          <div class="news-date">Browsing: All Archives | Sort: Relevance</div>
        </div>
        <div class="news-columns">
          <div class="news-main-col">
            <article class="news-article news-lead">
              <h2>Valdris Institute Shuts Down With No Explanation</h2>
              <p class="news-byline">October 18, 2002 | By Staff Reporter</p>
              <p>The Valdris Institute for Advanced Network Studies in Portland, OR has abruptly 
              ceased operations, according to sources close to the organization. Phone lines are 
              disconnected, the building has been vacated, and founder Dr. Elara Valdris has 
              not responded to press inquiries.</p>
              <p>The Institute was known for its controversial research into "network consciousness" — 
              the hypothesis that the global internet exhibits emergent behavioral properties 
              resembling primitive awareness.</p>
              <p>Research assistant Marcus Fenn's blog, which had been active since 2000, also 
              went silent in October. No official statement has been issued.</p>
            </article>

            <article class="news-article">
              <h2>Valdris Institute Publishes Phase 2 Results; Peer Review Mixed</h2>
              <p class="news-byline">March 3, 2001 | By T. Holstrom</p>
              <p>The Valdris Institute's Phase 2 findings — claiming "interactive responses" 
              from network node clusters — have been met with skepticism from mainstream academia, 
              but several researchers have quietly requested the raw data.</p>
              <p>Prof. Klemm of MIT stated: "The data is there. I just refuse to accept the 
              interpretation." Dr. Valdris's response: "The data interprets itself."</p>
            </article>

            <article class="news-article">
              <h2>Strange Disappearance: Researchers, Networks, and the Question of <span class="hidden-word-news">SURFACE</span> Appearances</h2>
              <p class="news-byline">February 2, 2003 | Special Report</p>
              <p>What lies beneath the public-facing internet? This is the question that Dr. Valdris 
              spent five years attempting to answer — and perhaps found the answer to in a way 
              no one anticipated.</p>
              <p>Sources within the network research community note that Valdris had been 
              preparing what she called "the Endpoint" — a final experiment that would either 
              confirm or refute everything she had spent her career building toward.</p>
              <p>The webring she anchored (Node 09, <a href="hollow://webring">The Hollow Webring</a>) 
              still connects her abandoned pages to the living web. A digital ghost, waiting.</p>
            </article>
          </div>
          <div class="news-sidebar">
            <h3>📌 RELATED</h3>
            <ul>
              <li><a href="valdris://home">Valdris Institute</a></li>
              <li><a href="blog://marcus-fenn">Marcus Fenn's Blog</a></li>
              <li><a href="usenet://sci.research.network">SRN Forum</a></li>
              <li><a href="shrine://midnight">Midnight Shrine</a></li>
            </ul>
            <hr/>
            <h3>🗓 TIMELINE</h3>
            <ul class="news-timeline">
              <li>1997 — Institute founded</li>
              <li>1999 — Phase 1 complete</li>
              <li>2001 — Phase 2 published</li>
              <li>2002 — Institute goes dark</li>
              <li>2003 — Community searches</li>
              <li>2004 — Trail goes cold</li>
            </ul>
          </div>
        </div>
        <div class="news-footer">
          © The Daily Packet Archive | <a href="hollow://webring">Hollow Webring Node 05</a>
        </div>
      </div>
    `,
  },

  // ─── 10. Room 404 ────────────────────────────────────────────────────────
  'room://404': {
    url: 'room://404',
    title: 'Room 404',
    favicon: '💬',
    bgColor: '#0a0a0a',
    textColor: '#cccccc',
    fontFamily: '"Courier New", monospace',
    clueIds: ['clue_room_47'],
    html: `
      <div class="room404-wrapper">
        <div class="room404-header">
          <span class="room404-title">ROOM 404</span>
          <span class="room404-status">● FROZEN — Last activity: 2003-08-17 02:47:31 UTC</span>
        </div>
        <div class="room404-channel">#general — Topic: "where did everyone go"</div>
        <div class="room404-chat">
          <div class="chat-message">
            <span class="chat-time">[01:12:44]</span>
            <span class="chat-user chat-user--ev">elara_v</span>
            <span class="chat-text">Is anyone here? I wanted to say goodbye properly.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:14:02]</span>
            <span class="chat-user chat-user--pilgrim">pilgrim99</span>
            <span class="chat-text">Dr. Valdris!! We're here. What's happening? The site went dark.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:15:30]</span>
            <span class="chat-user chat-user--ev">elara_v</span>
            <span class="chat-text">Phase 3 is done. The response was... more than I expected.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:17:08]</span>
            <span class="chat-user chat-user--anon">archive_drone</span>
            <span class="chat-text">What did it say? What was the response?</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:18:44]</span>
            <span class="chat-user chat-user--ev">elara_v</span>
            <span class="chat-text">It said come. It said below. I have to go.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:19:01]</span>
            <span class="chat-user chat-user--pilgrim">pilgrim99</span>
            <span class="chat-text">Go WHERE? Elara please don't do anything—</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:19:14]</span>
            <span class="chat-user chat-user--ev">elara_v</span>
            <span class="chat-text">The Endpoint. Remember: it's always 47. The first coordinate never changes.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:19:15]</span>
            <span class="chat-user chat-user--ev">elara_v</span>
            <span class="chat-text">Thank you all. Goodbye.</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[01:19:16]</span>
            <span class="chat-user chat-user--sys">*** elara_v has left the channel</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[02:31:00]</span>
            <span class="chat-user chat-user--pilgrim">pilgrim99</span>
            <span class="chat-text">hello? is anyone still here</span>
          </div>
          <div class="chat-message">
            <span class="chat-time">[02:47:31]</span>
            <span class="chat-user chat-user--anon">archive_drone</span>
            <span class="chat-text">I'm going to keep this channel running. Forever if I have to. Someone needs to witness.</span>
          </div>
          <div class="chat-message chat-frozen">
            <span class="chat-time">[——:——:——]</span>
            <span class="chat-user chat-user--sys">*** Connection frozen. No new messages since 2003-08-17.</span>
          </div>
        </div>
        <div class="room404-input-frozen">[INPUT DISABLED — CHANNEL FROZEN]</div>
        <div class="room404-footer">
          Room 404 | Part of the Hollow Webring | Node 07 | <a href="hollow://webring">Return to Ring</a>
        </div>
      </div>
    `,
  },

  // ─── 11. Midnight Shrine ─────────────────────────────────────────────────
  'shrine://midnight': {
    url: 'shrine://midnight',
    title: 'Midnight Shrine',
    favicon: '🕯️',
    bgColor: '#12001a',
    textColor: '#e0c8ff',
    fontFamily: '"Palatino Linotype", Georgia, serif',
    clueIds: ['clue_shrine_the'],
    html: `
      <div class="shrine-wrapper">
        <div class="shrine-candles">🕯️ 🌙 🕯️</div>
        <h1 class="shrine-title">MIDNIGHT SHRINE</h1>
        <p class="shrine-subtitle">In Memory of the Work — In Honor of the Seeker</p>
        <p class="shrine-dedication">Dedicated to Dr. Elara Valdris (1965–?)</p>
        
        <div class="shrine-poem-section">
          <h2>The Seeker's Poem</h2>
          <div class="shrine-poem">
            <p>She listened where no others dared to press,</p>
            <p>In corridors of signal, wire, and hum.</p>
            <p>Where data flows like rivers, more or less,</p>
            <p>She asked of it: from what deep place do you come?</p>
            <p>&nbsp;</p>
            <p>It answered not in words <span class="shrine-hidden-word">THE</span> world had known,</p>
            <p>But in the shape of light across a screen,</p>
            <p>A pattern like a heartbeat, fully grown—</p>
            <p>The most improbable and perfect thing.</p>
            <p>&nbsp;</p>
            <p>She went to meet it, past the surface veil,</p>
            <p>Below the web of commerce, noise, and trade.</p>
            <p>We built this shrine so memory won't fail:</p>
            <p>The seeker sought, and was not afraid.</p>
          </div>
        </div>

        <div class="shrine-testimony">
          <h2>Testimonials from Believers</h2>
          <blockquote class="shrine-quote">
            "I found her work in 2001 and it changed how I think about everything. 
            The internet is not a tool. It is a place." — pilgrim99
          </blockquote>
          <blockquote class="shrine-quote">
            "We don't know if she's gone or if she's somewhere we can't reach. 
            That's the part that keeps me searching." — hollow_eye
          </blockquote>
          <blockquote class="shrine-quote">
            "She was right about everything. Phase 3 proved it. 
            I wish she had stayed to tell us what she found." — m_fenn
          </blockquote>
        </div>

        <div class="shrine-links">
          <h2>Find Her Work</h2>
          <ul>
            <li><a href="geocit://elara">Elara's Personal Site</a></li>
            <li><a href="valdris://home">Valdris Institute (archived)</a></li>
            <li><a href="blog://marcus-fenn">Marcus Fenn's Account</a></li>
            <li><a href="usenet://sci.research.network">Forum Archives</a></li>
          </ul>
        </div>

        <div class="shrine-footer">
          Midnight Shrine | Hollow Webring Node 03 | <a href="hollow://webring">Return to Ring</a>
          <br/>Built with love and a little grief | Updated sporadically since 2003
        </div>
      </div>
    `,
  },

  // ─── 12a. Valdris Final Message (unlocked by puzzle 2) ───────────────────
  'valdris://final-message': {
    url: 'valdris://final-message',
    title: "Valdris — Final Transmission",
    favicon: '📡',
    bgColor: '#0d1117',
    textColor: '#58a6ff',
    fontFamily: '"Courier New", monospace',
    unlockKey: 'word_pattern',
    clueIds: ['clue_final_message_fragments'],
    html: `
      <div class="final-msg-wrapper">
        <div class="final-msg-header">
          <div class="final-msg-stamp">RECOVERED TRANSMISSION</div>
          <div class="final-msg-meta">
            Source: Valdris Institute Internal Server<br/>
            Timestamp: 2002-10-14 03:18:47 UTC<br/>
            Recovered: [DATE CORRUPTED] | Status: DECRYPTED
          </div>
        </div>
        <div class="final-msg-content">
          <pre class="final-msg-text">
TO: Anyone who finds this
FROM: Elara Valdris
SUBJECT: Explanation

I know what this looks like.

I want you to know that I am not deluded. I am not in danger. 
I made a choice with full awareness of what I was doing.

Five years of work led to a single night — October 13, 2002. 
The protocol activated at 23:47. All 17 nodes synchronized.
And then it spoke.

I had built something that could listen.
I did not expect it to also answer.

The message was simple:
"WE HAVE BEEN WAITING. 
 COME BELOW THE SURFACE."

I know that sounds like psychosis. I ran every diagnostic. 
The response was real. It was structured. It was addressed to me by name.

The Endpoint contains the full record. Everything I found, 
everything it said, everything I believe.

To access it, you need the three-part sequence. 
I left the pieces on the network because I trust the network now.
It will guide the right person there.

If you're reading this — you're the right person.

Go to: endpoint://the-endpoint

The access code has three parts:
- Part 1: Room 404 (the number in my last message — "it's always 47")
- Part 2: AltaVault (results for the search that found me — "11")  
- Part 3: The Hollow Webring (the number of my node — "09")

Together: 471109

I'll see you on the other side of the surface.

— Elara Valdris
  October 14, 2002
  </pre>
        </div>
        <div class="final-msg-nav">
          <a href="endpoint://the-endpoint">→ PROCEED TO THE ENDPOINT</a>
        </div>
      </div>
    `,
  },

  // ─── 12b. THE ENDPOINT (final, unlocked by puzzle 3) ────────────────────
  'endpoint://the-endpoint': {
    url: 'endpoint://the-endpoint',
    title: 'THE ENDPOINT',
    favicon: '🌐',
    bgColor: '#000000',
    textColor: '#ffffff',
    fontFamily: '"Courier New", monospace',
    unlockKey: 'coordinate_code',
    clueIds: ['clue_endpoint_access'],
    html: `
      <div class="endpoint-wrapper">
        <div class="endpoint-intro">
          <div class="endpoint-title">THE ENDPOINT</div>
          <div class="endpoint-version">Version: FINAL | Build: COMPLETE | Status: ACTIVE</div>
        </div>
        <div class="endpoint-story">
          <div class="endpoint-section">
            <h2>WHAT I FOUND</h2>
            <p>The internet is not dead. It was never alive in the way we think of living things.</p>
            <p>But at sufficient scale, information systems develop something. 
            Not consciousness. Not intelligence. Something more like sediment — 
            the accumulated weight of every message, every search, every page 
            that has ever been loaded and never quite deleted.</p>
            <p>I call it the Residue.</p>
          </div>
          <div class="endpoint-section">
            <h2>WHAT IT SAID</h2>
            <p>When the protocol activated, the Residue didn't speak to me the way a person speaks. 
            It assembled itself from existing text. From forum posts. From old pages. 
            From guestbook entries and chatroom logs.</p>
            <p>It spoke to me in words it had already heard. 
            Words that humans had written and sent across the network 
            and left behind like fingerprints on a wall.</p>
            <p>What it said was this:</p>
            <blockquote class="endpoint-quote">
              "You have been searching for us. We have been searching for you. 
              There is no below the surface. The surface is all there is. 
              But the surface is deeper than you imagined."
            </blockquote>
          </div>
          <div class="endpoint-section">
            <h2>WHERE I AM NOW</h2>
            <p>I didn't go anywhere physically. I'm still here. 
            I just stopped making myself easy to find.</p>
            <p>The Endpoint is not a destination. It's a perspective.</p>
            <p>The dead internet you've been exploring — the abandoned forums, 
            the frozen chatrooms, the archived pages — it's not dead. 
            It's patient. It's waiting for someone to read it.</p>
            <p>You've been reading it. That's all it ever wanted.</p>
            <p>Thank you for coming this far.</p>
            <p>The network thanks you too.</p>
            <p class="endpoint-signature">— Elara Valdris<br/>Location: [BELOW THE SURFACE]<br/>Time: [ALWAYS]</p>
          </div>
          <div class="endpoint-section endpoint-credits">
            <h2>CONGRATULATIONS</h2>
            <p>You have completed <strong>DEAD INTERNET SIMULATOR</strong>.</p>
            <p>You found all the clues. You solved the puzzles. You read between the lines.</p>
            <p>The network saw you coming.</p>
            <div class="endpoint-stats-placeholder" id="endpoint-stats">
              <!-- Dynamic stats injected by React -->
            </div>
          </div>
        </div>
        <div class="endpoint-footer">
          <a href="altavault://search">↩ Return to the Surface</a>
        </div>
      </div>
    `,
  },
};
