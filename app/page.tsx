// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { 
//   Stethoscope, Clock, ShieldCheck, Video, HeartPulse, 
//   FileText, CheckCircle2, Phone, Mail, MapPin, Menu, X 
// } from "lucide-react";

// export default function LandingPage() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
//       {/* STICKY NAVBAR */}
//       <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 px-4 sm:px-12 shadow-sm">
//         <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
//           {/* BRAND */}
//           <div className="flex items-center gap-2 text-green-700 font-bold text-xl sm:text-2xl">
//             <Stethoscope size={28} />
//             <span className="hidden sm:inline">Yanet General Hospital</span>
//             <span className="sm:hidden">Yanet Hospital</span>
//           </div>
          
//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
//             <a href="#about" className="hover:text-green-700 transition">About</a>
//             <a href="#services" className="hover:text-green-700 transition">Services</a>
//             <a href="#doctors" className="hover:text-green-700 transition">Doctors</a>
//             <a href="#contact" className="hover:text-green-700 transition">Contact</a>
//           </nav>
          
//           {/* DESKTOP BUTTONS */}
//           <div className="hidden md:flex gap-4">
//             <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50" asChild>
//               <Link href="/login">Login</Link>
//             </Button>
//             <Button className="bg-green-700 hover:bg-green-800" asChild>
//               <Link href="/book">Book Appointment</Link>
//             </Button>
//           </div>

//           {/* MOBILE MENU TOGGLE */}
//           <button 
//             className="md:hidden p-2 text-slate-600"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </header>

//       {/* MOBILE MENU DROPDOWN (Fixes the missing button issue!) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
//           >
//             <div className="flex flex-col p-4 space-y-4">
//               <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded">About</a>
//               <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded">Services</a>
//               <a href="#doctors" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded">Doctors</a>
//               <hr className="border-slate-100" />
//               <Button variant="outline" className="w-full border-green-700 text-green-700" asChild>
//                 <Link href="/login">Patient & Doctor Login</Link>
//               </Button>
//               <Button className="w-full bg-green-700 hover:bg-green-800" asChild>
//                 <Link href="/book">Book Appointment</Link>
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="flex-1">
        
//         {/* 1. HERO SECTION */}
//         <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-green-500/10 blur-[100px] -z-10 rounded-full"></div>
          
//           <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-2 shadow-sm border border-green-200">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
//               </span>
//               Yanet General Hospital Telemedicine
//             </div>

//             <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
//               Expert Healthcare, <br className="hidden sm:block" />
//               <span className="text-green-700">Anywhere You Are.</span>
//             </h1>
            
//             <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
//               Book consultations, upload your medical files securely, and connect with top specialists from Yanet General Hospital via live video.
//             </p>

//             <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 transition-transform bg-green-700 hover:bg-green-800" asChild>
//                 <Link href="/book">Book Appointment</Link>
//               </Button>
//             </div>
//           </motion.div>
//         </section>

//         {/* 2. ABOUT SECTION */}
//         <section id="about" className="py-24 bg-white">
//           <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
//               <h2 className="text-3xl font-bold text-slate-900 mb-6">Trusted Medical Excellence</h2>
//               <p className="text-slate-600 text-lg leading-relaxed mb-6">
//                 Yanet General Hospital brings its decades of medical excellence to your screens. Our telemedicine platform ensures that you get the exact same quality of care as walking through our hospital doors.
//               </p>
//               <ul className="space-y-4">
//                 {[
//                   "Board-certified specialists",
//                   "Secure file and record sharing",
//                   "E-prescriptions sent instantly"
//                 ].map((item, i) => (
//                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
//                     <CheckCircle2 className="text-green-600 h-6 w-6" /> {item}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative">
//               <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
//                 <HeartPulse size={120} className="text-green-100" />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-3xl"></div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* 3. SERVICES SECTION */}
//         <section id="services" className="py-24 bg-slate-50">
//           <div className="max-w-6xl mx-auto px-6">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Telemedicine Services</h2>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 { icon: Video, title: "Initial Consultation", desc: "Speak with a general practitioner to assess your symptoms and get medical advice." },
//                 { icon: Clock, title: "Follow-up Sessions", desc: "Review lab results and track your recovery progress with your specialist." },
//                 { icon: FileText, title: "Prescription Refills", desc: "Easily get your chronic medication prescriptions renewed digitally." }
//               ].map((srv, i) => (
//                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow hover:border-green-300">
//                   <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
//                     <srv.icon className="text-green-700 h-7 w-7" />
//                   </div>
//                   <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
//                   <p className="text-slate-600 leading-relaxed">{srv.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* 4. DOCTORS LIST SECTION */}
//         <section id="doctors" className="py-24 bg-white">
//           <div className="max-w-6xl mx-auto px-6">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Top Specialists</h2>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
//                   {/* Fake Image Placeholder */}
//                   <div className="h-48 bg-slate-200 flex items-center justify-center">
//                     <Stethoscope className="text-slate-400 h-12 w-12" />
//                   </div>
//                   <div className="p-4 text-center">
//                     <h3 className="font-bold text-slate-900">Dr. Yanet Specialist {i}</h3>
//                     <p className="text-sm text-slate-500 mb-4">General Medicine</p>
//                     <Button variant="outline" className="w-full border-green-700 text-green-700 hover:bg-green-50" asChild>
//                       <Link href="/book">Book Slot</Link>
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//       </main>

