import { LoaderIcon } from "lucide-react";

function PageLoader() {
    return (
        <div
        className="flex items-center justify-center h-screen transition-opacity duration-200"
        role="status"
        >
        <LoaderIcon className="size-6 animate-spin text-base-content/40" />
        </div>
    );
}

export default PageLoader;