// --- BAGIAN 1: KODE UNTUK MENYIMPAN DATA (INI YANG SUDAH BENAR) ---
      
      // Ambil data TEKS dari form
      const idSiswa = document.getElementById('pilih-siswa-identitas').value;
      const idMapel = document.getElementById('nama-mapel').value;
      const namaGuru = document.getElementById('nama-wali-kelas').value;
      const nilaiNH1_teks = document.getElementById('nh1-input').value;
      const nilaiUTS_teks = document.getElementById('uts-input').value;
      const nilaiPAS_teks = document.getElementById('pas-input').value;

      // UBAH TEKS MENJADI ANGKA untuk perhitungan
      const nilaiNH1_angka = parseInt(nilaiNH1_teks);
      const nilaiUTS_angka = parseInt(nilaiUTS_teks);
      const nilaiPAS_angka = parseInt(nilaiPAS_teks);

      // HITUNG RATA-RATA (ini yang benar)
      // Kita bulatkan angkanya jika perlu (Math.round)
      const rataRata = Math.round((nilaiNH1_angka + nilaiUTS_angka + nilaiPAS_angka) / 3);

      // Coba simpan ke Supabase
      const { data, error } = await supabaseClient 
        .from('nilai') 
        .insert([
          { 
            id_siswa: idSiswa,
            id_mapel: idMapel,
            nama_guru: namaGuru,
            nh1: nilaiNH1_angka,  // ⬅️ Kirim angka
            uts: nilaiUTS_angka,  // ⬅️ Kirim angka
            pas: nilaiPAS_angka,  // ⬅️ Kirim angka
            nilai_rata_rata: rataRata // ⬅️ Kirim hasil hitungan
          }
        ]);
