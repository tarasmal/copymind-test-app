import Spinner from '@/shared/ui/Spinner';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Spinner size={48} />
    </div>
  );
};

export default LoadingScreen;
