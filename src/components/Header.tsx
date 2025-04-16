import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Button from "./Button";

export default function Header() {
  const { login, logout, register, user, isAuthenticated } = useKindeAuth();
  return (
    <header className="flex justify-between items-center px-5 py-4 border-b border-b-gray-200 ">
      <h1 className="text-2xl font-bold text-gray-800 uppercase">
        <b>Listr</b>
      </h1>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <span className="flex items-center text-[12px] text-gray-500 font-semibold">
              Logged in as {user?.email}!
            </span>
            <Button onClick={logout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button onClick={login}>Log In</Button>
            <Button onClick={register}>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
