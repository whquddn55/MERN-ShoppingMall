import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import ProductDetail from './views/ProductDetail/ProductDetail';
import CartPage from './views/CartPage/CartPage';
import Auth from '../hoc/auth';

function App() {
  return (
    
    <Router>
    <NavBar/>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/*null : 아무나, false: not authored, true: authored */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/cart" component={Auth(CartPage, true)} />
          <Route exact path="/product/:productId" component={Auth(ProductDetail, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
