import logo from "./logo.svg";
import "./App.css";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import Todos from "./container/Todos";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
