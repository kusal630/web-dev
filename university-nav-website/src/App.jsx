import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import SectionPage from './pages/SectionPage.jsx';
import CampusLife from './pages/CampusLife.jsx';
import ContactUs from './pages/ContactUs.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<SectionPage sectionKey="about" />} />
        <Route path="/about/:subpage" element={<SectionPage sectionKey="about" />} />

        <Route path="/academics" element={<SectionPage sectionKey="academics" />} />
        <Route path="/academics/:subpage" element={<SectionPage sectionKey="academics" />} />

        <Route path="/admissions" element={<SectionPage sectionKey="admissions" />} />
        <Route path="/admissions/:subpage" element={<SectionPage sectionKey="admissions" />} />

        <Route path="/research" element={<SectionPage sectionKey="research" />} />
        <Route path="/research/:subpage" element={<SectionPage sectionKey="research" />} />

        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
