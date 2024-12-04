import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import TableauProduits from './TableauProduits';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import AjoutProduitModal from './AjoutProduitModal';
import ModifierProduitModal from './ModifierProduitModal';
import ConfirmationSuppression from './ConfirmationSuppression';
import Pagination from './Pagination';

function ListeProduits() {
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { 
    items: products, 
    status: productStatus, 
    error: productError,
    currentPage,
    totalPages 
  } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
    dispatch(fetchCategories());
  }, [dispatch, currentPage]);

  const handleAddProduct = async (productData) => {
    await dispatch(addProduct(productData));
    setIsAddModalOpen(false);
  };

  const handleEditProduct = async (productData) => {
    if (selectedProduct) {
      await dispatch(updateProduct({ id: selectedProduct.id, productData }));
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      await dispatch(deleteProduct(selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page) => {
    dispatch(fetchProducts(page));
  };

  if (productStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (productStatus === 'failed') {
    return <ErrorMessage message={productError} />;
  }

  if (!Array.isArray(products?.['hydra:member']) || products['hydra:member'].length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-500">Aucun produit trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Produits</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition-colors"
        >
          Ajouter un produit
        </button>
      </div>
      <TableauProduits 
        products={products['hydra:member']} 
        categories={categories['hydra:member']}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AjoutProduitModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
      <ModifierProduitModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleEditProduct}
        product={selectedProduct}
      />
      <ConfirmationSuppression
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.nom}
      />
    </div>
  );
}

export default ListeProduits;