import { useAuthenticatedAccount } from "@lib/hooks/auth/use-get-authenticated-account";
import { BankDetails } from "./components/bank-details";
import { UserDetails } from "./components/user-details";

const ProfileScreen = () => {
  const { user } = useAuthenticatedAccount();

  return (
    <div className="space-y-4">
      <UserDetails user={user} />
      <BankDetails user={user} />
    </div>
  );
};

ProfileScreen.route = "/profile";

export default ProfileScreen;
