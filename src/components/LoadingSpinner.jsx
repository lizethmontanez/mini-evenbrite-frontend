export default function LoadingSpinner(){
    return (
        <div className="flex items-center gap-2 text-sm opacity-80">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
            </svg>
            Cargando...
        </div>
    )
}