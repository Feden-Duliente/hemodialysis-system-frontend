import React, { forwardRef } from "react";

const ReportLayout = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-[794px] h-[1123px] px-[60px] py-[40px] font-sans text-[8px] text-black bg-white leading-[1.2] relative mt-[5rem]"
    >
      <div class="w-full flex items-center justify-center border-t-[2px] border-b-[2px] border-black mb-[6px] py-4">

        <div className="w-full flex flex-col items-start justify-between">
          <h2 className="text-black">REPORT TYPE</h2>
          <h2 className="text-black">DATE</h2>
          <h2 className="text-black">COTOFF PERIOD </h2>
          <h2 className="text-black">PROCESS CYLCLE</h2>
        </div>

        <div className="w-full flex flex-col items-start justify-between">
          <h2 className="text-black">: <span className="ml-3">PhilHealth Financial and Treatment Summary</span></h2>
          <h2 className="text-black">: <span className="ml-3">April 15, 2026</span></h2>
          <h2 className="text-black">: <span className="ml-3">1st - 15th</span></h2>
          <h2 className="text-black">: <span className="ml-3">Biweekly(1st - 15th)</span></h2>
        </div>

      

      </div>
      


      
      <div className="w-full flex items-center justify-center font-bold mt-4">
        PAYMENT STATUS
      </div>
     <div class="w-full flex items-center justify-between py-2">

        <div className="w-full flex flex-col items-start justify-center">
          <h2 className="text-black">Paid</h2>
          <h2 className="text-black">Unpaid (Denied)</h2>
          <h2 className="text-black">Pending </h2>
        </div>

        <div className="w-full flex flex-col items-start ">
          <h2 className="text-black">: <span className="ml-3">4patients <span className="ml-10">33%</span></span></h2>
          <h2 className="text-black">: <span className="ml-3">4 patients</span></h2>
          <h2 className="text-black">: <span className="ml-3">6 patients</span></h2>
        </div>

      

      </div>



        <div className="w-full flex items-center justify-center font-bold mt-2"> PHILHEALTH APPROVAL STATUS </div>
          <div class="w-full flex items-center justify-between py-2">

          <div className="w-full flex flex-col items-start justify-center">
            <h2 className="text-black">Paid</h2>
            <h2 className="text-black">Unpaid (Denied)</h2>
            <h2 className="text-black">Pending </h2>
          </div>

          <div className="w-full flex flex-col items-start ">
            <h2 className="text-black">: <span className="ml-3">9 patients <span className="ml-10">33%</span></span></h2>
            <h2 className="text-black">: <span className="ml-3">7 patients</span></h2>
            <h2 className="text-black">: <span className="ml-3">6 patients</span></h2>
          </div>
        </div>



        <div className="w-full flex items-center justify-center font-bold mt-2"> APPROVAL VS PAYMENT COMAPRISON </div>
          <div class="w-full flex items-center justify-between py-2">

            <div className="w-full flex flex-col items-start justify-center">
              <h2 className="text-black mb-2">STATUS</h2>
              <h2 className="text-black">Paid</h2>
              <h2 className="text-black">Approved</h2>
              <h2 className="text-black">Denied</h2>
              <h2 className="text-black">Pending </h2>
              <h2 className="text-black">Pending Review </h2>
              <h2 className="text-black">Unpaid </h2>
            </div>

            <div className="w-full flex flex-col items-start ">
              <h2 className="text-black mb-2">PAYMENT COUNT</h2>
              <h2 className="text-black ml-7">4</h2>
              <h2 className="text-black ml-7">0</h2>
              <h2 className="text-black ml-7">0</h2>
              <h2 className="text-black ml-7">6 </h2>
              <h2 className="text-black ml-7"> 3 </h2>
              <h2 className="text-black ml-7">2 </h2>
            </div>

            <div className="w-full flex flex-col items-start justify-center">
              <h2 className="text-black mb-2">APPROVAL COUNT</h2>
              <h2 className="text-black ml-7">4</h2>
              <h2 className="text-black ml-7">4</h2>
              <h2 className="text-black ml-7">2</h2>
              <h2 className="text-black ml-7">6 </h2>
              <h2 className="text-black ml-7"> 1 </h2>
              <h2 className="text-black ml-7">0 </h2>
            </div>

        </div>


        <div className="w-full flex items-center justify-center font-bold mt-2"> DOCTOR FEES SUMMARY </div>
          <div class="w-full flex items-center justify-between py-2">

          <div className="w-full flex flex-col items-start justify-center">
            <h2 className="text-black">Total Professional Fees</h2>
            <h2 className="text-black">Number of Doctors</h2>
            <h2 className="text-black">Total Patients</h2><br />
            <h2 className="text-black">Paid Fees</h2>
            <h2 className="text-black">Processed Fees</h2>
            <h2 className="text-black">Pending Fees</h2>
          </div>

          <div className="w-full flex flex-col items-start ">
            <h2 className="text-black">: <span className="ml-3">₱33, 600.00</span></h2>
            <h2 className="text-black">: <span className="ml-3">5</span></h2>
            <h2 className="text-black">: <span className="ml-3">18</span></h2><br />
            <h2 className="text-black">: <span className="ml-3">₱7, 200.00</span></h2>
            <h2 className="text-black">: <span className="ml-3"> ₱14, 600.00</span></h2>
            <h2 className="text-black">: <span className="ml-3">₱11, 800.00</span></h2>
          </div>
        </div>


        <div className="w-full flex items-center justify-center font-bold mt-2">TREATMENT STATUS </div>
          <div class="w-full flex items-center justify-between py-2">

          <div className="w-full flex flex-col items-start justify-center">
            <h2 className="text-black">Total Treatment Records</h2>
            <h2 className="text-black">Current Cutoff Treatments	</h2>
          </div>

          <div className="w-full flex flex-col items-start ">
            <h2 className="text-black">: <span className="ml-3">12</span></h2>
            <h2 className="text-black">: <span className="ml-3">5</span></h2>
          </div>
        </div>

        <div class="tracking-widest flex items-center justify-center mt-2">
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
</div>

<div className="w-full flex items-center justify-start italic mt-30">
    <span className="font-bold">Note</span>: All cutoff treatments (1st to 15th) are pending PhilHealth processing and well be evaluated after April 15, 2026. 
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