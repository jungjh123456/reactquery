import logo from "./logo.svg";
import "./App.css";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import Todos from "./container/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Images from "./container/Images";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="about" element={<Images />} />
        </Routes>
      </BrowserRouter>
      {/* <Todos /> */}
    </QueryClientProvider>
  );
}

export default App;
