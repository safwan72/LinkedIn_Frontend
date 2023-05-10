import React from 'react';
import './App.css';
import Main from './components/Main';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { BrowserRouter } from 'react-router-dom';
const mapdispatchToProps = (dispatch) => {
  return {
    authcheck: () => dispatch(actions.authcheck()),
    getUserData: (token) => dispatch(actions.getUserData(token)),
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    id: state.id,
    username: state.username,
    email: state.email,
  }
}

const App = (props) => {
  const { authcheck, token, getUserData } = props;
  React.useEffect(() => {
    authcheck()
  }, [authcheck]);
  React.useEffect(() => {
    if (token)
      getUserData(token)
  }, [token, getUserData]);
  return (
    <BrowserRouter>
      <div className='app'>
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapdispatchToProps)(App);
