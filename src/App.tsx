import { motion } from "motion/react";
import { GraduationCap, Laptop, Leaf, Users, Menu, X, Search, ChevronRight, Trophy, Award, Star, Calendar, Clock, MapPin, BookOpen, Music, Palette, MessageSquare, HelpCircle, Mail, Heart, Sparkles, Flag, Youtube, Instagram, Video, ShieldCheck, Lock, LogOut, Settings, Send, AlertCircle, Share2, Maximize2 } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("Semua");
  const [newsFilter, setNewsFilter] = useState("Semua");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [galleryCarouselIndex, setGalleryCarouselIndex] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Aduan State
  const [isAduanSubmitted, setIsAduanSubmitted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("😊");
  const aduanEmojis = ["😊", "🐱", "🐶", "🐼", "🦁", "🐸", "🦄", "🚀", "🎨", "⚽"];
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const cat = prompt("Kategori (Akademik/Ekskul/Lomba/Fasilitas):", "Akademik");
        if (cat) {
          setSiteData((prev: any) => ({
            ...prev,
            gallery: [...(prev.gallery || []), { id: Date.now(), cat, img: reader.result as string }]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Site Data State (Editable by Admin)
  const [siteData, setSiteData] = useState(() => {
    const defaultData = {
      heroTitle: "Mendidik Karakter Masa Depan",
      heroSubtitle: "SD Negeri 3 Purwosari merupakan salah satu lembaga pendidikan tingkat Sekolah Dasar di bawah naungan Dinas Pendidikan Kabupaten Wonogiri. Sekolah ini berlokasi di Sumbersari, Desa Purwosari, Kecamatan Wonogiri, Kabupaten Wonogiri, Provinsi Jawa Tengah, Indonesia.",
      stats: [
        { label: "Siswa Aktif", value: "98" },
        { label: "Tenaga Pengajar", value: "11" },
        { label: "Ruang Kelas", value: "6" },
        { label: "Prestasi", value: "25+" },
      ],
      visi: "Menjadi lembaga pendidikan unggulan yang menghasilkan generasi beriman, bertaqwa, cerdas, kreatif, dan inovatif.",
      misi: "Meningkatkan mutu pendidikan melalui inovasi pembelajaran digital dan pengembangan karakter berbasis nilai luhur.",
      contact: {
        address: "Sumbersari, Desa Purwosari, Kecamatan Wonogiri, Kabupaten Wonogiri, Jawa Tengah",
        email: "sdn3purwosari@gmail.com",
        instagram: "@sdn3purwosari",
        youtube: "SDN 3 Purwosari Official",
        tiktok: "@sdn3purwosari_wonogiri"
      },
      teachers: [
        { name: "Titik Purwanti, S.Pd", role: "Kepala Sekolah", img: "https://i.pravatar.cc/300?u=joko" },
        { name: "Afrilia Ekatien Noer Kusuma, S.Pd.", role: "Guru Kelas 1", img: "https://i.pravatar.cc/300?u=siti" },
        { name: "Marlina Setyawati, S.Pd", role: "Guru Kelas 2", img: "https://i.pravatar.cc/300?u=andi" },
        { name: "Catur Wahyuni Sukarno, S.Pd", role: "Guru kelas 3", img: "https://i.pravatar.cc/300?u=dewi" },
        { name: "Titik Purwanti, S.Pd", role: "Guru kelas 4", img: "https://i.pravatar.cc/300?u=joko" },
        { name: "Sriyani Widyawati, S.Pd., M.Pd.", role: "Guru Kelas 5", img: "https://i.pravatar.cc/300?u=siti" },
        { name: "Toni Adhi Putranto, S.Pd", role: "Guru Kelas 6", img: "https://i.pravatar.cc/300?u=dewi" },
        { name: "Ahmad Santoso, S.Pd", role: "Guru PAIBP", img: "https://i.pravatar.cc/300?u=dewi" },
      ],
      news: [
        { date: "25 Mei 2025", title: "Pesta Kenaikan Kelas 2025", category: "Kegiatan", img: "https://picsum.photos/seed/news1/600/400", content: "Pesta kenaikan kelas tahun ini berlangsung sangat meriah dengan berbagai penampilan seni dari siswa-siswi SDN 3 Purwosari. Acara ini dihadiri oleh seluruh orang tua siswa dan tokoh masyarakat setempat. Kepala Sekolah menyampaikan apresiasi yang setinggi-tingginya kepada para siswa yang telah berprestasi selama satu tahun ajaran ini." },
        { date: "12 Juni 2025", title: "Juara Umum Lomba Olahraga", category: "Prestasi", img: "https://picsum.photos/seed/news2/600/400", content: "SDN 3 Purwosari berhasil meraih predikat Juara Umum dalam ajang Lomba Olahraga tingkat Kabupaten. Prestasi ini diraih berkat kerja keras para siswa dan bimbingan intensif dari guru olahraga. Beberapa cabang olahraga yang dimenangkan antara lain sepak bola, voli, dan atletik." },
        { date: "05 Juli 2025", title: "Penerimaan Siswa Baru Dibuka", category: "PPDB", img: "https://picsum.photos/seed/news3/600/400", content: "Penerimaan Peserta Didik Baru (PPDB) SDN 3 Purwosari untuk tahun ajaran 2025/2026 telah resmi dibuka. Kami mengundang para orang tua untuk mendaftarkan putra-putrinya dan menjadi bagian dari keluarga besar SDN 3 Purwosari. Pendaftaran dapat dilakukan secara langsung di sekolah atau melalui portal online kami." },
      ],
      testimonials: [
        { name: "Ibu Ratna", role: "Orang Tua Siswa Kelas 4", text: "Saya sangat puas dengan perkembangan karakter anak saya sejak sekolah di sini. Gurunya sangat perhatian." },
        { name: "Bpk. Budi", role: "Orang Tua Siswa Kelas 6", text: "Fasilitas digitalnya sangat membantu anak saya belajar dengan cara yang lebih modern dan menyenangkan." },
        { name: "Ibu Maya", role: "Alumni Tahun 2015", text: "Pondasi karakter yang saya dapatkan di SDN 3 Purwosari sangat membantu saya di jenjang pendidikan selanjutnya." },
      ],
      calendar: [
        { date: "10 Mar", month: "2025", title: "Ujian Tengah Semester Genap", type: "Akademik", time: "07:30 - 12:00" },
        { date: "22 Mar", month: "2025", title: "Libur Awal Ramadhan 1446 H", type: "Libur", time: "Seluruh Hari" },
        { date: "15 Apr", month: "2025", title: "Pekan Olahraga & Seni (PORSENI)", type: "Kegiatan", time: "08:00 - 14:00" },
      ],
      extracurriculars: [
        { title: "Pramuka", icon: "Users", color: "bg-amber-50 text-amber-600", desc: "Membentuk karakter disiplin, mandiri, dan cinta tanah air." },
        { title: "Seni Musik", icon: "Music", color: "bg-rose-50 text-rose-600", desc: "Mengembangkan bakat musikalitas melalui alat musik tradisional & modern." },
        { title: "Olahraga", icon: "Trophy", color: "bg-emerald-50 text-emerald-600", desc: "Menjaga kebugaran dan sportivitas melalui sepak bola & voli." },
        { title: "Seni Lukis", icon: "Palette", color: "bg-indigo-50 text-indigo-600", desc: "Mengekspresikan kreativitas melalui media kanvas dan warna." },
      ],
      activities: [
        { title: "Upacara Bendera", icon: "Flag", desc: "Setiap Senin pagi." },
        { title: "Senam Pagi", icon: "Heart", desc: "Jumat sehat bersama." },
        { title: "Literasi Pagi", icon: "BookOpen", desc: "Membaca 15 menit." },
        { title: "Sholat Berjamaah", icon: "Users", desc: "Pembiasaan ibadah." },
        { title: "Pentas Seni", icon: "Music", desc: "Ajang bakat siswa." },
      ],
      gallery: [
        { id: 1, cat: "Akademik", img: "https://picsum.photos/seed/school-1/600/600" },
        { id: 2, cat: "Ekskul", img: "https://picsum.photos/seed/school-2/600/600" },
        { id: 3, cat: "Lomba", img: "https://picsum.photos/seed/school-3/600/600" },
        { id: 4, cat: "Fasilitas", img: "https://picsum.photos/seed/school-4/600/600" },
        { id: 5, cat: "Akademik", img: "https://picsum.photos/seed/school-5/600/600" },
        { id: 6, cat: "Ekskul", img: "https://picsum.photos/seed/school-6/600/600" },
        { id: 7, cat: "Lomba", img: "https://picsum.photos/seed/school-7/600/600" },
        { id: 8, cat: "Fasilitas", img: "https://picsum.photos/seed/school-8/600/600" },
      ],
      curriculum: {
        title: "Kurikulum Merdeka",
        desc: "SDN 3 Purwosari telah menerapkan Kurikulum Merdeka yang berfokus pada pengembangan bakat dan minat siswa secara fleksibel dan mendalam.",
        features: [
          "Pembelajaran Berbasis Proyek (P5)",
          "Fokus pada Materi Esensial",
          "Fleksibilitas bagi Guru",
          "Pengembangan Karakter Profil Pelajar Pancasila"
        ]
      }
    };
    const saved = localStorage.getItem("sdn3_site_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultData, ...parsed };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem("sdn3_site_data", JSON.stringify(siteData));
  }, [siteData]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername.toLowerCase() === "admin" && adminPassword === "$Sdn3purwosari") {
      setIsAdminLoggedIn(true);
      setLoginError("");
      setAdminPassword("");
      setAdminUsername("");
    } else {
      setLoginError("Username atau Password salah!");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdminLogin(false);
  };

  const handleShare = async (url: string, title?: string, text?: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Galeri SDN 3 Purwosari',
          text: text || 'Lihat momen berharga di SDN 3 Purwosari!',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      alert("Link telah disalin ke clipboard!");
    }
  };

  const handleShareWebsite = async () => {
    const shareData = {
      title: 'SDN 3 Purwosari Wonogiri',
      text: 'Kunjungi website resmi SDN 3 Purwosari Wonogiri untuk informasi terbaru!',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link website telah disalin ke clipboard!");
    }
  };

  const updateSiteData = (category: string, key: string, value: any) => {
    setSiteData((prev: any) => {
      if (category === "stats") {
        const newStats = [...prev.stats];
        const index = parseInt(key);
        newStats[index] = { ...newStats[index], value: value };
        return { ...prev, stats: newStats };
      }
      if (category === "contact") {
        return { ...prev, contact: { ...prev.contact, [key]: value } };
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Beranda" },
    { 
      id: "profil-group",
      label: "Profil Sekolah", 
      items: [
        { id: "profile", label: "Visi & Misi" },
        { id: "kurikulum", label: "Kurikulum" },
        { id: "guru", label: "Tenaga Pendidik" },
        { id: "prestasi", label: "Prestasi" },
      ]
    },
    { 
      id: "aktivitas-group",
      label: "Aktivitas", 
      items: [
        { id: "ekskul", label: "Ekstrakurikuler" },
        { id: "kegiatan", label: "Kegiatan Sekolah" },
        { id: "gallery", label: "Galeri Foto" },
        { id: "news", label: "Berita & Pengumuman" },
      ]
    },
    { 
      id: "informasi-group",
      label: "Informasi", 
      items: [
        { id: "kalender", label: "Kalender Akademik" },
        { id: "contact", label: "Kontak Kami" },
        { id: "aduan", label: "Layanan Aduan" },
      ]
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (siteData.testimonials?.length) {
        setCurrentTestimonial((prev) => (prev + 1) % siteData.testimonials.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [siteData.testimonials?.length]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
              <GraduationCap size={24} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">SDN 3 Purwosari</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, idx) => (
              item.items ? (
                <div key={idx} className="relative group py-2">
                  <button className="text-sm font-bold text-slate-600 hover:text-brand-600 flex items-center gap-1 transition-colors">
                    {item.label} <ChevronRight size={14} className="rotate-90 group-hover:rotate-[270deg] transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-2">
                    {item.items.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-xl transition-all flex items-center justify-between group/sub"
                      >
                        {sub.label}
                        <ChevronRight size={12} className="opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className={`text-sm font-bold transition-colors hover:text-brand-600 ${activeSection === item.id ? "text-brand-600" : "text-slate-600"}`}
                >
                  {item.label}
                </button>
              )
            ))}
            <button 
              onClick={() => setShowAdminLogin(true)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
            >
              {isAdminLoggedIn ? <Settings size={16} /> : <Lock size={16} />}
              {isAdminLoggedIn ? "Admin Panel" : "Admin"}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-2 md:hidden shadow-xl max-h-[80vh] overflow-y-auto"
          >
            {navItems.map((item, idx) => (
              item.items ? (
                <div key={idx} className="space-y-1 py-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-1">{item.label}</div>
                  {item.items.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-xl transition-all"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className="w-full text-left px-4 py-4 text-sm font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-xl transition-all"
                >
                  {item.label}
                </button>
              )
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        {/* Animated Background Illustration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[10%] w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-40"
          />
          <div className="absolute top-1/4 right-[15%] opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                d="M20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-brand-600"
              />
              <motion.path 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                d="M60 100L90 130L140 80" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-brand-600"
              />
            </svg>
          </div>
          <div className="absolute bottom-1/4 left-[5%] opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <GraduationCap size={120} className="text-brand-600" />
            </motion.div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
              • Terakreditasi B • Unggul & Berkarakter •
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8 text-balance">
              {siteData.heroTitle.split(" ").slice(0, -1).join(" ")} <br />
              <span className="text-brand-600">{siteData.heroTitle.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
              {siteData.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("profile")}
                className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-2 group"
              >
                Jelajahi Profil <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("gallery")}
                className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Lihat Galeri
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.stats?.map((stat: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Keunggulan Kami</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Kami berkomitmen memberikan lingkungan belajar terbaik bagi putra-putri Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <GraduationCap className="text-brand-600" size={32} />, 
                title: "Pendidikan Karakter", 
                desc: "Menanamkan nilai moral dan etika luhur dalam setiap aspek pembelajaran.",
                color: "bg-brand-50"
              },
              { 
                icon: <Laptop className="text-emerald-600" size={32} />, 
                title: "Teknologi Digital", 
                desc: "Kurikulum berbasis IT untuk mempersiapkan siswa menghadapi era digital.",
                color: "bg-emerald-50"
              },
              { 
                icon: <Leaf className="text-amber-600" size={32} />, 
                title: "Sekolah Adiwiyata", 
                desc: "Lingkungan sekolah yang asri dan program kesadaran lingkungan yang kuat.",
                color: "bg-amber-50"
              },
              { 
                icon: <Users className="text-rose-600" size={32} />, 
                title: "Komunitas Aktif", 
                desc: "Kolaborasi erat antara guru, siswa, dan orang tua untuk kemajuan bersama.",
                color: "bg-rose-50"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-100 rounded-full -z-10" />
                <img 
                  src="https://picsum.photos/seed/school/800/600" 
                  alt="Sekolah" 
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Berdiri Sejak</div>
                      <div className="text-xl font-black text-slate-900">1985</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Profil Sekolah</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Membangun Generasi Cerdas & Berakhlak</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                SDN 3 Purwosari Wonogiri adalah institusi pendidikan dasar yang berdedikasi untuk mencetak generasi penerus bangsa yang tidak hanya cerdas secara intelektual, tetapi juga memiliki karakter yang kuat dan berintegritas.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Visi</h4>
                    <p className="text-slate-600 text-sm">{siteData.visi}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Misi</h4>
                    <p className="text-slate-600 text-sm">{siteData.misi}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-brand-50 rounded-3xl border border-brand-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-600 shadow-sm">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Sekolah Ramah Anak (SRA)</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Kami berkomitmen menciptakan lingkungan yang aman, nyaman, dan inklusif bagi setiap anak. Tanpa kekerasan, tanpa diskriminasi, dan menjunjung tinggi hak-hak anak dalam setiap proses pendidikan.
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="mt-10 text-brand-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Baca Selengkapnya <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kurikulum Section */}
      <section id="kurikulum" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Sistem Pendidikan</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">{siteData.curriculum.title}</h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                {siteData.curriculum.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteData.curriculum.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-100 rounded-full -z-10" />
                <img 
                  src="https://picsum.photos/seed/curriculum/800/600" 
                  alt="Kurikulum" 
                  className="rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <BookOpen size={40} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tenaga Pendidik Section */}
      <section id="guru" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Tenaga Pendidik</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Guru-guru berdedikasi yang siap membimbing putra-putri Anda menuju kesuksesan.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.teachers?.map((teacher: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-brand-600 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform" />
                  <img 
                    src={teacher.img} 
                    alt={teacher.name} 
                    className="relative w-48 h-48 object-cover rounded-[2.5rem] shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{teacher.name}</h4>
                <p className="text-sm font-medium text-brand-600 uppercase tracking-widest">{teacher.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi Section */}
      <section id="prestasi" className="py-24 bg-slate-50" aria-labelledby="prestasi-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="prestasi-title" className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Prestasi Sekolah</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Kebanggaan kami atas dedikasi dan kerja keras seluruh civitas akademika.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {[
              { 
                title: "Juara 1 Lomba Adiwiyata", 
                year: "2024", 
                desc: "Penghargaan tingkat kabupaten atas komitmen sekolah dalam pelestarian lingkungan.",
                icon: <Leaf className="text-emerald-600" size={24} aria-hidden="true" />
              },
              { 
                title: "Medali Emas OSN Matematika", 
                year: "2023", 
                desc: "Prestasi gemilang siswa kami dalam Olimpiade Sains Nasional tingkat provinsi.",
                icon: <Trophy className="text-amber-600" size={24} aria-hidden="true" />
              },
              { 
                title: "Sekolah Ramah Anak Terbaik", 
                year: "2024", 
                desc: "Apresiasi atas lingkungan belajar yang aman, nyaman, dan inklusif bagi seluruh siswa.",
                icon: <Award className="text-brand-600" size={24} aria-hidden="true" />
              },
              { 
                title: "Juara Umum FLS2N", 
                year: "2023", 
                desc: "Keberhasilan tim seni kami dalam Festival dan Lomba Seni Siswa Nasional.",
                icon: <Star className="text-rose-600" size={24} aria-hidden="true" />
              },
              { 
                title: "Inovasi Pembelajaran Digital", 
                year: "2024", 
                desc: "Penghargaan atas implementasi teknologi terbaik dalam proses belajar mengajar.",
                icon: <Laptop className="text-indigo-600" size={24} aria-hidden="true" />
              },
              { 
                title: "Juara 1 Gerak Jalan", 
                year: "2023", 
                desc: "Kemenangan tim pramuka dalam peringatan HUT RI tingkat kecamatan.",
                icon: <Users className="text-blue-600" size={24} aria-hidden="true" />
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                role="listitem"
                tabIndex={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-brand-200 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span 
                    className="text-xs font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-widest"
                    aria-label={`Tahun prestasi: ${item.year}`}
                  >
                    {item.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ekstrakurikuler Section */}
      <section id="ekskul" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Ekstrakurikuler</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Wadah bagi siswa untuk mengeksplorasi minat dan bakat di luar jam pelajaran.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.extracurriculars?.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon === "Users" ? <Users size={28} /> : 
                   item.icon === "Music" ? <Music size={28} /> : 
                   item.icon === "Trophy" ? <Trophy size={28} /> : 
                   <Palette size={28} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kegiatan Sekolah Section */}
      <section id="kegiatan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Kegiatan Sekolah</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Berbagai kegiatan rutin dan spesial yang memperkaya pengalaman belajar siswa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {siteData.activities?.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl border border-slate-100 hover:bg-brand-50 transition-all text-center"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm">
                  {item.icon === "Flag" ? <Flag size={24} /> : 
                   item.icon === "Heart" ? <Heart size={24} /> : 
                   item.icon === "BookOpen" ? <BookOpen size={24} /> : 
                   item.icon === "Users" ? <Users size={24} /> : 
                   <Music size={24} />}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Galeri Kegiatan</h2>
              <p className="text-slate-600">Momen-momen berharga dalam perjalanan belajar siswa kami.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Akademik", "Ekskul", "Lomba", "Fasilitas"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                    galleryFilter === cat
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Carousel Preview */}
          {siteData.gallery?.length > 0 && (
            <div className="mb-12 relative group">
              <div className="overflow-hidden rounded-[2.5rem] aspect-[21/9] shadow-2xl border border-slate-100">
                <motion.div 
                  className="flex h-full"
                  animate={{ x: `-${galleryCarouselIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {siteData.gallery.map((item: any, idx: number) => (
                    <div key={item.id} className="min-w-full h-full relative">
                      <img 
                        src={item.img} 
                        className="w-full h-full object-cover cursor-pointer" 
                        onClick={() => setFullScreenImage(item.img)}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="px-3 py-1 bg-brand-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                              {item.cat}
                            </span>
                            <h3 className="text-2xl font-bold">Momen Spesial #{idx + 1}</h3>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleShare(item.img)}
                              className="p-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/40 transition-all"
                            >
                              <Share2 size={20} />
                            </button>
                            <button 
                              onClick={() => setFullScreenImage(item.img)}
                              className="p-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/40 transition-all"
                            >
                              <Maximize2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Carousel Controls */}
              <button 
                onClick={() => setGalleryCarouselIndex(prev => (prev > 0 ? prev - 1 : siteData.gallery.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button 
                onClick={() => setGalleryCarouselIndex(prev => (prev < siteData.gallery.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {siteData.gallery.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setGalleryCarouselIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      galleryCarouselIndex === i ? "bg-white w-8" : "bg-white/40 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteData.gallery?.filter((item: any) => galleryFilter === "Semua" || item.cat === galleryFilter)
              .map((item: any) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 cursor-pointer"
                  onClick={() => setFullScreenImage(item.img)}
                >
                  <img
                    src={item.img}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <div className="flex gap-2 mb-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleShare(item.img); }}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 transition-all text-white"
                      >
                        <Share2 size={18} />
                      </button>
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{item.cat}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Full Screen Image Viewer */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setFullScreenImage(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl w-full h-full flex items-center justify-center"
          >
            <img 
              src={fullScreenImage} 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" 
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <button 
              onClick={() => setFullScreenImage(null)}
              className="absolute top-4 right-4 md:-top-12 md:-right-12 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <X size={32} />
            </button>
            <button 
              onClick={() => handleShare(fullScreenImage)}
              className="absolute bottom-4 right-4 md:-bottom-12 md:right-0 bg-brand-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-xl"
            >
              <Share2 size={20} /> Bagikan Gambar
            </button>
          </motion.div>
        </div>
      )}

      {/* Full Page News View */}
      {selectedNews && (
        <div className="fixed inset-0 z-[250] bg-white overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* News Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
              <div className="max-w-4xl mx-auto flex justify-between items-center">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center gap-2 text-slate-600 hover:text-brand-600 font-bold transition-colors"
                >
                  <ChevronRight size={20} className="rotate-180" /> Kembali
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(selectedNews.img, selectedNews.title, "Baca berita terbaru dari SDN 3 Purwosari!")}
                    className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* News Content */}
            <div className="flex-grow py-12 px-6">
              <article className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <span className="px-4 py-1.5 bg-brand-600 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                    {selectedNews.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                    {selectedNews.title}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{selectedNews.date}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span>Oleh: Admin Sekolah</span>
                  </div>
                </div>

                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                  <img 
                    src={selectedNews.img} 
                    className="w-full h-auto" 
                    alt={selectedNews.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="prose prose-slate prose-lg max-w-none">
                  <p className="text-slate-600 leading-relaxed text-xl mb-8 font-medium">
                    {selectedNews.content}
                  </p>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Mencetak generasi unggul yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan dengan inovasi dan teknologi. Kurikulum Merdeka yang kami terapkan memberikan fleksibilitas bagi guru dan siswa untuk mengeksplorasi potensi diri secara maksimal.
                  </p>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Pendidikan di SDN 3 Purwosari tidak hanya berfokus pada aspek kognitif, tetapi juga pada pembentukan karakter yang kuat berdasarkan nilai-nilai luhur bangsa. Melalui berbagai kegiatan ekstrakurikuler dan pembiasaan positif, kami yakin siswa-siswi kami akan tumbuh menjadi pribadi yang berintegritas.
                  </p>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">SDN 3 Purwosari</p>
                      <p className="text-xs text-slate-500 font-medium">Mendidik dengan Hati</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleShareWebsite()}
                    className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand-700 transition-all shadow-xl shadow-brand-200"
                  >
                    <Share2 size={20} /> Bagikan Berita Ini
                  </button>
                </div>
              </article>
            </div>
          </motion.div>
        </div>
      )}

      {/* Berita Section */}
      <section id="news" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Berita & Pengumuman</h2>
              <p className="text-slate-600">Tetap terhubung dengan informasi terbaru dari sekolah kami.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Kegiatan", "Prestasi", "PPDB"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setNewsFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                    newsFilter === cat
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-200"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.news?.filter((news: any) => newsFilter === "Semua" || news.category === newsFilter)
              .map((news: any, i: number) => (
              <motion.div 
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <img 
                  src={news.img} 
                  alt={news.title} 
                  className="w-full aspect-video object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {news.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">{news.date}</span>
                      <button 
                        onClick={() => handleShare(news.img, news.title, "Baca berita terbaru dari SDN 3 Purwosari!")}
                        className="p-1.5 text-slate-400 hover:text-brand-600 transition-colors"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                    {news.title}
                  </h3>
                  <button 
                    onClick={() => setSelectedNews(news)}
                    className="mt-auto text-sm font-bold text-brand-600 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Baca Selengkapnya <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalender Akademik Section */}
      <section id="kalender" className="py-24 bg-white" aria-labelledby="kalender-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 id="kalender-title" className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Kalender Akademik</h2>
              <p className="text-slate-600">Jadwal penting, ujian, dan hari libur sekolah untuk tahun ajaran 2024/2025.</p>
            </div>
            <button className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 flex items-center gap-2">
              <Calendar size={20} /> Unduh Kalender (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Clock className="text-brand-600" size={24} /> Agenda Mendatang
              </h3>
              <div className="space-y-4">
                {siteData.calendar?.map((event: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6 hover:shadow-md transition-all group"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl flex flex-col items-center justify-center text-brand-700 shadow-sm">
                      <span className="text-2xl font-black leading-none">{event.date.split(' ')[0]}</span>
                      <span className="text-xs font-bold uppercase tracking-widest mt-1">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          event.type === 'Akademik' ? 'bg-blue-50 text-blue-700' : 
                          event.type === 'Libur' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Clock size={12} /> {event.time}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{event.title}</h4>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-brand-600 transition-colors" size={24} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Ringkasan Semester</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm font-medium">Hari Efektif</span>
                    <span className="text-slate-900 font-bold">102 Hari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm font-medium">Hari Libur</span>
                    <span className="text-slate-900 font-bold">14 Hari</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm font-medium">Kegiatan Sekolah</span>
                    <span className="text-slate-900 font-bold">8 Agenda</span>
                  </div>
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lokasi Ujian</div>
                        <div className="text-sm font-bold text-slate-900">Gedung Utama SDN 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold mb-4 relative z-10">Butuh Bantuan?</h3>
                <p className="text-brand-100 text-sm mb-6 relative z-10">Hubungi bagian tata usaha untuk informasi lebih lanjut mengenai jadwal sekolah.</p>
                <button className="w-full bg-white text-brand-600 py-3 rounded-xl font-bold text-sm hover:bg-brand-50 transition-all relative z-10">
                  Hubungi Tata Usaha
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Apa Kata Mereka?</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Testimoni dari orang tua siswa mengenai pengalaman belajar di SDN 3 Purwosari.</p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[300px]">
            {siteData.testimonials?.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: currentTestimonial === i ? 1 : 0,
                  x: currentTestimonial === i ? 0 : (currentTestimonial > i ? -100 : 100),
                  zIndex: currentTestimonial === i ? 10 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 bg-brand-600 rounded-3xl rotate-6 absolute inset-0 -z-10" />
                  <img 
                    src={`https://i.pravatar.cc/150?u=${item.name}`} 
                    alt={item.name} 
                    className="w-24 h-24 rounded-3xl object-cover shadow-lg"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <MessageSquare className="text-brand-600 absolute -bottom-2 -right-2 bg-white rounded-lg p-1 shadow-md" size={24} />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-700 italic text-lg md:text-xl mb-6 leading-relaxed">"{item.text}"</p>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                    <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Carousel Indicators */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {siteData.testimonials?.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonial === i ? "bg-brand-600 w-8" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Tanya Jawab</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Pertanyaan yang sering diajukan mengenai pendaftaran dan kegiatan sekolah.</p>
              <div className="bg-brand-600 p-8 rounded-3xl text-white">
                <HelpCircle size={40} className="mb-4 opacity-50" />
                <h4 className="text-xl font-bold mb-2">Masih punya pertanyaan?</h4>
                <p className="text-brand-100 text-sm mb-6">Tim kami siap membantu Anda memberikan informasi yang dibutuhkan.</p>
                <button onClick={() => scrollToSection("contact")} className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold text-sm w-full">
                  Hubungi Kami
                </button>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-4">
              {[
                { q: "Kapan pendaftaran siswa baru dibuka?", a: "Pendaftaran siswa baru (PPDB) biasanya dibuka pada bulan Mei hingga Juli setiap tahunnya." },
                { q: "Apa saja syarat pendaftaran?", a: "Syarat utama meliputi akta kelahiran, kartu keluarga, dan ijazah TK (jika ada)." },
                { q: "Apakah ada biaya pendaftaran?", a: "Sebagai sekolah negeri, biaya pendidikan dasar di SDN 3 Purwosari disubsidi penuh oleh pemerintah." },
                { q: "Bagaimana dengan fasilitas keamanan sekolah?", a: "Kami memiliki sistem keamanan 24 jam dan lingkungan sekolah yang tertutup untuk memastikan keamanan siswa." },
              ].map((item, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h4 className="font-bold text-slate-900">{item.q}</h4>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <ChevronRight size={18} />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-600/5 -z-0" />
            <div className="flex flex-col lg:flex-row gap-16 relative z-10">
              <div className="lg:w-1/2 text-white">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Hubungi Kami</h2>
                <p className="text-slate-400 mb-10 text-lg">
                  Punya pertanyaan tentang pendaftaran atau program sekolah? Tim kami siap membantu Anda.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Alamat</div>
                      <div className="text-slate-300">{siteData.contact.address}</div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-400">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email</div>
                      <div className="text-slate-300">{siteData.contact.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-4">
                    <a href={`https://instagram.com/${siteData.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Instagram</div>
                        <div className="text-sm text-slate-100 font-bold">{siteData.contact.instagram}</div>
                      </div>
                      <ChevronRight className="ml-auto text-slate-600" size={20} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <Youtube size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Youtube</div>
                        <div className="text-sm text-slate-100 font-bold">{siteData.contact.youtube}</div>
                      </div>
                      <ChevronRight className="ml-auto text-slate-600" size={20} />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                        <Video size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">TikTok</div>
                        <div className="text-sm text-slate-100 font-bold">{siteData.contact.tiktok}</div>
                      </div>
                      <ChevronRight className="ml-auto text-slate-600" size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nama</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Nama Lengkap" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                        <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="email@anda.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pesan</label>
                      <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none min-h-[120px]" placeholder="Tulis pesan Anda di sini..."></textarea>
                    </div>
                    <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aduan Section */}
      <section id="aduan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Layanan Aduan</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Sampaikan kritik, saran, atau laporan Anda untuk membantu kami meningkatkan kualitas pelayanan pendidikan.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
              {isAduanSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-8xl mb-6">🎉</div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Matur Nuwun!</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Terima kasih atas partisipasi Anda. Aduan/Saran Anda telah kami terima dan akan segera kami tindak lanjuti untuk kemajuan SDN 3 Purwosari.
                  </p>
                  <button 
                    onClick={() => setIsAduanSubmitted(false)}
                    className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all"
                  >
                    Kirim Aduan Lainnya
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAduanSubmitted(true); }}>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pilih Avatar Kamu</label>
                    <div className="flex flex-wrap gap-3">
                      {aduanEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedAvatar(emoji)}
                          className={`w-12 h-12 flex items-center justify-center text-2xl rounded-2xl transition-all ${
                            selectedAvatar === emoji ? "bg-brand-600 scale-110 shadow-lg" : "bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-brand-200 transition-all has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
                      <input type="radio" name="aduan_type" value="kritik" className="hidden" defaultChecked />
                      <MessageSquare size={20} className="text-slate-400" />
                      <span className="font-bold text-slate-900">Kritik</span>
                    </label>
                    <label className="relative flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-brand-200 transition-all has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
                      <input type="radio" name="aduan_type" value="saran" className="hidden" />
                      <Sparkles size={20} className="text-slate-400" />
                      <span className="font-bold text-slate-900">Saran</span>
                    </label>
                    <label className="relative flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-brand-200 transition-all has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
                      <input type="radio" name="aduan_type" value="laporan" className="hidden" />
                      <AlertCircle size={20} className="text-slate-400" />
                      <span className="font-bold text-slate-900">Laporan</span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Identitas (Opsional)</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Nama atau Email (kosongkan jika anonim)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Isi Aduan</label>
                      <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none min-h-[150px]" placeholder="Tuliskan kritik, saran, atau laporan Anda secara detail..."></textarea>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <Send size={20} /> Kirim Aduan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Login Modal */}
      {showAdminLogin && !isAdminLoggedIn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAdminLogin(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-4">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Admin Login</h3>
              <p className="text-slate-500 text-sm">Masukkan password untuk mengelola konten website.</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Username</label>
                <input 
                  type="text" 
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                  placeholder="admin" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                  placeholder="••••••••" 
                />
                {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
              </div>
              <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all">
                Masuk
              </button>
              <p className="text-center text-[10px] text-slate-400">Hint: admin / $Sdn3purwosari</p>
            </form>
          </motion.div>
        </div>
      )}

      {/* Admin Dashboard Overlay */}
      {isAdminLoggedIn && showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowAdminLogin(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 relative z-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Admin Dashboard</h3>
                  <p className="text-slate-500 text-sm font-medium">Kelola informasi website secara real-time.</p>
                </div>
              </div>
              <button 
                onClick={handleAdminLogout}
                className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h4 className="font-black text-lg text-slate-900 border-b pb-2">Hero Section</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Utama</label>
                    <input 
                      type="text" 
                      value={siteData.heroTitle}
                      onChange={(e) => updateSiteData("hero", "heroTitle", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subjudul</label>
                    <textarea 
                      value={siteData.heroSubtitle}
                      onChange={(e) => updateSiteData("hero", "heroSubtitle", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none min-h-[100px]" 
                    />
                  </div>
                </div>

                <h4 className="font-black text-lg text-slate-900 border-b pb-2 pt-4">Visi & Misi</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Visi</label>
                    <textarea 
                      value={siteData.visi}
                      onChange={(e) => updateSiteData("visi", "visi", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Misi</label>
                    <textarea 
                      value={siteData.misi}
                      onChange={(e) => updateSiteData("misi", "misi", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                </div>

                <h4 className="font-black text-lg text-slate-900 border-b pb-2 pt-4">Statistik Sekolah</h4>
                <div className="grid grid-cols-2 gap-4">
                  {siteData.stats?.map((stat: any, i: number) => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</label>
                      <input 
                        type="text" 
                        value={stat.value}
                        onChange={(e) => updateSiteData("stats", i.toString(), e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                      />
                    </div>
                  ))}
                </div>

                <h4 className="font-black text-lg text-slate-900 border-b pb-2 pt-4">Kurikulum</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Judul Kurikulum</label>
                    <input 
                      type="text" 
                      value={siteData.curriculum.title}
                      onChange={(e) => setSiteData({...siteData, curriculum: {...siteData.curriculum, title: e.target.value}})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Deskripsi Kurikulum</label>
                    <textarea 
                      value={siteData.curriculum.desc}
                      onChange={(e) => setSiteData({...siteData, curriculum: {...siteData.curriculum, desc: e.target.value}})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="font-black text-lg text-slate-900 border-b pb-2">Kontak & Sosial Media</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alamat</label>
                    <input 
                      type="text" 
                      value={siteData.contact.address}
                      onChange={(e) => updateSiteData("contact", "address", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                    <input 
                      type="text" 
                      value={siteData.contact.email}
                      onChange={(e) => updateSiteData("contact", "email", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Instagram Username</label>
                      <input 
                        type="text" 
                        value={siteData.contact.instagram}
                        onChange={(e) => updateSiteData("contact", "instagram", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Youtube Channel</label>
                      <input 
                        type="text" 
                        value={siteData.contact.youtube}
                        onChange={(e) => updateSiteData("contact", "youtube", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">TikTok Username</label>
                      <input 
                        type="text" 
                        value={siteData.contact.tiktok}
                        onChange={(e) => updateSiteData("contact", "tiktok", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <h4 className="font-black text-lg text-slate-900 border-b pb-2 pt-4">Data List (Manajemen Konten)</h4>
                <p className="text-xs text-slate-500">Kelola data list (Guru, Berita, Testimoni, dll) dengan mudah.</p>
                
                <div className="space-y-8">
                  {/* Teachers Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tenaga Pendidik</label>
                      <button 
                        onClick={() => {
                          const name = prompt("Nama Guru:");
                          const role = prompt("Jabatan:");
                          if (name && role) {
                            setSiteData({...siteData, teachers: [...(siteData.teachers || []), { name, role, img: "https://i.pravatar.cc/300?u=" + Date.now() }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Guru
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.teachers?.map((t: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <img src={t.img} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                            <div>
                              <p className="text-xs font-bold text-slate-900">{t.name}</p>
                              <p className="text-[10px] text-slate-500">{t.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                const newName = prompt("Edit Nama:", t.name);
                                const newRole = prompt("Edit Jabatan:", t.role);
                                if (newName && newRole) {
                                  const newList = [...siteData.teachers];
                                  newList[i] = { ...t, name: newName, role: newRole };
                                  setSiteData({...siteData, teachers: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus guru ini?")) {
                                  setSiteData({...siteData, teachers: siteData.teachers.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* News Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Berita & Pengumuman</label>
                      <button 
                        onClick={() => {
                          const title = prompt("Judul Berita:");
                          const category = prompt("Kategori (Kegiatan/Prestasi/PPDB):");
                          const content = prompt("Isi Berita:");
                          if (title && category && content) {
                            setSiteData({...siteData, news: [...(siteData.news || []), { title, category, content, date: new Date().toLocaleDateString('id-ID'), img: "https://picsum.photos/seed/"+Date.now()+"/600/400" }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Berita
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.news?.map((n: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</p>
                            <p className="text-[10px] text-slate-500">{n.category} • {n.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                const newTitle = prompt("Edit Judul:", n.title);
                                const newCat = prompt("Edit Kategori:", n.category);
                                const newContent = prompt("Edit Isi Berita:", n.content);
                                if (newTitle && newCat && newContent) {
                                  const newList = [...siteData.news];
                                  newList[i] = { ...n, title: newTitle, category: newCat, content: newContent };
                                  setSiteData({...siteData, news: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus berita ini?")) {
                                  setSiteData({...siteData, news: siteData.news.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonials Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Testimoni</label>
                      <button 
                        onClick={() => {
                          const name = prompt("Nama:");
                          const role = prompt("Peran (misal: Orang Tua Siswa):");
                          const text = prompt("Isi Testimoni:");
                          if (name && role && text) {
                            setSiteData({...siteData, testimonials: [...(siteData.testimonials || []), { name, role, text }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Testimoni
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.testimonials?.map((t: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex-grow pr-4">
                            <p className="text-xs font-bold text-slate-900">{t.name}</p>
                            <p className="text-[10px] text-slate-500 line-clamp-1 italic">"{t.text}"</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => {
                                const newName = prompt("Edit Nama:", t.name);
                                const newRole = prompt("Edit Peran:", t.role);
                                const newText = prompt("Edit Testimoni:", t.text);
                                if (newName && newRole && newText) {
                                  const newList = [...siteData.testimonials];
                                  newList[i] = { ...t, name: newName, role: newRole, text: newText };
                                  setSiteData({...siteData, testimonials: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus testimoni ini?")) {
                                  setSiteData({...siteData, testimonials: siteData.testimonials.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendar Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kalender Akademik</label>
                      <button 
                        onClick={() => {
                          const title = prompt("Nama Kegiatan:");
                          const date = prompt("Tanggal (misal: 10 Mar):");
                          const month = prompt("Tahun/Bulan (misal: 2025):");
                          if (title && date && month) {
                            setSiteData({...siteData, calendar: [...(siteData.calendar || []), { title, date, month, type: "Kegiatan", time: "08:00 - Selesai" }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Agenda
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.calendar?.map((c: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{c.title}</p>
                            <p className="text-[10px] text-slate-500">{c.date} {c.month}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                const newTitle = prompt("Edit Kegiatan:", c.title);
                                const newDate = prompt("Edit Tanggal:", c.date);
                                if (newTitle && newDate) {
                                  const newList = [...siteData.calendar];
                                  newList[i] = { ...c, title: newTitle, date: newDate };
                                  setSiteData({...siteData, calendar: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus agenda ini?")) {
                                  setSiteData({...siteData, calendar: siteData.calendar.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Galeri Foto</label>
                      <input 
                        type="file" 
                        ref={galleryInputRef} 
                        onChange={handleGalleryUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                      <button 
                        onClick={() => galleryInputRef.current?.click()}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Upload Foto
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {siteData.gallery?.map((g: any) => (
                        <div key={g.id} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-100">
                          <img src={g.img} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button 
                              onClick={() => {
                                if (confirm("Hapus foto ini?")) {
                                  setSiteData({...siteData, gallery: siteData.gallery.filter((item: any) => item.id !== g.id)});
                                }
                              }}
                              className="bg-red-500 text-white p-2 rounded-lg"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extracurriculars Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ekstrakurikuler</label>
                      <button 
                        onClick={() => {
                          const title = prompt("Nama Ekskul:");
                          const desc = prompt("Deskripsi:");
                          if (title && desc) {
                            setSiteData({...siteData, extracurriculars: [...(siteData.extracurriculars || []), { title, desc, icon: "Users", color: "bg-slate-50 text-slate-600" }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Ekskul
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.extracurriculars?.map((e: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{e.title}</p>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{e.desc}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                const newTitle = prompt("Edit Nama:", e.title);
                                const newDesc = prompt("Edit Deskripsi:", e.desc);
                                if (newTitle && newDesc) {
                                  const newList = [...siteData.extracurriculars];
                                  newList[i] = { ...e, title: newTitle, desc: newDesc };
                                  setSiteData({...siteData, extracurriculars: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus ekskul ini?")) {
                                  setSiteData({...siteData, extracurriculars: siteData.extracurriculars.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities Manager */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kegiatan Sekolah</label>
                      <button 
                        onClick={() => {
                          const title = prompt("Nama Kegiatan:");
                          const desc = prompt("Deskripsi:");
                          if (title && desc) {
                            setSiteData({...siteData, activities: [...(siteData.activities || []), { title, desc, icon: "Flag" }]});
                          }
                        }}
                        className="text-[10px] bg-brand-600 text-white px-3 py-1 rounded-lg font-bold"
                      >
                        + Tambah Kegiatan
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {siteData.activities?.map((a: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{a.title}</p>
                            <p className="text-[10px] text-slate-500">{a.desc}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                const newTitle = prompt("Edit Nama:", a.title);
                                const newDesc = prompt("Edit Deskripsi:", a.desc);
                                if (newTitle && newDesc) {
                                  const newList = [...siteData.activities];
                                  newList[i] = { ...a, title: newTitle, desc: newDesc };
                                  setSiteData({...siteData, activities: newList});
                                }
                              }}
                              className="text-[10px] text-brand-600 font-bold"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm("Hapus kegiatan ini?")) {
                                  setSiteData({...siteData, activities: siteData.activities.filter((_: any, idx: number) => idx !== i)});
                                }
                              }}
                              className="text-[10px] text-red-500 font-bold"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <button 
                    onClick={() => setShowAdminLogin(false)}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                  <GraduationCap size={24} />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">SDN 3 Purwosari</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
                Mencetak generasi unggul yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan dengan inovasi dan teknologi.
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:text-brand-600 hover:border-brand-600 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Instagram</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:text-brand-600 hover:border-brand-600 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Youtube</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 hover:text-brand-600 hover:border-brand-600 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <Video size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">TikTok</span>
                </a>
                <button 
                  onClick={handleShareWebsite}
                  className="group flex items-center gap-3 bg-brand-600 text-white px-4 py-2 rounded-xl hover:bg-brand-700 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Bagikan Website</span>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Tautan Cepat</h4>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToSection(item.id)} className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-200" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-sm">Berlangganan</h4>
              <p className="text-slate-500 text-xs mb-4">Dapatkan informasi terbaru mengenai kegiatan sekolah langsung di email Anda.</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email Anda" className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs w-full focus:ring-2 focus:ring-brand-500 outline-none" />
                <button className="bg-brand-600 text-white p-2 rounded-xl">
                  <Mail size={16} />
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-medium">
              © 2025 SDN 3 Purwosari Wonogiri. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-2xl floating-btn hover:bg-brand-700 transition-all group relative">
          <Sparkles size={28} className="group-hover:scale-110 transition-transform" />
          <div className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
            Tanya Asisten AI
          </div>
        </button>
      </div>
    </div>
  );
}
