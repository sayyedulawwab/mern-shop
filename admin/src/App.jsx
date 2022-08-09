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
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import User from './pages/User';
import UserList from './pages/UserList';

function App() {
  const admin = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <Routes>
        {admin ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/login" element={<Navigate to="/" />} />
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
