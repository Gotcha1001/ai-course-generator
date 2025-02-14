export function DetailItem({ label, value }) {
    return (
        <div className="flex flex-col">
            <h2 className="text-white text-sm">{label}</h2>
            <h2 className="text-indigo-500 text-lg">{value}</h2>
        </div>
    );
}
