import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import Index from './pages/Index';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import About from './pages/About';

// Lazy-loaded components
const CreateListing = lazy(() => import('./pages/CreateListing'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const MyListings = lazy(() => import('./pages/MyListings'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ListingDetail = lazy(() => import('./pages/ListingDetail'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            
            {/* Listing detail page - new route */}
            <Route path="/listing/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <ListingDetail />
              </Suspense>
            } />
            
            {/* Lazy-loaded user routes */}
            <Route path="/create-listing" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/auth" element={
              <Suspense fallback={<LoadingFallback />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/my-listings" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedRoute>
                  <MyListings />
                </ProtectedRoute>
              </Suspense>
            } />
            
            {/* Lazy-loaded admin routes */}
            <Route path="/admin/login" element={
              <Suspense fallback={<LoadingFallback />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<LoadingFallback />}>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </Suspense>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
