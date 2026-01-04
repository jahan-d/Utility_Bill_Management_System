import { Link } from "react-router";

export default function Error() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                        404
                    </h1>
                    <div className="text-6xl mb-4">🔍</div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h2>
                    <p className="text-slate-600 text-lg max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl"
                    >
                        🏠 Go Home
                    </Link>
                    <Link
                        to="/bills"
                        className="px-6 py-3 bg-gradient-to-br from-white to-slate-50 text-slate-700 rounded-lg hover:shadow-lg transition-all font-medium border-2 border-slate-200 hover:border-emerald-300"
                    >
                        📄 View Bills
                    </Link>
                </div>
            </div>
        </div>
    );
}
