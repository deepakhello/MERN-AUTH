import { jwtDecode } from "jwt-decode";
import { Navigate,Outlet} from "react-router-dom";

export const IsloggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (!exp || exp * 1000 <= Date.now()) {
            localStorage.removeItem("token");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Invalid token in Auth check:", error);
        localStorage.removeItem("token");
        return false;
    }
}

const Auth = () => {
    return IsloggedIn() ? <Outlet /> : <Navigate to="/" />;
}
export default Auth;