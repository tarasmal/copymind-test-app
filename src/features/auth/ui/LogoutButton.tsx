'use client';

import { logout } from '../services/authService';

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded"
    >
      Log out
    </button>
  );
}
