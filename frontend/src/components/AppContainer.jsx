export default function AppContainer({ children }) {
    return (
        <div className="max-w-5xl mx-auto h-screen px-6 border-x border-base-300/30">
        {children}
        </div>
    );
}