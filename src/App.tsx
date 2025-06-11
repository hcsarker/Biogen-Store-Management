
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AddMedicine from "./pages/AddMedicine";
import POSInvoice from "./pages/POSInvoice";
import Invoice from "./pages/Invoice";
import AddCustomer from "./pages/AddCustomer";
import SalesReport from "./pages/SalesReport";
import PurchaseReport from "./pages/PurchaseReport";
import StockReport from "./pages/StockReport";
import AccountSummary from "./pages/AccountSummary";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/pos-invoice" element={<POSInvoice />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/purchase-report" element={<PurchaseReport />} />
          <Route path="/stock-report" element={<StockReport />} />
          <Route path="/account-summary" element={<AccountSummary />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/purchase" element={<PurchaseReport />} />
          <Route path="/inventory" element={<StockReport />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/expenses" element={<AccountSummary />} />
          <Route path="/calendar" element={<Dashboard />} />
          <Route path="/expire-alert" element={<Dashboard />} />
          <Route path="/stock-alert" element={<Dashboard />} />
          <Route path="/reports" element={<SalesReport />} />
          <Route path="/profile" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
