import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import Post from './pages/Post.jsx';
import Archive from './pages/Archive.jsx';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <h1 className="brand">My Blog</h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/create">Create Post</NavLink>
          <NavLink to="/archive">Archive</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}