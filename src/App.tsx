import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { ThemeProvider } from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import { queryClient } from "./api";
import { router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
