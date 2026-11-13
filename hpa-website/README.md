# HPA Teknoloji — Yeni Web Sitesi

hpa.com.tr için logoya dayalı yeni tasarım dili ile baştan hazırlanmış, bağımlılıksız statik site.

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Anasayfa: ürün sahnesi, temsilcilikler, neden HPA, uygulamalar, yetkinlik, CTA |
| `kurumsal.html` | Hakkımızda + Vizyon & Misyon (`#vizyon-misyon`) + değerler |
| `metal-work.html`, `franke.html`, `voith.html` | Temsilcilik sayfaları: hakkında, ürün grupları (Franke: videolar, Voith: iş birliği) |
| `uygulamalar.html` | 5 uygulama alanı |
| `imalatlarimiz.html` | Yetkinlikler + süreç (mevcut sitede boş olduğu için içerik taslak) |
| `iletisim.html` | İletişim kartları, teklif formu, harita |

Çalıştırmak için klasörü herhangi bir statik sunucuda yayınlamak yeterli (ör. `python3 -m http.server`).

## Tasarım dili

- **Renk:** Logo laciverti `#1C3A85` ana renk; koyu yüzeyler bu rengin derin tonları (`#0A1330`, `#060B1F`).
- **Tipografi:** Jost (logodaki geometrik, küçük harfli yazıya yakın) başlıklarda, Inter gövdede, JetBrains Mono teknik etiketlerde.
- **Motif:** Logodaki "p" gövdesi ve yanına yerleşen "teknoloji" → dikey çizgi + küçük mono etiket (`.eyebrow`), başlık altına iliştirilen etiket (`.tuck`).
- **Logo:** Orijinal PNG'den vektöre çevrildi, `currentColor` ile her zeminde boyanabiliyor (`assets/img/hpa-logo.svg`, sayfalarda inline `<symbol>`).
- **Ürün görselleri:** Render zeminleri saf siyaha çekildi; `mix-blend-mode: lighten` ile lacivert sahnelere kesilmiş gibi oturuyor.

Tüm tasarım değişkenleri `assets/css/style.css` başındaki `:root` içinde.

## Yayına almadan önce

- **İletişim formu** sunucusuz çalışıyor: kullanıcının e-posta uygulamasını hazır mesajla açıyor. Formu doğrudan gönderecekseniz `assets/js/main.js` içindeki form bölümünü bir form servisine veya kendi backend'inize bağlayın.
- **İmalatlarımız** sayfası mevcut sitede boş olduğu için metinler Uygulamalar sayfasından türetildi. Gerçek imalat fotoğrafları ve projelerle güncelleyin.
- **Ürün grubu başlıkları** (ör. "Kompakt silindirler", "İç dişli pompalar") görsellerden çıkarıldı, teknik ekibin teyit etmesi önerilir.
- Mevcut sitedeki sosyal medya ikonları boş linkti, bu yüzden kaldırıldı. Hesap adresleri varsa footer'a eklenebilir.
- İntranet bağlantısı mevcut `https://hpa.com.tr/fiyat-listesi/` giriş sayfasına gidiyor.
