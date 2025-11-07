const StatCard = ({title, value}) => {

    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-6 py-4 shadow-sm w-full sm:w-60">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">{title}</p>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
    )
}

export default StatCard;