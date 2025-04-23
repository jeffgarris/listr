import { useListsContext } from "../lib/hooks";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Button from "./Button";

export default function Header() {
  const { isMobile, isMobileSmall } = useListsContext();
  const { login, logout, user, isAuthenticated } = useKindeAuth();
  return (
    <header
      className={`flex ${
        isMobile ? "flex-col" : "justify-between items-center"
      } px-5 py-4 border-b border-b-gray-200`}
    >
      <h1 className="text-2xl font-bold text-gray-700 uppercase">
        <b>Listr</b>
      </h1>
      <div
        className={`flex ${
          isMobile
            ? `flex-col space-y-4 mt-4 ${
                isMobileSmall ? "items-stretch" : "items-start"
              }`
            : "space-x-4"
        }`}
      >
        {isAuthenticated ? (
          <>
            <span className="flex items-center text-[12px] text-gray-500 font-semibold">
              Logged in as {user?.givenName} {user?.familyName}!
            </span>
            <Button onClick={logout} buttonType="secondary">
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button onClick={login}>Log In</Button>
          </>
        )}
      </div>
    </header>
  );
}
