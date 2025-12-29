import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// PUBLIC PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import History from './pages/History';
import Leadership from './pages/Leadership';
import Give from './pages/Give';
import Sermons from './pages/Sermons';
import Contact from './pages/Contact';
import Live from './pages/Live';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import MinistryPage from './pages/MinistryPage';
import GetInvolved from './pages/GetInvolved';
import Announcements from './pages/Announcements';

// ADMIN PAGES
import Dashboard from './pages/admin/Dashboard';
import EventsManager from './pages/admin/EventsManager';
import SermonsManager from './pages/admin/SermonsManager';
import MinistryUpdatesManager from './pages/admin/MinistryUpdatesManager';
import PrayersManager from './pages/admin/PrayersManager';
import LivestreamManager from './pages/admin/LivestreamManager';
import GalleryManager from './pages/admin/GalleryManager';
import TeamManager from './pages/admin/TeamManager';
import VolunteerManager from './pages/admin/VolunteerManager';
import GeneralAnnouncements from './pages/admin/GeneralAnnouncements';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen font-sans bg-gray-50 text-gray-900 flex flex-col">
        <Navbar />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<History />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/give" element={<Give />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/live" element={<Live />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/get-involved" element={<GetInvolved />} />

          {/* MINISTRIES */}
          <Route
            path="/ministries/men"
            element={<MinistryPage category="Men" title="Men's Ministry" description="Empowering men to be leaders." />}
          />
          <Route
            path="/ministries/women"
            element={<MinistryPage category="Women" title="Women's Ministry" description="A sisterhood of grace." />}
          />
          <Route
            path="/ministries/youth"
            element={<MinistryPage category="Youth" title="Youth Ministry" description="Raising a generation on fire." />}
          />
          <Route
            path="/ministries/children"
            element={<MinistryPage category="Children" title="Children's Church" description="Teaching the little ones." />}
          />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="sermons" element={<SermonsManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="ministries" element={<MinistryUpdatesManager />} />
            <Route path="prayers" element={<PrayersManager />} />
            <Route path="livestream" element={<LivestreamManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="volunteers" element={<VolunteerManager />} />
            <Route path="general-announcements" element={<GeneralAnnouncements />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
