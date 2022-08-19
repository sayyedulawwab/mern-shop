import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import NewUser from './pages/NewUser';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import User from './pages/User';
import UserList from './pages/UserList';

function App() {
  const isAdmin =
    useSelector(state => state.user.currentUser?.isAdmin) || false;

  return (
    <Router>
      <Routes>
        {isAdmin ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:orderId" element={<Order />} />
            <Route path="/login" element={<Navigate to="/" replace={true} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
