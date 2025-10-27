// === INI ADALAH KODE script.js ANDA YANG SUDAH DIPERBAIKI (FINAL V3) ===

// [PERBAIKAN BESAR]: "Bungkus" SEMUA kode dalam 'DOMContentLoaded'.
// Ini memastikan script baru berjalan SETELAH seluruh HTML (termasuk tombol) 
// DAN script CDN Supabase selesai dimuat.
document.addEventListener('DOMContentLoaded', function() {

  // ---- Semua kode kita sekarang ada di dalam sini ----

  // 1. Masukkan URL dan Kunci API Supabase Anda
  const SUPABASE_URL = 'https://nyutkovektcpdgrbfblv.supabase.co'; 
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dXRrb3Zla3RjcGRncmJmYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MzAxNzksImV4cCI6MjA3NzEwNjE3OX0.yEUd0sKuUddochBYLxvAZIfJkiH6tUeMbkMAPNe8IR0'; 

  // 2. Buat koneksi ("pelayan") ke Supabase
  // [PERBAIKAN]: Pindahkan ini ke DALAM listener.
  // Kita gunakan 'supabase' global dari CDN.
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // 3. Tes koneksi: Coba ambil data dari tabel 'sekolah'
  async function tesKoneksi() {
    console.log("Mencoba mengambil data dari Supabase...");
    
    // Pastikan nama tabel 'sekolah' huruf kecil
    const { data, error } = await supabaseClient
      .from('sekolah') 
      .select('*');    

    if (error) {
      console.error('Koneksi GAGAL:', error.message);
      alert('Koneksi ke database GAGAL! Cek error di console: ' + error.message);
    } else {
      console.log('Koneksi BERHASIL! Ini datanya:', data);
    }
  }

  // 4. Menghubungkan ke tombol "Proses & Lihat Rapor"
  const tombolProses = document.getElementById('generate-btn');

  // Pengecekan keamanan jika tombol tidak ditemukan
  if (tombolProses) {
    
    // Tambahkan 'pendengar' klik ke tombol itu
    tombolProses.addEventListener('click', async function() {
      
      console.log("Tombol 'Proses' ditekan. Mencoba menyimpan data...");

      // --- BAGIAN 1: KODE UNTUK MENYIMPAN DATA (CONTOH) ---
      // (PENTING: GANTI INI untuk mengambil data dari form input Anda)
      const idSiswa = '2025001'; // CONTOH
      const idMapel = 'MP-01'; // CONTOH
      const namaGuru = 'Guru Contoh, S.Pd.'; // CONTOH
      const nilaiNH1 = 80; // CONTOH
      const nilaiUTS = 85; // CONTOH
      const nilaiPAS = 90; // CONTOH
      const rataRata = 85; // CONTOH

      // Coba simpan ke Supabase
      const { data, error } = await supabaseClient 
        .from('nilai') // <-- pastikan nama tabel 'nilai' benar (huruf kecil)
        .insert([
          { 
            id_siswa: idSiswa,        // ⬅️ pastikan kolom 'id_siswa' benar
            id_mapel: idMapel,
            nama_guru: namaGuru,
            nh1: nilaiNH1,
            uts: nilaiUTS,
            pas: nilaiPAS,
            nilai_rata_rata: rataRata // ⬅️ pastikan kolom 'nilai_rata_rata' benar
          }
        ]);

      // --- BAGIAN 2: PERIKSA APAKAH SIMPAN BERHASIL ---
      if (error) {
        // Jika GAGAL simpan, tampilkan error dan hentikan proses
        console.error('GAGAL MENYIMPAN DATA!', error);
        alert('Gagal menyimpan data baru: ' + error.message);
      } else {
        // Jika BERHASIL simpan, lanjutkan ke kode Anda yang lama
        console.log('Data baru berhasil disimpan!', data);
        alert('Data berhasil disimpan! Lanjut memproses rapor...');
        
        // ...
        // ... (Letakkan kode LAMA Anda untuk 'melihat rapor' di sini)
        // ...
      }
    });

  } else {
    // Ini akan muncul di console jika tombolnya TIDAK KETEMU
    console.error("Kesalahan Kritis: Tombol dengan ID 'generate-btn' tidak ditemukan!");
  }

  // 5. Panggil fungsi tes SETELAH semuanya siap
  tesKoneksi();

}); // <-- Ini adalah penutup dari 'DOMContentLoaded'
