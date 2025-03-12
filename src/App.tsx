import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import NavBar from './components/nav-bar/NavBar';
import styles from './App.module.css';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className={styles['container']}>
        <NavBar />
        <div className={styles['wrapper']}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
