import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function TableauCategory({ categories, onEditClick, onDeleteClick }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Aucune catégorie trouvée</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nom Catégorie </th>
            <th className="px-6 py-3 text-left">Nombre de produits associés</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{category.nom}</td>
              <td className="px-6 py-4">{category.produits.length}</td>
              <td className="px-6 py-4 space-x-2">
                <button 
                  className="text-primary-light hover:text-primary p-1"
                  onClick={() => onEditClick(category)}
                >
                  <FiEdit2 className="inline" />
                </button>
                <button 
                  className="text-secondary hover:text-red-700 p-1"
                  onClick={() => onDeleteClick(category)}
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

export default TableauCategory;