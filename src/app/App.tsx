import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { ThemeProvider } from "../shared/contexts/ThemeContext";
import { queryClient } from "../shared/api";
import { router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-center" />

      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
