// main.js

// Modul untuk mengontrol siklus hidup aplikasi dan membuat jendela browser native
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Fungsi untuk membuat jendela browser.
function createWindow() {
  // Membuat jendela browser.
  const mainWindow = new BrowserWindow({
    width: 1200, // Lebar jendela
    height: 800, // Tinggi jendela
    webPreferences: {
      // Opsi untuk mengintegrasikan Node.js di dalam jendela aplikasi
      // Ini memungkinkan kita menggunakan fitur-fitur sistem jika diperlukan
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'icon.png') // (Opsional) Tambahkan icon untuk aplikasi Anda
  });

  // Memuat file rapor-digital.html ke dalam jendela.
  mainWindow.loadFile('rapor-digital.html');

  // (Opsional) Buka DevTools untuk debugging jika diperlukan.
  // mainWindow.webContents.openDevTools();
}

// Metode ini akan dipanggil saat Electron selesai
// inisialisasi dan siap untuk membuat jendela browser.
// Beberapa API hanya bisa digunakan setelah event ini terjadi.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // Di macOS, umum untuk membuat kembali jendela di aplikasi saat
    // ikon dok diklik dan tidak ada jendela lain yang terbuka.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Keluar saat semua jendela ditutup, kecuali di macOS. Di sana,
// umum bagi aplikasi dan bilah menunya untuk tetap aktif sampai pengguna
// keluar secara eksplisit dengan Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
