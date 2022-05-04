import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Users from './components/Users';
import Posts from './components/Posts';

const Routes = () => {
   return(
       <Router>
           <Routes>
               <Router>
                   <Route path="/" component={Users} />
                   <Route path="/posts" component={Posts} />
               </Router>
           </Routes>
       </Router>
   )
}

export default Routes;