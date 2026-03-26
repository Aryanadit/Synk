import { Navigate} from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore.js'

export default function ProtectedRoute({ children }) {
    const authUser = useAuthStore((state) => state.authUser);
    if (!authUser) return <Navigate to="/login" />;
    return children;
}