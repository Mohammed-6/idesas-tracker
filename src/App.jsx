import { IdeasProvider } from './lib/context/ideas'
import {UserProvider} from './lib/context/user'
import { Home } from './pages/home'
import { Login } from './pages/login'

function App(){
  const isLoginPage = window.location.path === '/login'

  return (
    <div>
      <IdeasProvider>
      <UserProvider><Navbar/>  <main>{isLoginPage ?  <Login />: <Home />}</main></UserProvider>
    </IdeasProvider>
    </div>
  )
}


function Navbar() {
  const user = useUser();

  return (
    <nav>
      <a href="/">Idea tracker</a>
      <div>
        {user.current ? (
          <>
            <span>{user.current.email}</span>
            <button type="button" onClick={() => user.logout()}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
}


export default App