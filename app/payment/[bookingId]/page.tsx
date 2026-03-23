// "use client";

// import { useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Loader2, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
// import { toast } from "sonner";

// export default function PaymentPage() {
//   const router = useRouter();
//   const params = useParams();
//   const bookingId = params.bookingId as string;
//   const supabase = createClient();
  
//   const[isProcessing, setIsProcessing] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleFakePayment = async () => {
//     setIsProcessing(true);
    
//     // 1. Simulate network delay (2 seconds)
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     // 2. Update booking status to 'paid' in database
//     const { error } = await supabase
//       .from('bookings')
//       .update({ payment_status: 'paid' })
//       .eq('id', bookingId);

//     setIsProcessing(false);

//     if (error) {
//       toast.error("Payment Error", { description: "Failed to update payment status." });
//       return;
//     }

//     // 3. Show Success State
//     setIsSuccess(true);
//     toast.success("Payment Successful!", { description: "Your appointment is fully confirmed." });
//   };

//   if (isSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center space-y-6">
//           <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
//             <CheckCircle2 size={40} />
//           </div>
//           <h2 className="text-3xl font-bold text-slate-900">Payment Complete</h2>
//           <p className="text-slate-600">500 ETB has been successfully processed.</p>
//           <Button className="w-full h-12 bg-green-700 hover:bg-green-800 text-lg" onClick={() => router.push("/patient-dashboard")}>
//             Go to Patient Dashboard
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//         <div className="text-center mb-8">
//           <div className="inline-flex bg-slate-100 p-3 rounded-full text-slate-700 mb-4">
//             <CreditCard size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900">Complete Payment</h2>
//           <p className="text-slate-500 text-sm mt-1">Yanet General Hospital Telemedicine</p>
//         </div>

//         <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 space-y-3">
//           <div className="flex justify-between items-center text-slate-600">
//             <span>Consultation Fee</span>
//             <span>500 ETB</span>
//           </div>
//           <div className="flex justify-between items-center text-slate-600">
//             <span>Platform Fee</span>
//             <span>0 ETB</span>
//           </div>
//           <div className="pt-3 border-t border-slate-200 flex justify-between items-center font-bold text-lg text-slate-900">
//             <span>Total to Pay</span>
//             <span className="text-green-700">500 ETB</span>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <Button 
//             onClick={handleFakePayment} 
//             className="w-full h-14 bg-green-700 hover:bg-green-800 text-lg shadow-lg"
//             disabled={isProcessing}
//           >
//             {isProcessing ? (
//               <><Loader2 className="animate-spin mr-2" /> Processing Securely...</>
//             ) : (
//               "Pay Now (Simulated)"
//             )}
//           </Button>
//           <p className="flex items-center justify-center gap-1 text-xs text-slate-400">
//             <ShieldCheck size={14} /> End-to-end encrypted MVP payment
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.bookingId as string;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFakePayment = async () => {
    setIsProcessing(true);
    
    // 1. Simulate network delay (2 seconds) to look like a real payment gateway
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // 2. Call our new secure API to mark as paid AND send the email
      const res = await fetch('/api/payment/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      // 3. Show Success State
      setIsSuccess(true);
      toast.success("Payment Successful!", { description: "Receipt and video link sent to your email." });
      
    } catch (error) {
      toast.error("Payment Error", { description: "Failed to process payment." });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
          <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Payment Complete</h2>
          <p className="text-slate-600">500 ETB has been successfully processed. Please check your email for the meeting link.</p>
          <Button className="w-full h-12 bg-green-700 hover:bg-green-800 text-lg" onClick={() => router.push("/patient-dashboard")}>
            Go to Patient Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex bg-slate-100 p-3 rounded-full text-slate-700 mb-4">
            <CreditCard size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Complete Payment</h2>
          <p className="text-slate-500 text-sm mt-1">Yanet General Hospital Telemedicine</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 space-y-3">
          <div className="flex justify-between items-center text-slate-600">
            <span>Consultation Fee</span>
            <span>500 ETB</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Platform Fee</span>
            <span>0 ETB</span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center font-bold text-lg text-slate-900">
            <span>Total to Pay</span>
            <span className="text-green-700">500 ETB</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleFakePayment} 
            className="w-full h-14 bg-green-700 hover:bg-green-800 text-lg shadow-lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin mr-2" /> Processing Securely...</>
            ) : (
              "Pay Now (Simulated)"
            )}
          </Button>
          <p className="flex items-center justify-center gap-1 text-xs text-slate-400">
            <ShieldCheck size={14} /> End-to-end encrypted MVP payment
          </p>
        </div>
      </div>
    </div>
  );
}