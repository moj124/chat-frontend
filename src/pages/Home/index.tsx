import { useState } from 'react';
import Chat from '../../components/Chat';
import { User } from '../../util/types';

const user: User = {
  id: 1,
  username: 'user',
  firstname: 'first',
  lastname: 'last',
}

// Component definition
function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  return (
    <>
    {
      currentUser ? (
      <Chat user={currentUser}  onLogout={() => setCurrentUser(null)}/>
    ) : (
      <></>
    )}
    </>

  );
}

// Default export
export default HomePage;
