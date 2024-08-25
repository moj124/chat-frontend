import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Login from "./login";
import Register from "./register";
import { AuthContext } from "../hooks/AuthContext";
import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "../auth/privateRoute";
import ErrorPage from "./ErrorPage";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{user}}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route 
                path="/chat"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
  );
};
export default App;