import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function({children}){
    const { loading, isAuthenticated, user } = useSelector(state => state.authState)

    if(!isAuthenticated && !loading && !user){
        return  setTimeout(()=>{
            return <Navigate to={'/login'}/>
        },300) 
    }

    return children
}