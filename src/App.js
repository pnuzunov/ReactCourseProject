import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { UsersList } from './components/users-components/users-list/UsersList';
import { Route } from 'react-router';
import { ForumSummary } from './components/forum-components/forum-summary/ForumSummary';
import { ThreadList } from './components/threads-components/thread-list/ThreadList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route exact path="/" component={ForumSummary}></Route>
      <Route exact path="/users" component={UsersList}></Route>
      <Route exact path="/:category/:topic" component={ThreadList}></Route>
      <Footer></Footer>
    </div>
  );
}

export default App;
