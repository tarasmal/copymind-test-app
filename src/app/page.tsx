import ProtectedRoute from '@/shared/ui/ProtectedRoute';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <p className="text-lg max-w-xl text-center mb-8 text-gray-700">
          Log your important decisions and instantly receive AI-generated analysis. Become more
          conscious and strategic in your choices with an interactive personal decision diary.
        </p>
        <Link
          href={ROUTES.DECISIONS}
          className="px-6 py-3 bg-blue-600 text-white rounded font-semibold text-lg shadow hover:bg-blue-700 transition"
        >
          Go to My Decisions
        </Link>
      </div>
    </ProtectedRoute>
  );
}
