import {Route, Routes} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import GraphPage from "./pages/GraphPage"
import toast from "react-hot-toast"

const App = () => {
  return (
    <div data-theme="dark">      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/create" element = {<CreatePage />} />
        <Route path="/note/:id" element = {<NoteDetailPage />} />
        <Route path="/graph" element = {<GraphPage />} />
      </Routes>      
    </div>
    )  
}

export default App;