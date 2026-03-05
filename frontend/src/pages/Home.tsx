import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-semibold">Payment Transaction</h1>
      <p className="text-gray-600 dark:text-gray-400">Dashboard (em breve)</p>
      <nav className="flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Entrar
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Registrar
        </Link>
      </nav>
    </div>
  );
}
