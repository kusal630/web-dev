# SNUC (Shiv Nadar University Chennai) — Navigation System

A React + React Router navigation system for a university website, with
hover/click dropdown menus for the multi-level sections (About Us,
Academics, Admissions, Research) and plain links for single-page
sections (Campus Life, Contact Us).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## How it's built

- **`src/data/menuData.js`** — the single source of truth for the navbar.
  Each entry is `{ label, path, dropdown? }`. `Navbar.jsx` maps over this
  array as props, so adding a menu item never means touching component code.
- **`src/data/pageContent.js`** — the text content for About Us, Academics,
  Admissions and Research, keyed by section and subsection slug.
- **`src/components/Navbar.jsx`** — renders the menu, opens dropdowns on
  hover (desktop) and tap (mobile/keyboard), closes on route change,
  outside click or `Escape`.
- **`src/components/DropdownMenu.jsx`** — a small presentational component
  that only renders whatever `items`/`isOpen` props it's given.
- **`src/pages/SectionPage.jsx`** — one reusable component (driven by a
  `sectionKey` prop and the `:subpage` route param) renders every
  dropdown-linked page: the section overview when no subpage is selected,
  or a single subsection's detail view when one is.
- **`src/pages/CampusLife.jsx`** and **`src/pages/ContactUs.jsx`** — standalone
  pages for the two menu items with no dropdown. `ContactUs.jsx` also shows
  controlled-input event handling (`onChange`/`onSubmit`).
- **`src/App.jsx`** — declares every route with `react-router-dom`'s
  `<Routes>`/`<Route>`, wrapping them all in a shared `Layout` (`Navbar` +
  `<Outlet />` + `Footer`).

## Route map

```
/                         Home
/about                    About Us (overview)
/about/vision-mission
/about/leadership
/about/departments
/academics                Academics (overview)
/academics/undergraduate
/academics/postgraduate
/academics/phd
/admissions               Admissions (overview)
/admissions/eligibility
/admissions/application-process
/admissions/important-dates
/research                 Research (overview)
/research/research-areas
/research/publications
/campus-life
/contact
*                         404
```
