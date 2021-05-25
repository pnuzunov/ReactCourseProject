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
import { ThreadForm } from './components/threads-components/thread-form/ThreadForm';
import { UserForm } from './components/users-components/user-form/UserForm';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Navigation></Navigation>
      <Switch>
        <NonAuthenticatedRoute exact path="/register" component={UserForm}></NonAuthenticatedRoute>
        <NonAuthenticatedRoute exact path="/login" component={UserLogin}></NonAuthenticatedRoute>

        <AuthenticatedRoute exact path="/users" component={UsersList} admin="true"></AuthenticatedRoute>
        <AuthenticatedRoute exact path="/users/register" component={UserForm} admin="true"></AuthenticatedRoute>
        <AuthenticatedRoute exact path="/users/edit/:user" component={UserForm} admin="true"></AuthenticatedRoute>

        <AuthenticatedRoute exact path="/threads/create" component={ThreadForm}></AuthenticatedRoute>
        <AuthenticatedRoute exact path="/threads/edit/:thread" component={ThreadForm} admin="true"></AuthenticatedRoute>

        <Route exact path="/" component={ForumSummary}></Route>
        <Route exact path="/threads/:thread" component={Thread}></Route>
        <Route exact path="/topics/:topic" component={ThreadList}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
