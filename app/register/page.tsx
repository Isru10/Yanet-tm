"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus, Fingerprint } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PatientRegister() {
  const[formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "", address: "", age: "", fingerprint: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (authError) throw authError;

      // 2. Save Patient Profile
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert([{
          id: authData.user.id,
          name: formData.name,
          email: formData.email,
          role: "patient",
          phone: formData.phone,
          address: formData.address,
          age: parseInt(formData.age),
          fingerprint_data: formData.fingerprint || "MVP_MOCK_FINGERPRINT",
        }]);
        if (profileError) throw profileError;
      }

      toast.success("Registration Successful!", { description: "Welcome to Yanet General Hospital." });
      router.push("/patient-dashboard"); // We will build this next!
    } catch (error: any) {
      toast.error("Registration Failed", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex bg-green-100 p-3 rounded-full text-green-700 mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Patient Registration</h2>
          <p className="text-slate-500 text-sm mt-1">Create your Yanet Telemedicine account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Abebe Kebede" />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input required type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="34" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="patient@mail.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+251..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Bole, Addis Ababa" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <Label className="flex items-center gap-2"><Fingerprint size={16} className="text-green-600"/> Fingerprint ID (MVP Simulation)</Label>
            <Input value={formData.fingerprint} onChange={(e) => setFormData({...formData, fingerprint: e.target.value})} placeholder="Type 'scanned' or a mock code" />
            <p className="text-xs text-slate-400">For MVP purposes, this is a text input simulation.</p>
          </div>

          <Button type="submit" className="w-full h-12 bg-green-700 hover:bg-green-800 text-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already registered? <Link href="/login" className="text-green-700 font-bold hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}