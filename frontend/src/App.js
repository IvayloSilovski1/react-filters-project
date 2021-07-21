import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CoursesPage from './pages/CoursesPage';

import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={CoursesPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
