import { SidebarProvider } from './context/SideBarContext';
import MainLayout from './layout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
