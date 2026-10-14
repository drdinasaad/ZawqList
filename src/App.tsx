/**
 * ZawqList - Arabic-First Personal Product Library and Price Comparison Platform for Egypt
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { DiscoverLibrariesPage } from './components/DiscoverLibrariesPage';
import { PersonalLibraryPage } from './components/PersonalLibraryPage';
import { PriceComparisonPage } from './components/PriceComparisonPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PublicLibraryView } from './components/PublicLibraryView';
import { SearchModal } from './components/SearchModal';
import { AddToShelfModal } from './components/AddToShelfModal';
import { AuthModal } from './components/AuthModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Product, UserLibrary } from './types';

function MainApp() {
  const { products, libraries, getLibraryBySlug } = useStore();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPublicLibrary, setSelectedPublicLibrary] = useState<UserLibrary | null>(null);
  const [initialCatalogCategory, setInitialCatalogCategory] = useState<string | undefined>(undefined);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [addToShelfProduct, setAddToShelfProduct] = useState<Product | null>(null);

  // Handle URL query parameters for sharing (e.g. ?lib=dina-summer-essentials)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const libSlug = urlParams.get('lib');
    const prodId = urlParams.get('prod');

    if (libSlug) {
      const found = getLibraryBySlug(libSlug);
      if (found) {
        setSelectedPublicLibrary(found);
        setSelectedProduct(null);
      }
    } else if (prodId) {
      const foundProd = products.find(p => p.product_id === prodId);
      if (foundProd) {
        setSelectedProduct(foundProd);
        setSelectedPublicLibrary(null);
      }
    }
  }, [libraries, products]);

  // Navigate to Category in Catalog
  const handleSelectCategory = (catId: string) => {
    setInitialCatalogCategory(catId);
    setSelectedProduct(null);
    setSelectedPublicLibrary(null);
    setCurrentTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Product Details
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedPublicLibrary(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Public Library
  const handleSelectLibrary = (library: UserLibrary) => {
    setSelectedPublicLibrary(library);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setSelectedProduct(null);
    setSelectedPublicLibrary(null);
    if (tab !== 'catalog') {
      setInitialCatalogCategory(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2D2A29]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If a product is selected, render ProductDetailPage */}
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onOpenAddToShelf={prod => setAddToShelfProduct(prod)}
            onSelectCategory={catId => handleSelectCategory(catId)}
          />
        ) : selectedPublicLibrary ? (
          /* If a public library is selected, render PublicLibraryView */
          <PublicLibraryView
            library={selectedPublicLibrary}
            onSelectProduct={handleSelectProduct}
            onNavigateToDiscover={() => setSelectedPublicLibrary(null)}
            onOpenAddToShelf={prod => setAddToShelfProduct(prod)}
          />
        ) : (
          /* Render based on active tab */
          <>
            {currentTab === 'home' && (
              <HomePage
                onSelectCategory={handleSelectCategory}
                onSelectProduct={handleSelectProduct}
                onSelectLibrary={handleSelectLibrary}
                onOpenAddToShelf={prod => setAddToShelfProduct(prod)}
                onOpenSearch={() => setIsSearchOpen(true)}
                onNavigateToTab={handleTabChange}
              />
            )}

            {currentTab === 'catalog' && (
              <CatalogPage
                initialCategoryId={initialCatalogCategory}
                onSelectProduct={handleSelectProduct}
                onOpenAddToShelf={prod => setAddToShelfProduct(prod)}
              />
            )}

            {currentTab === 'discover' && (
              <DiscoverLibrariesPage
                onSelectLibrary={handleSelectLibrary}
                onSelectProduct={handleSelectProduct}
                onNavigateToCatalog={() => handleTabChange('catalog')}
              />
            )}

            {currentTab === 'my-library' && (
              <PersonalLibraryPage
                onSelectProduct={handleSelectProduct}
                onNavigateToCatalog={() => handleTabChange('catalog')}
                onOpenAuth={() => setIsAuthOpen(true)}
              />
            )}

            {currentTab === 'prices' && (
              <PriceComparisonPage
                onSelectProduct={handleSelectProduct}
                onOpenAddToShelf={prod => setAddToShelfProduct(prod)}
              />
            )}

            {currentTab === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateToTab={handleTabChange}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <AddToShelfModal
        product={addToShelfProduct}
        onClose={() => setAddToShelfProduct(null)}
        onOpenAuth={() => {
          setAddToShelfProduct(null);
          setIsAuthOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
