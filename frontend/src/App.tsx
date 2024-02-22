import {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";

import {HomePage} from "./pages/HomePage.tsx";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.tsx";


const App: FC = () => {
const { authUser } = useAuthContext();

    return (
        <div className='p-4 h-screen flex items-center justify-center'>
<Routes>
   <Route path={"/"} element={authUser ? <HomePage/> : <Navigate to={"/login"}/> }/>
   <Route path={"login"} element={authUser ? <Navigate to={"/"}/> : < LoginPage/>}/>
   <Route path={"/signup"} element={authUser ? <Navigate to={"/"}/> : <SignUpPage/>}/>
</Routes>
            <Toaster/>
        </div>
    );
};

export default App;
