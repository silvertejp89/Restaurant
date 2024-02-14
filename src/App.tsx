import React from 'react';
import './Styles/Core.css';
import Navigation from './Components/Header/Navigation';
import { Footer } from './Components/Footer/Footer';
import AppRoutes from './Routes/Routes';

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
