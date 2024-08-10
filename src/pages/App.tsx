import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";
import Register from "./register";
import { AuthContext } from "../hooks/AuthContext";
import { useAuth } from "../hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{user}}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/chat' element={<Chat />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
  );
};
export default App;