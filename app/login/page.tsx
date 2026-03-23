// "use client";

// import { useState } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, Stethoscope } from "lucide-react";
// import { toast } from "sonner";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState(""); // Only used for registration
//   const [isRegistering, setIsRegistering] = useState(false);
//   const[isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const supabase = createClient();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (isRegistering) {
//         // 1. Sign up the user
//         const { data: authData, error: authError } = await supabase.auth.signUp({
//           email,
//           password,
//         });
//         if (authError) throw authError;

//         // 2. Add them to our profiles table as a 'doctor'
//         if (authData.user) {
//           const { error: profileError } = await supabase.from("profiles").insert([
//             {
//               id: authData.user.id,
//               name: name,
//               email: email,
//               role: "doctor",
//             },
//           ]);
//           if (profileError) throw profileError;
//         }

//           toast.success("Registration successful!", { description: "Registration successful! You can now log in." });

        
//         setIsRegistering(false);
//       } else {
//         // Login flow
//         const { error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
//         <div className="flex flex-col items-center text-center mb-8">
//           <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-4">
//             <Stethoscope size={32} />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900">
//             {isRegistering ? "Register as Doctor" : "Doctor Portal Login"}
//           </h2>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           {isRegistering && (
//             <div className="space-y-2">
//               <Label>Full Name (e.g. Abebe Kebede)</Label>
//               <Input required value={name} onChange={(e) => setName(e.target.value)} />
//             </div>
//           )}
//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className="space-y-2">
//             <Label>Password</Label>
//             <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>

//           <Button type="submit" className="w-full h-11" disabled={isLoading}>
//             {isLoading ? <Loader2 className="animate-spin" /> : isRegistering ? "Create Account" : "Sign In"}
//           </Button>
//         </form>

//         <div className="mt-6 text-center text-sm text-slate-600">
//           {isRegistering ? "Already have an account? " : "New doctor? "}
//           <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-600 font-semibold hover:underline">
//             {isRegistering ? "Sign In" : "Register here"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, HeartPulse } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function UniversalLogin() {
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Authenticate the user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (authError) throw authError;

      // 2. Fetch the user's role from the profiles table
      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        if (profileError) throw profileError;

        toast.success("Login Successful!");

        // 3. Redirect based on role (The Magic Step ✨)
        if (profileData.role === "patient") {
          router.push("/patient-dashboard");
        } else if (profileData.role === "doctor") {
          router.push("/dashboard"); // Doctor dashboard
        } else {
          toast.error("Unknown user role");
        }
      }
    } catch (error: any) {
      toast.error("Login Failed", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-green-100 p-3 rounded-full text-green-700 mb-4">
            <HeartPulse size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Yanet General Hospital Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <Button type="submit" className="w-full h-12 bg-green-700 hover:bg-green-800 text-lg" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
          </Button>
        </form>

        {/* Dynamic Registration Links */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3 text-center text-sm">
          <p className="text-slate-500 mb-1">Dont have an account?</p>
          <Button variant="outline" className="w-full border-green-700 text-green-700" asChild>
            <Link href="/register">Register as Patient</Link>
          </Button>
          
          {/* We will leave this here so doctors can still register easily */}
          <Link href="/register-doctor" className="text-slate-400 hover:text-green-700 transition underline-offset-4 hover:underline mt-2">
            Apply as a Doctor
          </Link>
        </div>

      </div>
    </div>
  );
}