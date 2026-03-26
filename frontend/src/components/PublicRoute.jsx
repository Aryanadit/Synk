import { Navigate} from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore.js'

export default function PublicRoute({ children }) {
    const authUser = useAuthStore((state) => state.authUser);
    if (authUser) return <Navigate to="/" />;
    return children;
}