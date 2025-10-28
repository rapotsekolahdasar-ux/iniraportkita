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
// --- FUNGSI BARU UNTUK MENYIMPAN DATA SEKOLAH ---
  // (Letakkan ini setelah tesKoneksi() tapi SEBELUM 'const tombolProses')

  // A. Hubungkan ke tombol 'simpan' Anda
  //    (GANTI ID INI dengan ID tombol 'Simpan Sekolah' Anda!)
  const tombolSimpanSekolah = document.getElementById('btn-simpan-sekolah'); 

  if (tombolSimpanSekolah) {
    
    tombolSimpanSekolah.addEventListener('click', async function() {
      console.log("Tombol 'Simpan Sekolah' ditekan...");

      // B. Ambil data dari form
      
      //    (GANTI ID INI dengan ID input 'ID Sekolah' Anda, misal: 'id-sekolah')
      const idSekolah = document.getElementById('sekolah').value;
      
      //    (INI SUDAH BENAR berdasarkan gambar 'image_6dc247.png' Anda)
      const namaSekolah = document.getElementById('sekolah').value; 

      // C. Kirim data ke tabel 'sekolah'
      //    (Tabel 'sekolah' sudah benar, kita pakai di tesKoneksi())
      const { data, error } = await supabaseClient
        .from('sekolah') 
        .insert([
          { 
            id_sekolah: idSekolah,   // <-- Pastikan nama kolom di Supabase benar
            nama_sekolah: namaSekolah // <-- Pastikan nama kolom di Supabase benar
          }
        ]);

      // D. Beri tahu guru apakah berhasil atau gagal
      if (error) {
        console.error('GAGAL MENYIMPAN DATA SEKOLAH!', error);
        alert('Gagal menyimpan data sekolah: ' + error.message);
      } else {
        console.log('Data sekolah berhasil disimpan!', data);
        alert('Data Sekolah BERHASIL disimpan!');
      }
    });

  } else {
    // Pesan ini akan muncul di Console jika ID tombol Anda salah
    console.error("Kesalahan: Tombol 'Simpan Sekolah' tidak ditemukan! Periksa ID-nya.");
  }

  // --- AKHIR DARI FUNGSI BARU ---
  // 4. Menghubungkan ke tombol "Proses & Lihat Rapor"
  const tombolProses = document.getElementById('generate-btn');

  if (tombolProses) {
    
    tombolProses.addEventListener('click', async function() {
      
      console.log("Tombol 'Proses' ditekan. Mencoba menyimpan data...");

      // --- BAGIAN 1: KODE UNTUK MENYIMPAN DATA (INI YANG SUDAH BENAR) ---
      
      // Ambil data TEKS dari form
      
      // BENAR - Ditemukan di image_43131f.png (ini adalah ID)
      const idSiswa = document.getElementById('pilih-siswa-identitas').value;
      
      // BENAR - Ditemukan di image_43717b.png (ini adalah ID)
      const idMapel = document.getElementById('pilih-mapel-atp').value;
      
      // BENAR - Ditemukan di image_43809d.png (ini adalah ID)
      const namaGuru = document.getElementById('nama-wali-kelas').value;

      // BENAR - Ditemukan di image_f04fe4.png (ini adalah CLASS)
      // (Pastikan nama class ini 'nh1-input', 'uts-input', 'pas-input' di HTML Anda)
      const nilaiNH1_teks = document.querySelector('.nh1-input').value;
      const nilaiNH2_teks = document.querySelector('.nh2-input').value;
      const nilaiNH3_teks = document.querySelector('.nh3-input').value;
      const nilaiUTS_teks = document.querySelector('.uts-input').value;
      const nilaiPAS_teks = document.querySelector('.pas-input').value;

      // UBAH TEKS MENJADI ANGKA untuk perhitungan
      const nilaiNH1_angka = parseInt(nilaiNH1_teks);
      const nilaiNH2_angka = parseInt(nilaiNH2_teks);
      const nilaiNH3_angka = parseInt(nilaiNH3_teks);
      const nilaiUTS_angka = parseInt(nilaiUTS_teks);
      const nilaiPAS_angka = parseInt(nilaiPAS_teks);
      
      // HITUNG RATA-RATA (Bukan diambil dari form)
      const nilaiAkhir = Math.round(((2 * rataRataHarian) + uts + pas) / 4 );

      // Coba simpan ke Supabase
      const { data, error } = await supabaseClient 
        .from('nilai') 
        .insert([
          { 
            id_siswa: idSiswa,
            id_mapel: idMapel,
            nama_guru: namaGuru,
            nh1: nilaiNH1_angka,
            nh2: nilaiNH1_angka,
            nh3: nilaiNH1_angka,
            uts: nilaiUTS_angka,
            pas: nilaiPAS_angka,
            nilai_akhir: nilaiAkhir 
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



