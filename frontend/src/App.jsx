import {Route, Routes} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" elements = {<HomePage />} />
        <Route path="/create" elements = {<CreatePage />} />
        <Route path="/note/:id" elements = {<NoteDetailPage />} />
      </Routes>      
    </div>
    )  
}

export default App