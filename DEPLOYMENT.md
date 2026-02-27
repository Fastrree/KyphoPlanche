# 🚀 KyphoPlanche Deployment Rehberi

## Vercel'e Deploy Etme

### 1. Adım: GitHub'a Push

```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

### 2. Adım: Vercel'de Proje Oluştur

1. [Vercel Dashboard](https://vercel.com/dashboard)'a git
2. "Add New Project" tıkla
3. GitHub repository'ni seç (kypho-planche)
4. "Import" tıkla

### 3. Adım: Environment Variables Ekle

Vercel dashboard'da "Settings" → "Environment Variables" bölümüne git ve şunları ekle:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
SESSION_SECRET=your-super-secret-random-string-here
```

**ÖNEMLİ**: PostgreSQL database için [Neon](https://neon.tech) veya [Supabase](https://supabase.com) kullanabilirsin (ücretsiz tier var).

### 4. Adım: Deploy

1. "Deploy" butonuna tıkla
2. Build tamamlanana kadar bekle (2-3 dakika)
3. Deploy tamamlandığında link'e tıkla

### 5. Adım: Database Migration

İlk deploy'dan sonra database tablolarını oluştur:

1. Vercel dashboard'da projeye git
2. "Settings" → "Functions" → "Console" aç
3. Şu komutu çalıştır:

```bash
npm run db:push
```

## Neon Database Kurulumu (Ücretsiz)

1. [Neon.tech](https://neon.tech)'e git
2. "Sign Up" ile hesap oluştur
3. "Create Project" tıkla
4. Project adı: `kypho-planche`
5. Region: `Europe (Frankfurt)` seç
6. "Create Project" tıkla
7. Connection string'i kopyala (postgresql://...)
8. Vercel'de `DATABASE_URL` olarak ekle

## Sorun Giderme

### Problem: "Download" yapıyor, uygulama açılmıyor

**Çözüm**: `vercel.json` dosyasını kontrol et, routes doğru yapılandırılmış olmalı.

### Problem: Database bağlantı hatası

**Çözüm**: 
1. `DATABASE_URL` environment variable'ı doğru mu kontrol et
2. Neon database'in aktif olduğundan emin ol
3. `npm run db:push` komutunu çalıştır

### Problem: Build hatası

**Çözüm**:
1. Local'de `npm run build` çalıştır
2. Hataları düzelt
3. Tekrar push et

## Custom Domain Ekleme

1. Vercel dashboard'da "Settings" → "Domains"
2. Domain adını gir (örn: kyphoplanche.com)
3. DNS kayıtlarını güncelle (Vercel talimatları verecek)
4. SSL sertifikası otomatik oluşturulacak

## Monitoring

- **Logs**: Vercel dashboard → "Deployments" → "View Function Logs"
- **Analytics**: Vercel dashboard → "Analytics"
- **Performance**: Vercel dashboard → "Speed Insights"

## Güncelleme

Yeni değişiklikler için:

```bash
git add .
git commit -m "Update: açıklama"
git push origin main
```

Vercel otomatik olarak yeni deploy başlatacak.

---

**Not**: İlk deploy'da sorun yaşarsan, Vercel support'a yaz veya [Discord](https://discord.gg/vercel)'a katıl.
