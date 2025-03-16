# star-stock

3. ip Modülü Kullanarak Basitçe IP Almak
Alternatif olarak, ip adlı npm paketini kullanabilirsin.

📌 Öncelikle paketi yükle:

sh
npm install ip
Sonra şu kodu kullan:

js
const ip = require('ip');
console.log('Bilgisayarın IP adresi:', ip.address());
✅ Örnek Çıktı:

yaml
Bilgisayarın IP adresi: 192.168.1.10
Bu yöntemlerden biri ihtiyacını karşılayacaktır. Eğer dış IP adresini (internet üzerindeki IP) öğrenmek istersen, bana söyle, onu da anlatabilirim! 🚀