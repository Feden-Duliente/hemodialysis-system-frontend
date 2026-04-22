import React, { forwardRef } from "react";
import reportLogo from "../assets/reportLogo.jpeg"

const ReportLayout = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[794px] h-[1123px] px-[60px] py-[40px] flex flex-col font-[Arial] uppercase text-[10px] text-black bg-white leading-[1.2] relative " >
      <div className="w-full flex items-center justify-between"> 
        <div className="w-full flex flex-col  items-start justify-start mt-5 gap-5">
       
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

          <div className="w-[230px] flex flex-col items-start justify-center text-[9px] font-medium text-justify">
            NOTE:
            This report lists patients with expired or expiring laboratory results.
            Immediate scheduling of lab tests is required to maintain compliance.
          </div>

        </div>
     
        <div className="w-[550px] flex items-center justify-start mb-3">
            
          <div className="flex flex-col items-end justify-end mr-[-10px] z-100">
            <h2 className="font-bold text-[14px]">ISABELA KIDNEY CARE CENTER</h2>
            <h2 className=" text-semibold text-[9px]">3325, Baligatan, City of Ilagan</h2>
          </div>

          <img src={reportLogo} alt="" className="w-20 h-20 z-1" />
        </div>

      </div>

      <div className="w-full flex items-center justify-between mt-5">
   
        <div className="w-full mt-1 text-[10px] flex flex-col items-end justify-end pb-1">

          <div className="w-[270px] pt-[2px] px-2">
            <div className="flex justify-between font-semibold bg-gray-300 px-2 py-[4px]">
              <div>summary</div>
              <div></div>
            </div>

            <div className="flex justify-between font-semibold mt-1 px-2">
              <div>All Patients</div>
              <div>12</div>
            </div>

            <div className="flex justify-between font-semibold  px-2">
              <div>Expired Lab Results</div>
              <div>12</div>
            </div>

            <div className="flex justify-between font-semibold  px-2">
              <div>Expired Soon</div>
              <div>0</div>
            </div>

            <div className="flex justify-between font-semibold  px-2 pb-1 border-b border-black">
              <div>Valid Results</div>
              <div>0</div>
            </div>

          </div>

        </div>

      </div>
 
      <div className="w-full mt-2 text-[9px] border-l border-r border-b border-gray-300 mt-5">
 
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 font-semibold">
              <th className="text-left px-3 py-2 border-r border-black/30">ID</th>
              <th className="text-left px-3 py-2 border-r border-black/30">Patient Name</th>
              <th className="text-left px-3 py-2 border-r border-black/30">Status</th>
              <th className="text-left px-3 py-2 border-r border-black/30">Due Date</th>
              <th className="text-left px-3 py-2">Lab Tests</th>
            </tr>
          </thead>

          <tbody className="bg-white">

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3001</td>
              <td className="px-3 py-2 border-r border-black/20">Ramon Estrella</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 12, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Serum Potassium</div>
                <div>Serum Calcium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3002</td>
              <td className="px-3 py-2 border-r border-black/20">Marina Lopez</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 20, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Sodium</div>
                <div>Chloride</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3003</td>
              <td className="px-3 py-2 border-r border-black/20">Elena Cruz</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 10, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Phosphorus</div>
                <div>Calcium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3004</td>
              <td className="px-3 py-2 border-r border-black/20">Daniel Santos</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 22, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Serum Potassium</div>
                <div>Urinalysis</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3005</td>
              <td className="px-3 py-2 border-r border-black/20">Angela Reyes</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 15, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Sodium</div>
                <div>Calcium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3006</td>
              <td className="px-3 py-2 border-r border-black/20">Joseph Tan</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 23, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Chloride</div>
                <div>Potassium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3007</td>
              <td className="px-3 py-2 border-r border-black/20">Catherine Lim</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 11, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Calcium</div>
                <div>Phosphorus</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3008</td>
              <td className="px-3 py-2 border-r border-black/20">Miguel Dizon</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 21, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Sodium</div>
                <div>Urinalysis</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3009</td>
              <td className="px-3 py-2 border-r border-black/20">Isabella Garcia</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 09, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Potassium</div>
                <div>Chloride</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3010</td>
              <td className="px-3 py-2 border-r border-black/20">Ronald Cruz</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 24, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Calcium</div>
                <div>Sodium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3011</td>
              <td className="px-3 py-2 border-r border-black/20">Liza Bautista</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 13, 2026</td>
              <td className="px-3 py-2">
                <div>Complete Blood Count</div>
                <div>Phosphorus</div>
                <div>Potassium</div>
              </td>
            </tr>

            <tr>
              <td className="font-semibold px-3 py-2 align-center border-r border-black/20">LR3012</td>
              <td className="px-3 py-2 border-r border-black/20">Victor Ong</td>
              <td className="px-3 py-2 border-r border-black/20">EXPIRED SOON</td>
              <td className="px-3 py-2 border-r border-black/20">Apr 25, 2026</td>
              <td className="px-3 py-2">
                <div>Sodium</div>
                <div>Calcium</div>
                <div>Complete Blood Count</div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

      <div className="w-full text-[9px] ">

        <div className="font-semibold py-1">
          ACTION REQUIRED
        </div>
 
        <div className="px-2 leading-[1.4]  text-[8px] font-bold">
          <div>- Schedule laboratory tests immediately</div>
          <div>- Update patient records after testing</div>
          <div>- Ensure compliance with lab validity policy (30 days)</div>
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