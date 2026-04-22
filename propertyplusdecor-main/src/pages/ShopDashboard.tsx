
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ShopOwnerDashboard from '@/components/ShopOwnerDashboard';

const ShopDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <ShopOwnerDashboard />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ShopDashboard;
