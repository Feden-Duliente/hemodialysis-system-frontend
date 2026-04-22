import React, { forwardRef } from "react";
import reportLogo from "../assets/reportLogo.jpeg"

const ReportLayout = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[794px] h-[1123px] px-[60px] py-[40px] flex flex-col font-sans text-[8px] text-black bg-white leading-[1.2] relative " >
     
      <div className="flex items-center justify-start">
        <img src={reportLogo} alt="" className="w-20 h-20" />
        <div className="flex flex-col items-start justify-center ml-[-25px]">
          <h2 className="font-bold text-[14px]">ISABELA KIDNEY CARE CENTER</h2>
          <h2 className=" text-semibold text-[9px]">3325, Baligatan, City of Ilagan</h2>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-5"> 
        <div className="w-[240px] flex flex-col items-start justify-center">
          <div className="grid grid-cols-2 text-[10px] font-semibold mt-2 border-y-2 border-black w-full uppercase">
             
            <div>Summary Date</div>
            <div>April 23, 2026  05:00 PM</div>
 
            <div>Report Type</div>
            <div>Dialysis Billing</div>
 
            <div>Prepared By</div>
            <div>Billing Dept</div>
 
            <div>Reference No.</div>
            <div>HD-2026-0423</div>

          </div>
        </div>

        <div className="w-[230px] flex flex-col items-start justify-center text-[10px] font-medium text-justify">
        NOTE: SUMMARY OF 12 PATIENTS AND THEIR DIALYSIS TREATMENTS.
        INCLUDES DETAILED PROCEDURES, SUPPLIES USED, AND PROFESSIONAL FEES.
        COVERS COMPLETE FINANCIAL RECORDS FOR APRIL 14, 2026.
        </div> 
      </div>

      <div className="w-full mt-1 text-[10px]  pb-1 border-b border-r border-l border-gray-200 mt-4">
 
        <div className="grid grid-cols-4 bg-gray-300 p-1 font-medium">
          <div></div>
          <div className="text-left"></div>
          <div className="text-left"></div>
          <div className="text-right">AMOUNT</div>
        </div>

        <div className="grid grid-cols-4 px-1  ">
          <div></div>
          <div></div>
          <div>18 PATIENTS</div>
          <div className="text-right">₱28,000.00</div>
        </div>

        <div className="grid grid-cols-3 px-1">
          <div></div>
          <div></div>
          <div className="text-right"></div>
        </div>
        <div className="grid grid-cols-4 px-1 mt-[2px]">
          <div></div>
          <div>PAID</div>
          <div>5 DOCTORS</div>
          <div className="text-right">₱16,000.00</div>
        </div>

        <div className="grid grid-cols-4 px-1 mt-[2px]">
          <div></div>
          <div>PROCESSED</div>
          <div>1 DOCTOR</div>
          <div className="text-right">₱15,000.00</div>
        </div>

        <div className="grid grid-cols-4 px-1 mt-[2px]">
          <div></div>
          <div>PENDING</div>
          <div>2 DOCTORS</div>
          <div className="text-right">₱12,000.00</div>
        </div>

      </div>

      <div className="w-full flex items-end justify-end text-[10px] px-1 mt-2 font-semibold gap-2">
        <div className="w-50 flex items-center justify-between">
          <div className="">TOTAL PROFESSIONAL FEES:</div>
          <div className="">₱44,780.00</div>
        </div>
      </div>

      <div className="flex w-full mt-1 text-[10px] font-medium pb-1  mt-4 gap-10 font-[Arial]">
        <div className="w-3/5 border-l border-r border-b border-gray-200 pb-[2px]">
         
          <div className="grid grid-cols-3 bg-gray-300 text-[10px] p-1 font-bold  ">
            <div>DOCTOR</div>
            <div>SPECIALTY</div>
            <div className="text-right">AMOUNT</div>
          </div>
 
          <div className="grid grid-cols-3 px-1 mt-1 ">
            <div className="">BILLIE DELA CRUZ</div>
            <div >NEUROLOGIST</div>
            <div className="text-right">₱3,500.00</div>
          </div>

          <div className="grid grid-cols-3 px-1  mt-[2px]">
            <div>XIAO BAO</div>
            <div >NEUROLOGIST</div>
            <div className="text-right">₱12,500.00</div>
          </div>

          <div className="grid grid-cols-3 px-1 mt-[2px] ">
            <div>WEI WUXIAN</div>
            <div >CARDIOLOGIST</div>
            <div className="text-right">₱3,700.00</div>
          </div>

          <div className="grid grid-cols-3 px-1 mt-[2px] ">
            <div>DYLAN WANG</div>
            <div >PSYCHOLOGIST</div>
            <div className="text-right">₱2,575.00</div>
          </div>

          <div className="grid grid-cols-3 px-1 mt-[2px] ">
            <div>SAN LANG</div>
            <div >ENDOCRINOLOGIST</div>
            <div className="text-right">₱18,647.00</div>
          </div> 

        </div>

        <div className="w-2/5 border-l border-r border-b border-gray-200">

          <div className="grid grid-cols-2 bg-gray-300 p-1 font-semibold ">
            <div className="text-left">SPECIALTY</div>
            <div className="text-right">CONTRIBUTION</div>
          </div>
 
          <div className="grid grid-cols-2 px-1  mt-1">
            <div className="">NEUROLOGIST</div>
            <div className="text-right">₱47,647.00</div>
          </div>

          <div className="grid grid-cols-2 px-1 mt-[2px] ">
            <div className="">PSYCHOLOGIST</div>
            <div className="text-right">₱18,254.00</div>
          </div>

          <div className="grid grid-cols-2 px-1  mt-[2px]">
            <div className="">ENDOCRINOLOGIST</div>
            <div className="text-right">₱26,781.00</div>
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