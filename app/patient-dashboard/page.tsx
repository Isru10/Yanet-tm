"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  User, Calendar, FileText, Upload, LogOut, Video, HeartPulse, CheckCircle2, Clock, UploadCloud, 
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const[bookings, setBookings] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setUser(user);

      // Fetch Profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(profileData);

      // Fetch Bookings with Doctor Info
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select(`*, profiles:doctor_id(name)`)
        .eq("patient_email", user.email) // Linking via email for MVP
        .order("appointment_date", { ascending: true });
      if (bookingsData) setBookings(bookingsData);

      // Fetch Doctors (for sharing files)
      const { data: doctorsData } = await supabase.from("profiles").select("*").eq("role", "doctor");
      if (doctorsData) setDoctors(doctorsData);

      // Fetch Uploaded Files
      const { data: filesData } = await supabase.from("files").select("*").eq("patient_id", user.id);
      if (filesData) setFiles(filesData);

      setIsLoading(false);
    }
    loadDashboard();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;

    try {
      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("medical_files")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage.from("medical_files").getPublicUrl(fileName);

      // 3. Save to Database
      const { data: newFile, error: dbError } = await supabase.from("files").insert([{
        uploader_id: user.id,
        patient_id: user.id,
        file_name: file.name,
        file_url: publicUrl,
      }]).select().single();

      if (dbError) throw dbError;

      setFiles([...files, newFile]);
      toast.success("File Uploaded Successfully!");
    } catch (error: any) {
      toast.error("Upload Failed", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleShareFile = async (fileId: string, doctorId: string) => {
    if (!doctorId) return;
    try {
      const { error } = await supabase.from("files").update({ doctor_id: doctorId }).eq("id", fileId);
      if (error) throw error;
      
      setFiles(files.map(f => f.id === fileId ? { ...f, doctor_id: doctorId } : f));
      toast.success("File Shared with Doctor!");
    } catch (error: any) {
      toast.error("Failed to share file");
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-green-700">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
          <HeartPulse size={24} />
          <span>Patient Portal</span>
        </div>
        <Button variant="ghost" onClick={handleSignOut} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "appointments" ? "bg-green-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <Calendar size={18} /> My Appointments
          </button>
          <button 
            onClick={() => setActiveTab("files")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "files" ? "bg-green-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <FileText size={18} /> Medical Files
          </button>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "profile" ? "bg-green-700 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
          >
            <User size={18} /> Profile Details
          </button>
          <div className="pt-4 mt-4 border-t border-slate-200">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/book">+ Book New Session</Link>
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          
          {/* APPOINTMENTS TAB */}
          {activeTab === "appointments" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Consultations</h2>
              {bookings.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <p className="text-slate-500">You have no upcoming appointments.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Dr. {booking.profiles?.name || "Unknown"}</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                        <Clock size={14} /> {booking.appointment_date} at {booking.appointment_time}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          booking.status === 'completed' ? 'bg-slate-100 text-slate-600' :
                          booking.status === 'rescheduled' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {booking.payment_status === 'paid' ? 'PAID' : 'UNPAID'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 justify-center">
                      {booking.payment_status !== 'paid' ? (
                        <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                          <Link href={`/payment/${booking.id}`}>Pay to Confirm</Link>
                        </Button>
                      ) : booking.status !== 'completed' ? (
                        <Button className="bg-green-600 hover:bg-green-700" asChild>
                          <a href={booking.meeting_link ? `/consultation/${booking.meeting_link.split('/consultation/')[1]?.split('?')[0]}?name=${profile?.name}` : '#'} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" /> Join Call
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" asChild>
                          <Link href={`/prescription/${booking.id}`}>View Prescription</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* FILES TAB */}
          {activeTab === "files" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Medical Files & Lab Results</h2>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <Label className="block mb-2 font-semibold">Upload New Document</Label>
                <div className="flex items-center gap-4">
                  <Input type="file" onChange={handleFileUpload} disabled={uploading} className="cursor-pointer" accept=".pdf,image/*" />
                  {uploading && <Loader2 className="animate-spin text-green-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-2">Accepted formats: PDF, JPG, PNG.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map(file => (
                  <div key={file.id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="text-blue-500 shrink-0" />
                        <span className="font-medium text-sm truncate" title={file.file_name}>{file.file_name}</span>
                      </div>
                      <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline shrink-0">View</a>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100">
                      <Label className="text-xs text-slate-500 mb-1 block">Share with Doctor:</Label>
                      <select 
                        className="w-full text-sm border-slate-200 rounded-md p-1.5 focus:border-green-500 focus:ring-green-500"
                        value={file.doctor_id || ""}
                        onChange={(e) => handleShareFile(file.id, e.target.value)}
                      >
                        <option value="">-- Keep Private --</option>
                        {doctors.map(doc => (
                          <option key={doc.id} value={doc.id}>Dr. {doc.name}</option>
                        ))}
                      </select>
                      {file.doctor_id && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 size={12}/> Shared</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Patient Profile</h2>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-500">Full Name</Label>
                    <p className="font-semibold text-lg text-slate-900">{profile?.name}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500">Email</Label>
                    <p className="font-semibold text-lg text-slate-900">{profile?.email}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500">Phone Number</Label>
                    <p className="font-semibold text-lg text-slate-900">{profile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500">Age</Label>
                    <p className="font-semibold text-lg text-slate-900">{profile?.age || "Not provided"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-slate-500">Address</Label>
                    <p className="font-semibold text-lg text-slate-900">{profile?.address || "Not provided"}</p>
                  </div>
                  <div className="sm:col-span-2 pt-4 border-t border-slate-100">
                    <Label className="text-slate-500">Biometric Authentication</Label>
                    <p className="font-mono text-sm bg-slate-100 p-2 rounded text-slate-600 mt-1">
                      Fingerprint Hash: {profile?.fingerprint_data || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}