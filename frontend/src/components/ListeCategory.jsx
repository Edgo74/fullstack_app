import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} from '../store/slices/categoriesSlice';
import TableauCategory from './TableauCategory';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import AjoutCategoryModal from './AjoutCategoryModal';
import ModifierModalCategory from './ModifierModalCategory';
import ConfirmationSuppression from './ConfirmationSuppression';
import Pagination from './Pagination';

function ListeCategory () {
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { 
    items: categories, 
    status: categoryStatus, 
    error: categoryError,
    currentPage,
    totalPages 
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories(currentPage));
  }, [dispatch, currentPage]);

  const handleAddCategory = async (categoryData) => {
    await dispatch(addCategory(categoryData));
    setIsAddModalOpen(false);
  };

  const handleEditCategory = async (categoryData) => {
    if (selectedCategory) {
      await dispatch(updateCategory({ id: selectedCategory.id, categoryData }));
      setIsEditModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      await dispatch(deleteCategory(selectedCategory.id));
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page) => {
    dispatch(fetchCategories(page));
  };

  if (categoryStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (categoryStatus === 'failed') {
    return <ErrorMessage message={categoryError} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Catégories</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition-colors"
        >
          Ajouter une catégoire
        </button>
      </div>
      <TableauCategory 
        categories={categories['hydra:member']} 
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AjoutCategoryModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />
      <ModifierModalCategory
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleEditCategory}
        category={selectedCategory}
      />
      <ConfirmationSuppression
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={selectedCategory?.nom}
        itemType="category"
      />
    </div>
  );
}

export default ListeCategory ;