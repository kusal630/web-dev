// Single source of truth for the site's navigation.
// Navbar.jsx maps over this array as props, so adding a new menu
// or dropdown item never requires touching component code.

export const menuData = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    dropdown: [
      { label: 'Vision & Mission', path: '/about/vision-mission' },
      { label: 'Leadership', path: '/about/leadership' },
      { label: 'Departments', path: '/about/departments' },
    ],
  },
  {
    label: 'Academics',
    path: '/academics',
    dropdown: [
      { label: 'Undergraduate', path: '/academics/undergraduate' },
      { label: 'Postgraduate', path: '/academics/postgraduate' },
      { label: 'PhD', path: '/academics/phd' },
    ],
  },
  {
    label: 'Admissions',
    path: '/admissions',
    dropdown: [
      { label: 'Eligibility', path: '/admissions/eligibility' },
      { label: 'Application Process', path: '/admissions/application-process' },
      { label: 'Important Dates', path: '/admissions/important-dates' },
    ],
  },
  {
    label: 'Research',
    path: '/research',
    dropdown: [
      { label: 'Research Areas', path: '/research/research-areas' },
      { label: 'Publications', path: '/research/publications' },
    ],
  },
  { label: 'Campus Life', path: '/campus-life' },
  { label: 'Contact Us', path: '/contact' },
];
