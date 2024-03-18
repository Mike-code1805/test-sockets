import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Homepage />,
//   },
//   {
//     path: '/chats',
//     element: <Chatpage />,
//   },
// ]);

function App() {
  return (
    <Routes>
      <Route path='/' Component={Homepage}  />
      <Route path='/chats' Component={Chatpage}  />
    </Routes>
  );
}

export default App;
