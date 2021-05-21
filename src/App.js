import './App.css';
import { Header } from './components/layout-components/header/Header';
import { Footer } from './components/layout-components/footer/Footer';
import { UsersList } from './components/users-components/users-list/UsersList';
import { Route, Switch } from 'react-router';
import { ForumSummary } from './components/forum-components/forum-summary/ForumSummary';
import { ThreadList } from './components/threads-components/thread-list/ThreadList';
import { Navigation } from './components/layout-components/navigation/Navigation';
import { AuthenticatedRoute } from './guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './guards/NonAuthenticatedRoute';
import { UserLogin } from './components/users-components/user-login/UserLogin';
import { Thread } from './components/threads-components/thread/Thread';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Navigation></Navigation>
      <Switch>
        <AuthenticatedRoute exact path="/users" component={UsersList} admin="true"></AuthenticatedRoute>
        <NonAuthenticatedRoute exact path="/login" component={UserLogin}></NonAuthenticatedRoute>

        <Route exact path="/" component={ForumSummary}></Route>
        <Route exact path="/threads/:thread" component={Thread}></Route>
        <Route exact path="/topics/:category/:topic" component={ThreadList}></Route>   
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
