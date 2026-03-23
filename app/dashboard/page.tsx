// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar, Video, Clock, LogOut, FileText, CheckCircle } from "lucide-react";
// import { toast } from "sonner";

// export default function DoctorDashboard() {
//   const [user, setUser] = useState<any>(null);
//   const[profile, setProfile] = useState<any>(null);
  
//   // Availability State
//   const[date, setDate] = useState("");
//   const [time, setTime] = useState("");
  
//   // Bookings State
//   const [bookings, setBookings] = useState<any[]>([]);
//   const[isLoading, setIsLoading] = useState(true);

//   // Prescription State
//   const [activePrescription, setActivePrescription] = useState<string | null>(null);
//   const [prescriptionNote, setPrescriptionNote] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const supabase = createClient();
//   const router = useRouter();

//   useEffect(() => {
//     async function loadDashboard() {
//       // 1. Get logged in user
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push("/login");
//         return;
//       }
//       setUser(user);

//       // 2. Get Doctor Profile
//       const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
//       setProfile(profileData);

//       // 3. Get Doctor's Bookings
//       const { data: bookingsData } = await supabase
//         .from("bookings")
//         .select("*")
//         .eq("doctor_id", user.id)
//         .order("appointment_date", { ascending: true });
      
//       if (bookingsData) setBookings(bookingsData);
//       setIsLoading(false);
//     }
//     loadDashboard();
//   }, [router, supabase]);

//   const handleAddAvailability = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!date || !time) return;

//     const { error } = await supabase.from("availabilities").insert([
//       {
//         doctor_id: user.id,
//         available_date: date,
//         time_slot: time,
//         is_booked: false,
//       },
//     ]);

//     if (error) {
//       toast.error("Error adding availability", { description: error.message });
//     } else {
//       toast.success("Availability added! Patients can now book this slot.",{ description: "Patients can now book this time." });
//       setDate("");
//       setTime("");
//     }
//   };

//   const handleSavePrescription = async (booking: any) => {
//     if (!prescriptionNote.trim()) return toast.warning("Missing Note", { description: "Please write a prescription before saving." });

//     setIsSubmitting(true);
    
//     try {
//       const res = await fetch('/api/prescription', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           bookingId: booking.id,
//           note: prescriptionNote,
//           patientEmail: booking.patient_email,
//           patientName: booking.patient_name,
//         }),
//       });

//       if (res.ok) {
//         toast.success("Prescription saved and emailed to patient!",{ description: "Prescription saved and emailed to patient." });
//         setActivePrescription(null);
//         setPrescriptionNote("");
//         // Update UI to show completed without refreshing the page
//         setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'completed' } : b));
//       } else {
//         const errorData = await res.json();
//   toast.error("Failed to save", { description: errorData.error });
//       }
//     } catch (error) {
//         toast.error("Something went wrong", { description: "Something went wrong" });

//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push("/login");
//   };

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-xl font-bold text-slate-900">Dr. {profile?.name}</h1>
//           <p className="text-sm text-slate-500">Doctor Dashboard</p>
//         </div>
//         <Button variant="ghost" onClick={handleSignOut} className="text-red-600 hover:text-red-700 hover:bg-red-50">
//           <LogOut className="mr-2 h-4 w-4" /> Sign Out
//         </Button>
//       </header>

//       <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Column: Set Availability */}
//         <div className="md:col-span-1 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//               <Calendar className="text-blue-600" /> Set Availability
//             </h2>
//             <form onSubmit={handleAddAvailability} className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Date</Label>
//                 <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
//               </div>
//               <div className="space-y-2">
//                 <Label>Time Slot</Label>
//                 <Input type="text" placeholder="10:00 AM - 10:30 AM" required value={time} onChange={(e) => setTime(e.target.value)} />
//               </div>
//               <Button type="submit" className="w-full">Add Time Slot</Button>
//             </form>
//           </div>
//         </div>

//         {/* Right Column: Upcoming Bookings & Prescriptions */}
//         <div className="md:col-span-2 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//               <Clock className="text-blue-600" /> Consultations
//             </h2>
            
//             {bookings.length === 0 ? (
//               <p className="text-slate-500 text-sm">No patients have booked yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {bookings.map((booking) => {
//                   // Safely extract the Room ID for LiveKit. If the link is malformed, fallback to "#".
//                   const roomLink = booking.meeting_link?.includes('/consultation/') 
//                     ? `/consultation/${booking.meeting_link.split('/consultation/')[1]?.split('?')[0]}?name=Dr.${profile?.name}`
//                     : '#';

//                   return (
//                     <div key={booking.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 flex flex-col gap-4">
                      
//                       {/* Top Row: Patient Info & Buttons */}
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                         <div>
//                           <h3 className="font-bold text-slate-900">{booking.patient_name}</h3>
//                           <p className="text-sm text-slate-600">{booking.patient_email}</p>
//                           <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-700 bg-blue-100 w-fit px-2 py-1 rounded-md">
//                             <Calendar size={14} /> {booking.appointment_date} | {booking.appointment_time}
//                           </div>
//                         </div>
                        
