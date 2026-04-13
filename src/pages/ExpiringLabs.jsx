import labPatient from "../assets/lab-patient.png";
import expired from "../assets/expired.png";
import expiredSoon from "../assets/expired-soon.png";
import lab from "../assets/lab.png";
import labRed from "../assets/labRed.png";
import labGreen from "../assets/labGreen.png";
import labOrange from "../assets/labOrange.png";
import wangLin from "../assets/wangLin.jpg";

export default function ExpiringLabs() {
    return (
      <div className="h-screen overflow-y-auto no-scrollbar flex flex-col items-start justify-start gap-3 pt-5 pb-[4.5rem]">
            {/* header */}
            <div className="w-full flex items-center justify-between mt-[4.6rem]">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1.2rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-blue-900 font-bold text-[12px]">
                            Expiring Lab Results Monitor
                        </h2>
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="w-full flex items-start justify-start gap-2">
                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-blue-900 p-2 gap-3 rounded-[2px]">
                    <img src={labPatient} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Patients</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-red-900 p-2 gap-3 rounded-[2px]">
                    <img src={expired} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Expired</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-[#C09200] p-2 gap-3 rounded-[2px]">
                    <img src={expiredSoon} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Expired Soon</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-green-900 p-2 gap-3 rounded-[2px]">
                    <img src={lab} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Valid</h2>
                </div>
                
            </div>

            {/* notes */}
            <div className="w-full flex items-center justify-start border-b border-gray-500 py-2">
                <h2 className="text-[10px] text-black text-medium"><b>Note</b>: {' '}Lab results are valid for 30 days from test date. Monitor and renew expired or expiring results.</h2>
            </div>

            {/* lab details */}
            <div className="w-[50rem] h-[30rem] flex items-start justify-center gap-2">
            
                <div className="w-3/4 flex flex-col items-center justify-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">

                        {/* card 1 */}
                        <div className="bg-white shadow-md p-4 flex items-start gap-3 w-full min-w-0">

                            <div className="flex items-start justify-start shrink-0">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full border border-black">
                                    <img src={wangLin} className="h-full w-full rounded-full" alt="" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">

                                <div className="flex flex-col items-start justify-start w-full">

                                    <div className="flex items-center justify-between w-full">

                                        <div className="flex items-center gap-2 min-w-0">
                                            <h2 className="text-black text-[12px] font-bold whitespace-nowrap">Wang Lin</h2>
                                            <div className="flex items-center justify-center rounded-md px-2 py-1 bg-red-700">
                                                <h2 className="text-white font-bold text-[9px]">Expired</h2>
                                            </div>
                                        </div>

                                        <h2 className="text-gray-500 text-[9px] font-semibold whitespace-nowrap ml-10">ID: 5</h2>

                                    </div>

                                    <div className="flex items-start justify-start mt-4">
                                        <h2 className="text-black font-bold text-[9px]">Test Date: <span className="font-normal text-[9px]">March 31, 2022</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start">
                                        <h2 className="text-black font-bold text-[9px]">Expiry Date: <span className="font-normal text-[9px]">March 31, 2024</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start bg-red-200 w-full p-1 mt-3 rounded-[4px]">
                                        <h2 className="text-red-900 font-bold text-[9px]">Expired 170 days ago.</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-full mt-3 border-b border-gray-500 pb-3">

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">CBC</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">Hepatitis</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">HIV</h2></div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3 w-full">
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 border border-blue-500 cursor-pointer hover:bg-blue-900 shrink-0">
                                            <h2 className="text-blue-900 hover:text-white text-[9px] whitespace-nowrap">
                                                View Details
                                            </h2>
                                        </div>
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 cursor-pointer hover:bg-blue-700 bg-blue-900 shrink-0">
                                            <h2 className="text-white text-[9px] whitespace-nowrap">
                                                Schedule Test
                                            </h2>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>

                        {/* card 1 */}
                        <div className="bg-white shadow-md p-4 flex items-start gap-3 w-full min-w-0">

                            <div className="flex items-start justify-start shrink-0">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full border border-black">
                                    <img src={wangLin} className="h-full w-full rounded-full" alt="" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">

                                <div className="flex flex-col items-start justify-start w-full">

                                    <div className="flex items-center justify-between w-full">

                                        <div className="flex items-center gap-2 min-w-0">
                                            <h2 className="text-black text-[12px] font-bold whitespace-nowrap">Wang Lin</h2>
                                            <div className="flex items-center justify-center rounded-md px-2 py-1 bg-red-700">
                                                <h2 className="text-white font-bold text-[9px]">Expired</h2>
                                            </div>
                                        </div>

                                        <h2 className="text-gray-500 text-[9px] font-semibold whitespace-nowrap ml-10">ID: 5</h2>

                                    </div>

                                    <div className="flex items-start justify-start mt-4">
                                        <h2 className="text-black font-bold text-[9px]">Test Date: <span className="font-normal text-[9px]">March 31, 2022</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start">
                                        <h2 className="text-black font-bold text-[9px]">Expiry Date: <span className="font-normal text-[9px]">March 31, 2024</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start bg-red-200 w-full p-1 mt-3 rounded-[4px]">
                                        <h2 className="text-red-900 font-bold text-[9px]">Expired 170 days ago.</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-full mt-3 border-b border-gray-500 pb-3">

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">CBC</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">Hepatitis</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">HIV</h2></div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3 w-full">
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 border border-blue-500 cursor-pointer hover:bg-blue-900 shrink-0">
                                            <h2 className="text-blue-900 hover:text-white text-[9px] whitespace-nowrap">
                                                View Details
                                            </h2>
                                        </div>
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 cursor-pointer hover:bg-blue-700 bg-blue-900 shrink-0">
                                            <h2 className="text-white text-[9px] whitespace-nowrap">
                                                Schedule Test
                                            </h2>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>

                        {/* card 1 */}
                        <div className="bg-white shadow-md p-4 flex items-start gap-3 w-full min-w-0">

                            <div className="flex items-start justify-start shrink-0">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full border border-black">
                                    <img src={wangLin} className="h-full w-full rounded-full" alt="" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">

                                <div className="flex flex-col items-start justify-start w-full">

                                    <div className="flex items-center justify-between w-full">

                                        <div className="flex items-center gap-2 min-w-0">
                                            <h2 className="text-black text-[12px] font-bold whitespace-nowrap">Wang Lin</h2>
                                            <div className="flex items-center justify-center rounded-md px-2 py-1 bg-red-700">
                                                <h2 className="text-white font-bold text-[9px]">Expired</h2>
                                            </div>
                                        </div>

                                        <h2 className="text-gray-500 text-[9px] font-semibold whitespace-nowrap ml-10">ID: 5</h2>

                                    </div>

                                    <div className="flex items-start justify-start mt-4">
                                        <h2 className="text-black font-bold text-[9px]">Test Date: <span className="font-normal text-[9px]">March 31, 2022</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start">
                                        <h2 className="text-black font-bold text-[9px]">Expiry Date: <span className="font-normal text-[9px]">March 31, 2024</span></h2>
                                    </div>

                                    <div className="flex items-start justify-start bg-red-200 w-full p-1 mt-3 rounded-[4px]">
                                        <h2 className="text-red-900 font-bold text-[9px]">Expired 170 days ago.</h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-full mt-3 border-b border-gray-500 pb-3">

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">CBC</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">Hepatitis</h2></div>

                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 bg-blue-500"><h2 className="text-white  text-[8px]">HIV</h2></div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3 w-full">
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 border border-blue-500 cursor-pointer hover:bg-blue-900 shrink-0">
                                            <h2 className="text-blue-900 hover:text-white text-[9px] whitespace-nowrap">
                                                View Details
                                            </h2>
                                        </div>
                                        <div className="flex items-center justify-center rounded-[2px] px-2 py-1 cursor-pointer hover:bg-blue-700 bg-blue-900 shrink-0">
                                            <h2 className="text-white text-[9px] whitespace-nowrap">
                                                Schedule Test
                                            </h2>
                                        </div>
                                    </div>


                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>

                <div className="bg-white w-1/4 shadow-md px-4 py-3 flex flex-col items-start justify-start gap-1">
                    <div className="w-full flex items-start justify-start border-b border-gray-300">
                        <h2 className="text-black font-bold text-[10px] pb-1">Summary</h2>
                    </div>
                    <div className="flex items-start justify-center gap-2 mt-2">
                        <img src={labRed} className="w-4 h-4" />
                        <h2 className="text-red-900 text-[10px] font-semibold">Expired: {" "} <span className="font-normal">{" "}12</span></h2>
                    </div>

                    <div className="flex items-start justify-center gap-2">
                        <img src={labOrange} className="w-4 h-4" />
                        <h2 className="text-red-900 text-[10px] font-semibold">Expired Soon: {" "} <span className="font-normal">{" "}4</span></h2>
                    </div>

                    <div className="w-full flex items-start justify-start gap-2">
                        <img src={labGreen} className="w-4 h-4" />
                        <h2 className="text-green-900 text-[10px] font-semibold">Valid: {" "} <span className="font-normal">{" "}0</span></h2>
                    </div>

                    <div className="w-full flex items-start justify-start border-b border-gray-300 mt-3">
                        <h2 className="text-black font-bold text-[10px] pb-1">Priority Queue</h2>
                    </div>

                    <div className="w-full flex flex-col items-center justify-start">
                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-red-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Wei Wuxian</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-green-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">San Lang</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-red-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Lan Zhan</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-green-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Wang Lin</h2>
                        </div>
                    </div>

                    
                </div>
                
            </div>
        </div>
    )
}