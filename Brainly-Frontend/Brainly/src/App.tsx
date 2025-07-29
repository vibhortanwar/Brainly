import { Dashboard } from "./Pages/Dashboard";
import { Signup } from "./Pages/Signup";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Signin } from "./Pages/Signin";
function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App;