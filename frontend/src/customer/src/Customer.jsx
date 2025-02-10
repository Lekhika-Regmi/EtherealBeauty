import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { NotificationProvider } from './components/NotificationProvider'; // Import the NotificationProvider

function App() {
  return (
    <NotificationProvider> {/* Wrap everything inside NotificationProvider */}
      <Navbar />
      <Outlet />
      <Footer />
    </NotificationProvider>
  );
}

export default App;