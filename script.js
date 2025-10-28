// === PASTIKAN script.js ANDA BERISI KODE INI (V3) ===

document.addEventListener('DOMContentLoaded', function() {

  // ---- Semua kode kita sekarang ada di dalam sini ----

  // 1. Masukkan URL dan Kunci API Supabase Anda
  const SUPABASE_URL = 'https://nyutkovektcpdgrbfblv.supabase.co'; 
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dXRrb3Zla3RjcGRncmJmYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MzAxNzksImV4cCI6MjA3NzEwNjE3OX0.yEUd0sKuUddochBYLxvAZIfJkiH6tUeMbkMAPNe8IR0'; 

  // 2. Buat koneksi ("pelayan") ke Supabase
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // 3. Tes koneksi: Coba ambil data dari tabel 'sekolah'
  async function tesKoneksi() {
    console.log("Mencoba mengambil data dari Supabase...");
    
    // PERIKSA INI: Nama tabel 'sekolah' (huruf kecil)
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

  if (tombolProses) {
    
    tombolProses.addEventListener('click', async function() {
      
      console.log("Tombol 'Proses' ditekan. Mencoba menyimpan data...");

      // --- BAGIAN 1: KODE UNTUK MENYIMPAN DATA (INI YANG SUDAH BENAR) ---
      
      // [PERBAIKAN]: Menggunakan querySelector dengan tanda TITIK ('.') 
      // karena Anda bilang HTML-nya menggunakan CLASS, bukan ID.
      // Pastikan nama class ini SAMA PERSIS dengan di index.html
      
      const idSiswa = document.querySelector('.pilih-siswa-identitas').value;
      const idMapel = document.querySelector('.nama-mapel').value;
      const namaGuru = document.querySelector('.nama-wali-kelas').value;
      const nilaiNH1_teks = document.querySelector('.nh1-input').value;
      const nilaiUTS_teks = document.querySelector('.uts-input').value;
      const nilaiPAS_teks = document.querySelector('.pas-input').value;

      // UBAH TEKS MENJADI ANGKA untuk perhitungan
      const nilaiNH1_angka = parseInt(nilaiNH1_teks);
      const nilaiUTS_angka = parseInt(nilaiUTS_teks);
      const nilaiPAS_angka = parseInt(nilaiPAS_teks);

      // HITUNG RATA-RATA (Bukan diambil dari form)
      const rataRata = Math.round((nilaiNH1_angka + nilaiUTS_angka + nilaiPAS_angka) / 3);

      // Coba simpan ke Supabase
      const { data, error } = await supabaseClient 
        .from('nilai') 
        .insert([
          { 
            id_siswa: idSiswa,
            id_mapel: idMapel,
            nama_guru: namaGuru,
            nh1: nilaiNH1_angka,
            uts: nilaiUTS_angka,
            pas: nilaiPAS_angka,
            nilai_rata_rata: rataRata
          }
        ]);

      // --- BAGIAN 2: PERIKSA APAKAH SIMPAN BERHASIL ---
      if (error) {
        console.error('GAGAL MENYIMPAN DATA!', error);
        alert('Gagal menyimpan data baru: ' + error.message);
      } else {
        console.log('Data baru berhasil disimpan!', data);
        alert('Data berhasil disimpan! Lanjut memproses rapor...');
      }
    });

  } else {
    console.error("Kesalahan Kritis: Tombol dengan ID 'generate-btn' tidak ditemukan!");
  }

  // 5. Panggil fungsi tes SETELAH semuanya siap
  tesKoneksi();

});
