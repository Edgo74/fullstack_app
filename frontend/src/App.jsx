import { Provider } from 'react-redux';
import { store } from './store/store';
import { useState } from 'react';
import ListeProduits from './components/ListeProduits';
import ListeCategory from './components/ListeCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-primary text-white p-4">
          <div className="container mx-auto">
            <a href="/" className="text-2xl font-bold hover:text-gray-200 transition-colors">
            Gestion des Produits
            </a>
          </div>
        </nav>
        <div className="container mx-auto py-4">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'products'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Produits
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'categories'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Catégories
            </button>
          </div>
          <main className="container mx-auto py-4">
            {activeTab === 'products' ? <ListeProduits /> : <ListeCategory />}
          </main>
        </div>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;