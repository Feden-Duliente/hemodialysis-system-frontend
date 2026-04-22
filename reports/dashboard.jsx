import React, { forwardRef } from "react";
import reportLogo from "../assets/reportLogo.jpeg"

const ReportLayout = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[794px] h-[1123px] px-[60px] py-[40px] flex flex-col font-[Arial] uppercase text-[10px] text-black bg-white leading-[1.2] relative ">
     
      <div className="flex items-center justify-start">
        <img src={reportLogo} alt="" className="w-20 h-20" />
        <div className="flex flex-col items-start justify-center ml-[-25px]">
          <h2 className="font-bold text-[14px]">ISABELA KIDNEY CARE CENTER</h2>
          <h2 className=" text-semibold text-[9px]">3325, Baligatan, City of Ilagan</h2>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-5">
        <div className="w-[260px] flex flex-col items-start justify-center">
          <div className="grid grid-cols-2 text-[10px] font-semibold mt-2 border-y-2 border-black w-full uppercase">
            <div>Summary Date</div>
            <div>April 23, 2026  05:00 PM</div>

            <div>Report Type</div>
            <div>Consumption summary</div>

            <div>Prepared By</div>
            <div>Billing Dept</div>

            <div>Reference No.</div>
            <div>HD-2026-0423</div>
          </div>
        </div>

        <div className="w-[230px] flex flex-col items-start justify-center text-[9px] font-medium text-justify">
        NOTE: Summary of 12 dialysis patients and treatments.
        Includes procedures, supplies, and professional fees.
        Amounts are provisional and subject to verification.
        </div>
      </div>

      <div className="w-full flex items-center font-bold justify-start mt-4 text-[10px]  "> Provisional Bill </div>

      <div className="w-full mt-1 text-[10px] pb-1 border-b border-gray-100">

        <div className="grid grid-cols-3 bg-gray-300 p-1 font-bold">
          <div>Primary Code</div>
          <div className="text-left">Particulars</div>
          <div className="text-right">Amount</div>
        </div>

        <div className="grid grid-cols-3 px-1 mt-[2px]">
          <div className="font-bold">HD1223</div>
          <div>Dialyzer--, Charging</div>
          <div className="text-right">₱16,000.00</div>
        </div>

        <div className="grid grid-cols-3 px-1 mt-[2px]">
          <div className="font-bold">HD8923</div>
          <div>Supplies Usage</div>
          <div className="text-right">₱15,000.00</div>
        </div>

        <div className="grid grid-cols-3 px-1 mt-[2px]">
          <div className="font-bold">HD1903</div>
          <div>Professional Fees</div>
          <div className="text-right">₱12,000.00</div>
        </div>

      </div>

      <div className="w-full flex items-end justify-end text-[10px] px-1 mt-2  gap-2">
        <div className="w-50 flex items-center justify-between">
          <div className="font-semibold">Total Bill Amount:</div>
        <div className="font-semibold">₱44,780.00</div>
        </div>
        
      </div>

      <div className="w-full flex items-end justify-end px-1 text-[10px]  gap-2">
        <div className="w-50 flex items-center justify-between">
        <div className="font-semibold">Paid Amount:</div>
        <div className="font-semibold">₱44,780.00</div>
        </div>
      </div>

      <div className="w-full flex items-end justify-end px-1 text-[10px]   gap-2 ">
        <div className="w-50 flex items-center justify-between">
        <div className="font-semibold">Amount Due:</div>
        <div className="font-semibold">₱0.00</div>
        </div>
      </div>

      <div className="w-full flex items-center font-semibold justify-start mt-2 text-[10px]  "> Detailed Breakup </div>

      <div className="w-full mt-1 text-[10px] pb-1 border-b border-gray-100/50">

        <div className="grid grid-cols-6 bg-gray-300 p-1 font-semibold">
          <div>Code</div>
          <div>Start Time</div>
          <div>Particulars</div>
          <div>Rate</div>
          <div>Units</div>
          <div className="text-right">Amount</div>
        </div>

        <div className="grid grid-cols-6 px-1 mt-1 ">
          <div className="font-semibold">HD1223</div>
          <div></div>
          <div>Dialysis Charges</div>
          <div></div>
          <div></div>
          <div className="text-right">₱16,000.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1 mt-[2px]">
          <div className="font-semibold">HD1223</div>
          <div >Apr 23, 2026 5:00 PM</div>
          <div>Procedure Fee</div>
          <div>₱1,280.00</div>
          <div>8</div>
          <div className="text-right">₱15,890.00</div>
        </div>

      </div>

      <div className="w-full flex items-end justify-end px-1 text-[10px] mt-2 font-semibold gap-2">
        <div className="w-50 flex items-center justify-between">
          <div className="">Subtotal Total:</div>
          <div className="">₱23,780.00</div>
        </div>
      </div>

      <div className="w-full mt-1 text-[10px]  pb-1 border-b border-gray-100 mt-2">

        <div className="grid grid-cols-6 bg-gray-300 p-1 font-semibold">
          <div>Code</div>
          <div>Start Time</div>
          <div>Particulars</div>
          <div className="ml-3">Rate</div>
          <div>Units</div>
          <div className="text-right">Amount</div>
        </div>

        <div className="grid grid-cols-6 px-1 py-1 ">
          <div>HD8923</div>
          <div className="mr-3">April 23, 2026 <br /> 5:23 PM</div>
          <div>High-flux Dializer (General)</div>
          <div className="ml-3">₱1,280.00</div>
          <div>10</div>
          <div className="text-right">₱15,890.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3">April 23, 2026 <br /> 5:00 PM</div>
          <div>Dialysate (General)</div>
          <div className="ml-3">₱350.00</div>
          <div>120</div>
          <div className="text-right">₱12,000.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3">April 10, 2026 <br /> 4:46 AM</div>
          <div>Tubing (AV Set) (General)</div>
          <div className="ml-3">₱150.00</div>
          <div>96</div>
          <div className="text-right">₱14,750.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3" >May 23, 2026 <br /> 3:45 PM</div>
          <div>Needles (General)</div>
          <div className="ml-3">₱500.00</div>
          <div>48</div>
          <div className="text-right">₱2,400.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3">May 12, 2026 <br /> 4:60 AM</div>
          <div>Saline (General)</div>
          <div className="ml-3">₱300.00</div>
          <div>48</div>
          <div className="text-right">₱21,600.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3">June 12, 2026 <br /> 12:60 AM</div>
          <div>Gauze (General)</div>
          <div className="ml-3">₱72.00</div>
          <div>72 </div>
          <div className="text-right">₱2,800.00</div>
        </div>

        <div className="grid grid-cols-6 px-1 pb-1">
          <div></div>
          <div className="mr-3">May 14, 2026 <br /> 2:10 AM</div>
          <div>Tape (General)</div>
          <div className="ml-3">₱25.00</div>
          <div>24</div>
          <div className="text-right">₱600.00</div>
        </div>

      </div>

      <div className="w-full flex items-end justify-end px-1 text-[10px] mt-2 font-semibold gap-2">
        <div className="w-50 flex items-center justify-between">
          <div className="">Subtotal Total:</div>
          <div className="">₱23,780.00</div>
        </div>
      </div>

      <div className="w-full mt-1 text-[10px]  pb-1 border-b border-gray-100 mt-2">

        <div className="grid grid-cols-6 bg-gray-300 p-1 font-semibold">
          <div>Code</div>
          <div className="mr-13">Professional Fees</div>
          <div>Consultation</div>
          <div className="ml-8">Rate</div>
          <div>Units</div>
          <div className="text-right">Amount</div>
        </div>

        <div className="grid grid-cols-6 px-1 py-1 ">
          <div>HD1903</div>
          <div >Freiden Olero Duliente </div>
          <div >Apr 23, 2026 5:00 PM</div>
          <div className="ml-8">₱1,280.00</div>
          <div>12</div>
          <div className="text-right">₱12,867.00</div>
        </div>

      </div>

      <div className="w-full flex items-end justify-end text-[10px] px-1 mt-2 font-semibold gap-2  pb-2 ">
        <div className="w-50 flex items-center justify-between">
          <div className="">Encounter:</div>
          <div className="">₱12,867.00</div>
        </div>
      </div>
    
      <div className="w-full items-end justify-end bg-gray-300 pb-1">
 
        <div className="w-full flex items-end justify-end text-[10px] px-1 mt-1 font-semibold gap-2 ">
          <div className="w-50 flex items-center justify-between">
            <div className="">Total Bill Amount:</div>
            <div className="">₱44,000.00</div>
          </div>
        </div>

        <div className="w-full flex items-end justify-end text-[10px] px-1  font-semibold gap-2 ">
          <div className="w-50 flex items-center justify-between">
            <div className="">Paid Amount:</div>
            <div className="">₱44,000.00</div>
          </div> 
        </div>

        <div className="w-full flex items-end justify-end text-[10px] px-1   font-semibold gap-2 ">
          <div className="w-50 flex items-center justify-between">
            <div className=""> Amount Due:</div>
            <div className="">₱0.00</div>
          </div>
        </div>

      </div>
     

    
    </div>
  );
});

const Section = ({ title, children }) => (
  <div className="mt-[18px]">
    <div className="text-center font-bold mb-[6px]">{title}</div>
    {children}
  </div>
);

const Row = ({ label, value, percent }) => (
  <div className="flex justify-between mt-[3px]">
    <span>{label}</span>
    <span className="flex gap-[40px]">
      <span>{value}</span>
      {percent && <span>{percent}</span>}
    </span>
  </div>
);

export default ReportLayout;