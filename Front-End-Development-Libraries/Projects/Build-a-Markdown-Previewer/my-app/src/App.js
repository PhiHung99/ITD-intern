import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from 'styled-components';
import marked from 'marked';
import './App.css';

import Toolbar from './Components/Toolbar';
import GlobalStyles from './Selection/GlobalStyles';
import Main from './Components/Main';
import Container from './Components/Container';
import Previewer from './Components/Previewer';
import Editor from './Components/Editor';
import RepoLink from './Components/RepoLink';
import Toggle from './Components/Toggle';
import Header from './Components/Header';
import { MoonIcon, SunIcon } from './Components/Icons';

import { light, dark } from './Selection/Themes';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [markdown, setMarkdown] = useState(placeholder);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }

  useEffect(() => {
    const data = localStorage.getItem('default-md');
    if (data) setMarkdown(data);
  }, []);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    localStorage.setItem('default-md', markdown);
  }, [markdown]);

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <>
        <GlobalStyles />
        <Container>
          <Header />
          <Toggle onClick={toggleTheme} theme={theme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Toggle>
          <Main>
            <div>
              <Toolbar text="Editor" />
              <Editor
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
              />
            </div>
            <div>
              <Toolbar text="Previewer" />
              <Previewer dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
            </div>
          </Main>
        </Container>
        <RepoLink />
      </>
    </ThemeProvider>
  );
}

const placeholder = `# Welcome to my React Markdown Previewer !
## ♥ What can you write here :
1. Code
  *  \`<div></div>\` 
  * \`\`\`
  // this is multi-line code:
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\` 
* \`\`\` bash
  npm install 
  \`\`\`
2. Blockquote
	* eg: 
> Blockquote
3. Different Text Style
  * **Bold**
  * *Italic*
  * ~~Strikethrough~~
4. Links [Click Here](https://github.com/PhiHung99/ITD-intern)

5. Tables
    | Name          | Age           | Salary|
    | ------------- |:-------:| -----:|
    | NPH       | 24         | $1600|
    | HoaDoan         |  28           |$2000|
    | Ruby       | 27           | $1500 |
6. Images

    ![React](https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/412/square_256/AccessibleReact_1000.png)
## 🛸 Technologies Used
*  React.js
*  SCSS
*  Javascript
` ;

export default App;




// @@ login/register


// import React, { Component } from "react";
// import { connect, Provider } from "react-redux";
// import { Router, Switch, Route, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import Login from "./Components/login.component";
// import Register from "./Components/register.component";
// import Home from "./Components/home.component";
// import Profile from "./Components/profile.component";
// import BoardUser from "./Components/board-user.component";
// import BoardModerator from "./Components/board-moderator.component";
// import BoardAdmin from "./Components/board-admin.component";

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

// import { history } from './helpers/history';
// import stores from './store';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//     };

//     history.listen((location) => {
//       props.dispatch(clearMessage()); // clear message when changing location
//     });
//   }

//   componentDidMount() {
//     const user = this.props.user;

//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }
//   }

//   logOut() {
//     this.props.dispatch(logout());
//   }

//   render() {
//     const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

//     return (<Provider store={stores}>
//       <Router history={history}>
//         <div>
//           <nav className="navbar navbar-expand navbar-dark bg-dark">
//             <Link to={"/"} className="navbar-brand">
//               bezKoder
//             </Link>
//             <div className="navbar-nav mr-auto">
//               <li className="nav-item">
//                 <Link to={"/home"} className="nav-link">
//                   Home
//                 </Link>
//               </li>

//               {showModeratorBoard && (
//                 <li className="nav-item">
//                   <Link to={"/mod"} className="nav-link">
//                     Moderator Board
//                   </Link>
//                 </li>
//               )}

//               {showAdminBoard && (
//                 <li className="nav-item">
//                   <Link to={"/admin"} className="nav-link">
//                     Admin Board
//                   </Link>
//                 </li>
//               )}

//               {currentUser && (
//                 <li className="nav-item">
//                   <Link to={"/user"} className="nav-link">
//                     User
//                   </Link>
//                 </li>
//               )}
//             </div>

//             {currentUser ? (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/profile"} className="nav-link">
//                     {currentUser.username}
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/login" className="nav-link" onClick={this.logOut}>
//                     LogOut
//                   </a>
//                 </li>
//               </div>
//             ) : (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/login"} className="nav-link">
//                     Login
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link to={"/register"} className="nav-link">
//                     Sign Up
//                   </Link>
//                 </li>
//               </div>
//             )}
//           </nav>

//           <div className="container mt-3">
//             <Switch>
//               <Route exact path={["/", "/home"]} component={Home} />
//               <Route exact path="/login" component={Login} />
//               <Route exact path="/register" component={Register} />
//               <Route exact path="/profile" component={Profile} />
//               <Route path="/user" component={BoardUser} />
//               <Route path="/mod" component={BoardModerator} />
//               <Route path="/admin" component={BoardAdmin} />
//             </Switch>
//           </div>
//         </div>
//       </Router>
//     </Provider>);
//   }
// }

// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }

// export default connect(mapStateToProps)(App);