//                         <div className="flex flex-col gap-2">
//                           {/* Only show "Join Call" if prescription isn't written yet */}
//                           {booking.status !== 'completed' && (
//                             <Button asChild className="bg-green-600 hover:bg-green-700">
//                               <a href={roomLink} target="_blank" rel="noopener noreferrer">
//                                 <Video className="mr-2 h-4 w-4" /> Join Call
//                               </a>
//                             </Button>
//                           )}
                          
//                           {/* Show "Completed" or "Write Prescription" */}
//                           {booking.status === 'completed' ? (
//                             <span className="text-green-600 font-medium text-sm text-right flex items-center justify-end gap-1 mt-2">
//                               <CheckCircle className="h-4 w-4" /> Completed
//                             </span>
//                           ) : (
//                             <Button 
//                               variant="outline" 
//                               onClick={() => setActivePrescription(activePrescription === booking.id ? null : booking.id)}
//                             >
//                               <FileText className="mr-2 h-4 w-4" /> 
//                               {activePrescription === booking.id ? "Cancel Note" : "Write Prescription"}
//                             </Button>
//                           )}
//                         </div>
//                       </div>

//                       {/* Expanding Bottom Row: Prescription Input Box */}
//                       {activePrescription === booking.id && (
//                         <div className="mt-2 p-4 border border-blue-200 bg-blue-50 rounded-lg animate-in fade-in slide-in-from-top-4">
//                           <Label className="text-blue-900">Medical Advice & Prescription</Label>
//                           <textarea
//                             className="w-full mt-2 p-3 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                             rows={4}
//                             placeholder="e.g., Take Paracetamol 500mg twice a day. Drink plenty of water."
//                             value={prescriptionNote}
//                             onChange={(e) => setPrescriptionNote(e.target.value)}
//                           ></textarea>
//                           <Button 
//                             onClick={() => handleSavePrescription(booking)} 
//                             className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? "Saving & Emailing..." : "Save & Send to Patient"}
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Calendar, Video, Clock, LogOut, FileText, 
  CheckCircle, Users, RefreshCw, FolderOpen, Stethoscope
} from "lucide-react";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [user, setUser] = useState<any>(null);
  const[profile, setProfile] = useState<any>(null);
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [sharedFiles, setSharedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Prescription State
  const[activePrescription, setActivePrescription] = useState<string | null>(null);
  const[prescriptionNote, setPrescriptionNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reschedule State
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setUser(user);

      // Fetch Doctor Profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(profileData);

      // Fetch Bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .eq("doctor_id", user.id)
        .order("appointment_date", { ascending: true });
      if (bookingsData) setBookings(bookingsData);

      // Fetch Shared Files (Files where this doctor is assigned)
      const { data: filesData } = await supabase
        .from("files")
        .select(`*, patient:patient_id(name, email, phone, age)`)
        .eq("doctor_id", user.id);
      if (filesData) setSharedFiles(filesData);

      setIsLoading(false);
    }
    loadDashboard();
  }, [router, supabase]);

  const handleAddAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    const { error } = await supabase.from("availabilities").insert([{
      doctor_id: user.id,
      available_date: date,
      time_slot: time,
      is_booked: false,
    }]);

    if (error) {
      toast.error("Error adding availability", { description: error.message });
    } else {
      toast.success("Time Slot Added!", { description: "Patients can now book this slot." });
      setDate("");
      setTime("");
    }
  };

  const handleSavePrescription = async (booking: any) => {
    if (!prescriptionNote.trim()) return toast.warning("Missing Note", { description: "Please write a prescription first." });
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          note: prescriptionNote,
          patientEmail: booking.patient_email,
          patientName: booking.patient_name,
        }),
      });

      if (res.ok) {
        toast.success("Prescription Sent!", { description: "Saved and emailed to the patient." });
        setActivePrescription(null);
        setPrescriptionNote("");
        setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'completed' } : b));
      } else {
        const err = await res.json();
        toast.error("Failed to save", { description: err.error });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReschedule = async (bookingId: string, patientEmail: string) => {
    if (!newDate || !newTime) return toast.warning("Missing Info", { description: "Select a new date and time." });
    
    // 1. Update DB
    const { error } = await supabase
      .from("bookings")
      .update({ appointment_date: newDate, appointment_time: newTime, status: 'rescheduled' })
      .eq("id", bookingId);

    if (error) {
      toast.error("Failed to reschedule", { description: error.message });
      return;
    }

    // 2. Update UI & Simulate Email
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, appointment_date: newDate, appointment_time: newTime, status: 'rescheduled' } : b));
    setRescheduleId(null);
    setNewDate("");
    setNewTime("");
    
    toast.success("Appointment Rescheduled!", { 
      description: `Simulated Email Sent to ${patientEmail} with new time.` 
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-green-700">Loading Doctor Portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <Stethoscope size={24} />
          <span>Doctor Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm font-medium text-slate-600">Dr. {profile?.name}</span>
          <Button variant="ghost" onClick={handleSignOut} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "appointments" ? "bg-green-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <Calendar size={18} /> Schedule & Visits
          </button>
          <button 
            onClick={() => setActiveTab("patients")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "patients" ? "bg-green-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <Users size={18} /> Patients & Files
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          
          {/* APPOINTMENTS TAB */}
          {activeTab === "appointments" && (
            <div className="space-y-8">
              {/* Set Availability Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <Calendar className="text-green-600" /> Set New Availability
                </h2>
                <form onSubmit={handleAddAvailability} className="grid sm:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Slot</Label>
                    <Input type="text" placeholder="e.g. 10:00 AM - 10:30 AM" required value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">Add Slot</Button>
                </form>
              </div>

              {/* Bookings List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
                  <Clock className="text-green-600" /> Your Consultations
                </h2>
                
                {bookings.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No patients have booked yet.</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => {
                      const roomLink = booking.meeting_link?.includes('/consultation/') 
                        ? `/consultation/${booking.meeting_link.split('/consultation/')[1]?.split('?')[0]}?name=Dr.${profile?.name}` : '#';

                      return (
                        <div key={booking.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50 flex flex-col gap-4 transition-all hover:shadow-md">
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-lg text-slate-900">{booking.patient_name}</h3>
                              <p className="text-sm text-slate-500 mb-2">{booking.patient_email}</p>
                              <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-md">
                                  <Calendar size={12} /> {booking.appointment_date} | {booking.appointment_time}
                                </span>
                                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                                  booking.status === 'completed' ? 'bg-slate-200 text-slate-700' : 
                                  booking.status === 'rescheduled' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                }`}>
                                  {booking.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              {booking.status !== 'completed' && (
                                <div className="flex gap-2">
                                  <Button asChild className="bg-blue-600 hover:bg-blue-700 flex-1">
                                    <a href={roomLink} target="_blank" rel="noopener noreferrer">
                                      <Video className="mr-2 h-4 w-4" /> Join
                                    </a>
                                  </Button>
                                  <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" onClick={() => setRescheduleId(rescheduleId === booking.id ? null : booking.id)}>
                                    <RefreshCw className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                              
                              {booking.status === 'completed' ? (
                                <span className="text-green-600 font-medium text-sm flex items-center justify-end gap-1 mt-2">
                                  <CheckCircle className="h-4 w-4" /> Completed
                                </span>
                              ) : (
                                <Button variant="outline" onClick={() => setActivePrescription(activePrescription === booking.id ? null : booking.id)}>
                                  <FileText className="mr-2 h-4 w-4" /> 
                                  {activePrescription === booking.id ? "Cancel Note" : "Write Prescription"}
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Reschedule Dropdown */}
                          {rescheduleId === booking.id && (
                            <div className="mt-2 p-4 border border-orange-200 bg-orange-50 rounded-lg flex flex-col sm:flex-row gap-4 items-end animate-in fade-in slide-in-from-top-4">
                              <div className="space-y-1 w-full">
                                <Label className="text-orange-900">New Date</Label>
                                <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="bg-white" />
                              </div>
                              <div className="space-y-1 w-full">
                                <Label className="text-orange-900">New Time</Label>
                                <Input type="text" placeholder="2:00 PM" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="bg-white" />
                              </div>
                              <Button onClick={() => handleReschedule(booking.id, booking.patient_email)} className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
                                Confirm & Notify
                              </Button>
                            </div>
                          )}

                          {/* Prescription Dropdown */}
                          {activePrescription === booking.id && (
                            <div className="mt-2 p-4 border border-green-200 bg-green-50 rounded-lg animate-in fade-in slide-in-from-top-4">
                              <Label className="text-green-900">Medical Advice & Prescription</Label>
                              <textarea
                                className="w-full mt-2 p-3 rounded-md border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                rows={4}
                                placeholder="Write notes, advice, and prescriptions here..."
                                value={prescriptionNote}
                                onChange={(e) => setPrescriptionNote(e.target.value)}
                              ></textarea>
                              <Button onClick={() => handleSavePrescription(booking)} className="mt-3 w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
                                {isSubmitting ? "Saving & Emailing..." : "Save & Send to Patient"}
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PATIENTS & FILES TAB */}
          {activeTab === "patients" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Shared Patient Files</h2>
              <p className="text-slate-500">Medical records and lab results shared directly with you by your patients.</p>

              {sharedFiles.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
                  <FolderOpen className="h-16 w-16 text-slate-200 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No Files Yet</h3>
                  <p className="text-slate-500">Patients have not shared any documents with you.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sharedFiles.map(file => (
                    <div key={file.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 truncate" title={file.file_name}>{file.file_name}</p>
                            <p className="text-xs text-slate-500">Uploaded by: {file.patient?.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 text-sm space-y-1">
                        <p><span className="text-slate-500">Patient Age:</span> {file.patient?.age || "N/A"}</p>
                        <p><span className="text-slate-500">Phone:</span> {file.patient?.phone || "N/A"}</p>
                      </div>

                      <Button className="w-full bg-slate-900 hover:bg-slate-800" asChild>
                        <a href={file.file_url} target="_blank" rel="noopener noreferrer">View Document</a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}