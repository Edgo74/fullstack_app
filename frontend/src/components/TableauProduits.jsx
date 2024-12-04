import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function TableauProduits({ products, categories, onEditClick, onDeleteClick }) {
  const getCategoryName = (categoryUrl) => {
    const category = categories?.find(cat => `/api/categories/${cat.id}` === categoryUrl);
    return category?.nom || 'Unknown Category';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nom Produit</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Prix</th>
            <th className="px-6 py-3 text-left">Catégorie</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{product.nom}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.prix}€</td>
              <td className="px-6 py-4">{getCategoryName(product.categorie)}</td>
              <td className="px-6 py-4 space-x-2">
                <button 
                  className="text-primary-light hover:text-primary p-1"
                  onClick={() => onEditClick(product)}
                >
                  <FiEdit2 className="inline" />
                </button>
                <button 
                  className="text-secondary hover:text-red-700 p-1"
                  onClick={() => onDeleteClick(product)}
                >
                  <FiTrash2 className="inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableauProduits;