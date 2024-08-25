// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./Page/LandingPage";
// import Admin from "./Page/Admin";
// import Blogview from "./Page/Blogview";
// import Signin from "./Page/Signin";
// import Admin02 from "./Page/Admin02";
// import LandintTest from "./Page/LandingTest";

// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/blogview/:title" element={<Blogview />} />
//           <Route path="/auth" element={<Signin />} />
//           <Route path="/admin02" element={<Admin02 />} />
//           <Route path="/landingtest" element={<LandintTest />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Page/LandingPage";
import Admin from "./Page/Admin";
import Blogview from "./Page/Blogview";
import Signin from "./Page/Signin";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/auth" replace />}
          />
          <Route path="/blogview/:title" element={<Blogview />} />
          <Route path="/auth" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
