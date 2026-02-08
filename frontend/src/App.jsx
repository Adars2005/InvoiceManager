import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginModule from "./pages/Login";
import DashboardModule from "./pages/Dasboard";
import InvoiceListModule from "./pages/InvoiceList";
import InvoiceFormModule from "./pages/InvoiceForm";
import NavbarModule from "./components/Navbar";

const Login = LoginModule && LoginModule.default ? LoginModule.default : LoginModule;
const Dashboard = DashboardModule && DashboardModule.default ? DashboardModule.default : DashboardModule;
const InvoiceList = InvoiceListModule && InvoiceListModule.default ? InvoiceListModule.default : InvoiceListModule;
const InvoiceForm = InvoiceFormModule && InvoiceFormModule.default ? InvoiceFormModule.default : InvoiceFormModule;
const Navbar = NavbarModule && NavbarModule.default ? NavbarModule.default : NavbarModule;

function App() {
  const isAuth = localStorage.getItem("auth");

  return (
    <BrowserRouter>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/create" element={<InvoiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