//       {/* FOOTER */}
//       <footer className="bg-slate-950 py-12 text-center border-t border-slate-800 text-slate-400 text-sm">
//         <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xl mb-4">
//           <Stethoscope size={24} /> Yanet General Hospital
//         </div>
//         <p>© {new Date().getFullYear()} Yanet General Hospital. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants  } from "framer-motion";
import { 
  Stethoscope, Activity, ShieldCheck, HeartPulse, ArrowRight, 
  Heart, Brain, Bone, Baby, ScanSearch, Microscope, Video, 
  Clock, Shield, Smartphone, UserPlus, Bell, Star, Quote, 
  Calendar, User, Phone, Mail, MapPin, Menu, X, ArrowUpRight,
  FileText
} from "lucide-react";

export default function LandingPage() {
  const[isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    // Base Dark Green Background (Emerald-950)
    <div className="min-h-screen bg-[#022c22] text-white font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-white flex flex-col">
      
      {/* 1. PREMIUM NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#022c22]/90 backdrop-blur-md shadow-lg py-4 border-b border-white/10" : "bg-transparent py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-700 shadow-md">
              <Stethoscope size={26} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Yanet Hospital
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-white/80 hover:text-white font-medium transition-colors">About</a>
            <a href="#departments" className="text-white/80 hover:text-white font-medium transition-colors">Departments</a>
            <a href="#telemedicine" className="text-white/80 hover:text-white font-medium transition-colors">Telemedicine</a>
            <a href="#doctors" className="text-white/80 hover:text-white font-medium transition-colors">Doctors</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-white font-medium hover:text-emerald-400 transition-colors">
              Login
            </Link>
            <Link href="/book" className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] hover:-translate-y-0.5">
              Book Appointment
            </Link>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#064e3b] border-b border-white/10 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 space-y-4">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white/90 text-lg py-2 border-b border-white/5">About</a>
                <a href="#departments" onClick={() => setIsMobileMenuOpen(false)} className="text-white/90 text-lg py-2 border-b border-white/5">Departments</a>
                <a href="#telemedicine" onClick={() => setIsMobileMenuOpen(false)} className="text-white/90 text-lg py-2 border-b border-white/5">Telemedicine</a>
                <Link href="/login" className="text-emerald-400 font-bold text-lg py-2">Patient / Doctor Login</Link>
                <Link href="/book" className="bg-emerald-500 text-white text-center py-3 rounded-xl font-bold shadow-lg mt-2">Book Appointment</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        
        {/* 2. HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#022c22] via-[#022c22]/90 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-400 font-medium mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                Telemedicine Now Live
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                Advanced Medical <br />
                <span className="text-emerald-400">Care You Can Trust</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 font-light max-w-lg leading-relaxed mb-10">
                Connect with Yanet Hospital top specialists from your home. Secure video consultations, instant e-prescriptions, and zero waiting room time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:-translate-y-1">
                  Book Appointment
                </Link>
                <a href="#telemedicine" className="inline-flex items-center justify-center bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all hover:-translate-y-1">
                  How it Works
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. WHY CHOOSE US (GLASS CARDS) */}
        <section id="about" className="py-24 px-6 relative z-10 -mt-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
                Why Choose Us
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-emerald-500"></span>
              </h2>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Activity, title: "24/7 Emergency", desc: "Round-the-clock medical response and dedicated trauma specialists." },
                { icon: Smartphone, title: "Telemedicine", desc: "Connect with our specialists securely from the comfort of your home." },
                { icon: ShieldCheck, title: "Top Specialists", desc: "Board-certified doctors ensuring the highest standard of healthcare." },
                { icon: HeartPulse, title: "Modern Tech", desc: "State-of-the-art diagnostic imaging and laboratory services." }
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn} className="group relative overflow-hidden p-8 rounded-[24px] bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <feature.icon size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/60 font-light leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. TELEMEDICINE & LIVE QUEUE UI MOCKUP */}
        <section id="telemedicine" className="py-24 px-6 relative overflow-hidden bg-[#064e3b]/30 border-y border-white/5">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            
            {/* Left: Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium mb-6">
                <Video size={18} /> Virtual Consultations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Seamless Visits with our <br />
                <span className="text-emerald-400">Live Telemedicine.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10 font-light max-w-xl">
                Experience zero waiting room stress. Upload your files, join the secure video room from your phone, and receive your prescriptions digitally.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: UserPlus, title: "Join Remotely", desc: "Book and enter the virtual waiting room." },
                  { icon: Shield, title: "Secure & Private", desc: "End-to-end encrypted medical video calls." },
                  { icon: FileText, title: "E-Prescriptions", desc: "Receive medications straight to your portal." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/60 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/book" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors group">
                Start Online Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: Floating UI Mockup */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="order-1 lg:order-2 relative flex justify-center">
              {/* Fake Mobile Phone UI */}
              <div className="relative w-[320px] h-[600px] bg-[#022c22] rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[8px] border-slate-800 flex flex-col overflow-hidden z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30"></div>
                
                {/* App Header */}
                <div className="bg-emerald-600 p-6 pt-12 relative text-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-xs text-white/80 font-medium uppercase tracking-wider mb-1">Live Session</div>
                      <div className="font-bold text-xl">Dr. Samuel</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
                      <Bell size={16} />
                      <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                    <div className="text-sm opacity-90 mb-1 font-light">Status</div>
                    <div className="text-2xl font-bold tracking-wider mb-1 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span> IN CALL
                    </div>
                    <div className="text-sm text-emerald-100 font-medium flex items-center gap-1 mt-2">
                      <Clock size={14} /> Time elapsed: 14:02
                    </div>
                  </div>
                </div>

                {/* App Body (Fake Video Call) */}
                <div className="flex-1 bg-slate-900 relative">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Doctor Video" />
                  
                  {/* Floating Patient View */}
                  <div className="absolute top-4 right-4 w-24 h-32 bg-slate-800 rounded-xl border-2 border-slate-700 overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Patient" />
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"><Video size={18} /></div>
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30"><Phone size={20} className="rotate-[135deg]" /></div>
                  </div>
                </div>
              </div>

              {/* Decorative Blur behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/20 to-blue-500/10 rounded-full blur-[80px] -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* 5. DEPARTMENTS */}
        <section id="departments" className="py-24 px-6 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Medical <span className="text-emerald-400">Departments</span></h2>
                <p className="text-white/70 font-light text-lg">Equipped with the latest technology and staffed by expert professionals.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Cardiology", icon: Heart, img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" },
                { name: "Neurology", icon: Brain, img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" },
                { name: "Orthopedics", icon: Bone, img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" }
              ].map((dept, i) => (
                <div key={i} className="group relative rounded-[24px] overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/40 flex flex-col h-full cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-lg">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-[#022c22]/50 group-hover:bg-[#022c22]/20 transition-colors duration-500 z-10"></div>
                    <img src={dept.img} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-6 translate-y-1/2 w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                      <dept.icon size={26} className="text-emerald-600" />
                    </div>
                  </div>
                  <div className="pt-10 pb-8 px-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                    <p className="text-white/60 font-light mb-6">Expert specialized care available via in-person or virtual consultation.</p>
                    <div className="mt-auto flex items-center text-emerald-400 font-medium text-sm group-hover:text-emerald-300">
                      Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="py-24 px-6 relative overflow-hidden bg-[#064e3b]/30">
          <div className="max-w-[1400px] mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">What Our <span className="text-emerald-400">Patients Say</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { name: "Robert Simmons", text: "The telemedicine platform saved me so much time. The doctor was attentive, and I got my prescription instantly." },
                { name: "Emily Davis", text: "Uploading my files before the meeting was incredibly easy. Dr. Sarah had everything she needed before we even started talking." },
                { name: "Michael Thompson", text: "The payment process was secure and seamless. Yanet Hospital has truly modernized healthcare in Ethiopia." }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-[24px] p-8 shadow-lg border border-white/10 hover:border-emerald-500/40 transition-all hover:-translate-y-2 relative">
                  <Quote className="absolute top-6 right-6 h-10 w-10 text-white/5" />
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-white/80 font-light italic mb-8 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <div className="text-xs text-emerald-400">Verified Patient</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA BANNER */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[40px] p-12 md:p-20 text-center relative shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay rounded-[40px]"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Your Health is Our Priority</h2>
              <p className="text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto">
                Dont wait when it comes to your well-being. Schedule a secure video consultation with our world-class specialists today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book" className="bg-white text-emerald-800 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                  <Calendar size={20} /> Book Appointment
                </Link>
                <Link href="/register" className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                  <UserPlus size={20} /> Register as Patient
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-[#011c16] text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <Stethoscope size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight">Yanet Hospital</span>
              </div>
              <p className="text-white/60 font-light leading-relaxed mb-6">Providing advanced healthcare solutions with a commitment to excellence, compassion, and innovation.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Quick Links</h4>
              <ul className="space-y-3 font-light text-white/60">
                <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Patient Portal Login</Link></li>
                <li><Link href="/book" className="hover:text-emerald-400 transition-colors">Book Consultation</Link></li>
                <li><Link href="/register-doctor" className="hover:text-emerald-400 transition-colors">Doctor Application</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Departments</h4>
              <ul className="space-y-3 font-light text-white/60">
                <li>Cardiology Center</li>
                <li>Neurological Institute</li>
                <li>Pediatric Care</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Contact</h4>
              <ul className="space-y-4 font-light text-white/60">
                <li className="flex items-center gap-3"><MapPin size={18} className="text-emerald-500" /> Hawassa, Sidama, Ethiopia</li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-emerald-500" /> +251 911 234 567</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-emerald-500" /> support@yanethospital.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm font-light">
            <p>© {new Date().getFullYear()} Yanet General Hospital. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}