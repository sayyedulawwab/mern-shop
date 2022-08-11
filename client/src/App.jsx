import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';
import User from './pages/User';

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />

        {user ? (
          <>
            <Route
              path="/register"
              element={<Navigate to="/" replace={true} />}
            />
            <Route path="/login" element={<Navigate to="/" replace={true} />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/users/:id"
              element={<Navigate to="/login" replace={true} />}
            />
            <Route path="/cart" element={<Navigate to="/" replace={true} />} />
            <Route
              path="/success"
              element={<Navigate to="/" replace={true} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
