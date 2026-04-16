export default function ActivityLogs() {
    return (
        <div className="h-screen overflow-y-auto no-scrollbar flex flex-col items-center justify-start pb-5">

            {/* header */}
            <div className="w-full flex items-center justify-between mt-[5.4rem]">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1.7rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-blue-900 font-bold text-[14px]">
                            Doctor Professional Fees Report
                        </h2>
                        <h2 className="text-blue-500 font-semibold text-[9px]">
                            Professional fees for 5 doctors attending 18 patients today
                        </h2>
                    </div>
                </div>
        </div>
        
        </div>
    )
}