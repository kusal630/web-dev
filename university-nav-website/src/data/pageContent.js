// Content for every section that has dropdown children.
// SectionPage.jsx reads one of these objects (chosen via a "sectionKey"
// prop) and renders either the overview or a single subsection, based
// on the :subpage route param.

export const pageContent = {
  about: {
    title: 'About Us',
    tagline: 'Built on SSN\u2019s legacy, chartered as a university.',
    overview:
      'Shiv Nadar University Chennai (SNUC) is built on the legacy of SSN College of Engineering and SSN School of Management, and now offers undergraduate, postgraduate and doctoral programmes across Engineering, Sciences, Commerce, Management and Humanities from a single OMR campus.',
    subsections: [
      {
        slug: 'vision-mission',
        title: 'Vision & Mission',
        summary: 'What we exist to do, and the principles that guide it.',
        body: [
          'Our vision is to be a university where rigorous, interdisciplinary inquiry is within reach of meritorious students from every economic background \u2014 not only those who can pay for it.',
          'That commitment is built into how the university runs: need-based scholarships across UG, PG and PhD programmes, a 75% tuition waiver for first-generation learners, and a funded stipend for every PhD scholar.',
        ],
      },
      {
        slug: 'leadership',
        title: 'Leadership',
        summary: 'How the university is governed.',
        body: [
          'SNUC operates as part of the Shiv Nadar Institution of Eminence, with academic leadership organised through the university administration and the Deans of its constituent Schools.',
          'Faculty panels run programme-level admissions decisions \u2014 personal interviews for shortlisted candidates, and a Group Discussion and Essay Appreciation round for MBA applicants \u2014 rather than a single centralised office.',
        ],
      },
      {
        slug: 'departments',
        title: 'Departments',
        summary: 'Four schools spanning engineering, sciences, management and humanities.',
        body: [
          'School of Engineering, School of Sciences, School of Management (building on SSN School of Management), and School of Humanities & Social Sciences.',
          'Between them, the four schools run 17 PhD programmes alongside their undergraduate and postgraduate courses, from B.Tech specialisations to an integrated BA LLB.',
        ],
      },
    ],
  },

  academics: {
    title: 'Academics',
    tagline: 'Engineering, sciences, management and law, under one campus.',
    overview:
      'SNUC offers three degree tracks \u2014 undergraduate, postgraduate and doctoral \u2014 spanning B.Tech, B.Sc, B.Com and BA LLB at entry level, up to M.Tech, MBA and 17 PhD programmes. Explore each level below.',
    subsections: [
      {
        slug: 'undergraduate',
        title: 'Undergraduate',
        summary: 'B.Tech, B.Sc (Data Science), B.Com and BA LLB.',
        body: [
          'B.Tech specialisations include Computer Science and Engineering, Artificial Intelligence and Data Science, CSE (Cyber Security), CSE with Internet of Things, Electronics & Communication, Mechanical, and Civil Engineering.',
          'Beyond engineering, SNUC also offers a B.Sc (Economics) in Data Science, a B.Com, and an integrated BA LLB through its School of Humanities & Social Sciences.',
        ],
      },
      {
        slug: 'postgraduate',
        title: 'Postgraduate',
        summary: 'M.Tech, MBA and M.Sc programmes.',
        body: [
          'Postgraduate options include M.Tech specialisations run by the School of Engineering, an MBA through the School of Management, and M.Sc programmes such as M.Sc (Economics) from the School of Humanities & Social Sciences.',
          'A pathway also lets students begin a Master\u2019s at SNUC and complete it at Arizona State University.',
        ],
      },
      {
        slug: 'phd',
        title: 'PhD',
        summary: 'Full-Time, Part-Time and Direct PhD programmes.',
        body: [
          'SNUC offers 17 PhD programmes across its four Schools, in Full-Time, Part-Time and Direct PhD modes \u2014 Part-Time scholars must be sponsored and released by their employer for the minimum required duration.',
          'The doctoral award package includes a monthly stipend of \u20b920,000, an annual contingency grant of \u20b925,000, full or partial fee waivers, subsidised shared campus accommodation, and support for conference travel.',
        ],
      },
    ],
  },

  admissions: {
    title: 'Admissions',
    tagline: 'Entrance-based, across every programme.',
    overview:
      'Admission to every SNUC programme is entrance-exam based rather than direct \u2014 the exact test depends on the programme. The three pages below cover eligibility, the application process, and the dates to track.',
    subsections: [
      {
        slug: 'eligibility',
        title: 'Eligibility',
        summary: 'Minimum requirements and accepted entrance scores, by programme.',
        body: [
          'B.Tech applicants need a valid SNUCEE or JEE Main score; B.Sc (Economics) Data Science applicants are assessed on 10+2 merit (minimum 75%); BA LLB applicants need a CLAT score or 10+2 marks.',
          'MBA applicants need a valid CAT, XAT, CMAT, MAT, ATMA, NMAT or TANCET score; PhD applicants need a postgraduate degree with a minimum of 60% and must clear SNUC\u2019s computer-based entrance test.',
        ],
      },
      {
        slug: 'application-process',
        title: 'Application Process',
        summary: 'Apply online, sit the entrance exam, then an interview.',
        body: [
          'Candidates apply online with academic and personal details, then appear for the relevant entrance exam \u2014 SNUCEE is held at designated centres across India and in Dubai. M.Tech applicants sit an offline entrance exam; PhD applicants sit a computer-based test.',
          'Shortlisted candidates are called for a faculty-panel interview; MBA applicants additionally go through a Group Discussion and Essay Appreciation round. Selected candidates get a provisional offer by email, confirmed once documents are verified.',
        ],
      },
      {
        slug: 'important-dates',
        title: 'Important Dates',
        summary: 'Check the current cycle on the official admissions portal.',
        body: [
          'Entrance exam windows, interview slots and offer-release dates vary by programme and are updated on SNUC\u2019s official admissions portal each cycle \u2014 check there before you plan around a specific date.',
          'PhD applications are generally reviewed alongside published intake windows for each School; GATE scores are also accepted where applicable for M.Tech/PhD entry.',
        ],
      },
    ],
  },

  research: {
    title: 'Research',
    tagline: 'Interdisciplinary research across four schools.',
    overview:
      'Research at SNUC spans engineering, the sciences, management and the humanities, carried out by faculty and by scholars across 17 PhD programmes, with support for conference travel and academic activity built into every doctoral award.',
    subsections: [
      {
        slug: 'research-areas',
        title: 'Research Areas',
        summary: 'Active research across all four schools.',
        body: [
          'Engineering and computing areas include Artificial Intelligence and Data Science, Cyber Security and Internet of Things; the sciences and humanities schools run parallel research programmes in economics and allied fields.',
          'Doctoral scholars can pursue Full-Time, Part-Time or Direct PhD research, working alongside faculty from their School on funded, supervised projects.',
        ],
      },
      {
        slug: 'publications',
        title: 'Publications',
        summary: 'Faculty and scholar output across SNUC\u2019s schools.',
        body: [
          'Faculty and doctoral scholars publish in peer-reviewed venues relevant to their School, building on the research culture inherited from SSN College of Engineering and SSN School of Management.',
          'For programme-specific publication records, check the relevant department page on the official SNUC website, snuchennai.edu.in.',
        ],
      },
    ],
  },
};
