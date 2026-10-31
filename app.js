(function(){
"use strict";
/* ============================== Data model ============================== */
var uid = 0;
function nextId(){ return ++uid; }

var HEADINGS = {
  id:{ summary:"Ringkasan Profil", experience:"Pengalaman Kerja", related:"Pengalaman Terkait & Proyek",
       education:"Pendidikan", certifications:"Sertifikasi", awards:"Penghargaan",
       tech:"Keahlian Teknis", soft:"Keahlian Nonteknis", languages:"Bahasa" },
  en:{ summary:"Professional Summary", experience:"Work Experience", related:"Related Experience & Projects",
       education:"Education", certifications:"Certifications", awards:"Awards",
       tech:"Technical Skills", soft:"Soft Skills", languages:"Languages" }
};
var SECTION_KEYS = ["summary","experience","related","education","certifications","awards","tech","soft","languages"];

var DESIGNS = [
  { id:"klasik", name:"Klasik ATS", desc:"Satu kolom, Arial, hitam-putih. Paling aman untuk ATS." },
  { id:"foto",   name:"Formal + Foto", desc:"Klasik dengan ruang foto 3×4 di kanan atas." },
  { id:"navy",   name:"Formal Navy", desc:"Aksen biru navy pada nama dan judul bagian." },
  { id:"serif",  name:"Formal Serif", desc:"Nama dan judul bagian serif (Georgia), isi tetap Arial." },
  { id:"ringkas",name:"Formal Ringkas", desc:"Jarak lebih rapat — muat lebih banyak di 1–2 halaman." },
  { id:"elegan", name:"Formal Elegan", desc:"Serif penuh dengan garis ganda di judul bagian." },
  { id:"modern", name:"Modern Minimal", desc:"Calibri, nama ringkas, garis tipis abu-abu." },
  { id:"hijau",  name:"Formal Hijau Tua", desc:"Aksen hijau tua seperti Formal Navy, tetap formal." },
  { id:"abu",    name:"Formal Abu", desc:"Aksen abu-abu netral, tanpa warna mencolok." },
  { id:"serifpenuh", name:"Serif Penuh", desc:"Seluruh CV serif Georgia, klasik dan rapi." },
  { id:"garistebal", name:"Formal Garis Tebal", desc:"Nama lebih besar, garis judul bagian tebal." },
  { id:"klasiktebal", name:"Klasik Tebal", desc:"Nama dan judul bagian lebih tebal, isi tetap Arial." },
  { id:"marginlebar", name:"Formal Margin Lebar", desc:"Ruang putih lebih lega di kiri-kanan kertas." },
  { id:"surat", name:"Formal Surat", desc:"Nuansa surat resmi: nama di tengah, garis tipis." },
  { id:"klasikmono", name:"Klasik Mono", desc:"Judul bagian monospace, isi tetap mudah dibaca mesin." },
  { id:"elegantipis", name:"Elegan Garis Tipis", desc:"Serif dengan garis judul bagian sangat tipis." },
  { id:"dokumen", name:"Formal Dokumen", desc:"Mirip dokumen Google Docs: serif Times, judul bagian rata tengah dengan garis di atas, perusahaan di atas jabatan, kontak dua kolom." }
];

var LOCATIONS = ["Remote","Luar Negeri",
"Jakarta Pusat","Jakarta Utara","Jakarta Barat","Jakarta Selatan","Jakarta Timur","Kepulauan Seribu",
"Bogor","Kota Bogor","Depok","Kota Bekasi","Kab. Bekasi","Kota Tangerang","Kab. Tangerang","Tangerang Selatan",
"Kota Bandung","Kab. Bandung","Bandung Barat","Cimahi","Garut","Tasikmalaya","Kota Tasikmalaya","Cianjur","Sukabumi","Kota Sukabumi","Cirebon","Kota Cirebon","Karawang","Purwakarta","Subang","Indramayu","Majalengka","Kuningan","Sumedang","Ciamis","Banjar","Pangandaran",
"Serang","Kota Serang","Cilegon","Lebak","Pandeglang",
"Kota Semarang","Kab. Semarang","Surakarta (Solo)","Kota Yogyakarta","Sleman","Bantul","Kulon Progo","Gunungkidul",
"Magelang","Kota Magelang","Kudus","Jepara","Demak","Kendal","Batang","Pekalongan","Kota Pekalongan","Pemalang","Tegal","Kota Tegal","Brebes","Cilacap","Banyumas","Purbalingga","Banjarnegara","Kebumen","Wonosobo","Temanggung","Boyolali","Klaten","Sukoharjo","Karanganyar","Sragen","Wonogiri","Blora","Rembang","Pati","Grobogan","Salatiga",
"Kota Surabaya","Sidoarjo","Gresik","Kota Malang","Kab. Malang","Batu","Kota Kediri","Kab. Kediri","Kota Madiun","Kota Mojokerto","Mojokerto","Kota Pasuruan","Pasuruan","Kota Probolinggo","Probolinggo","Jember","Banyuwangi","Bondowoso","Situbondo","Lumajang","Tulungagung","Blitar","Kota Blitar","Trenggalek","Ponorogo","Pacitan","Magetan","Ngawi","Bojonegoro","Tuban","Lamongan","Bangkalan","Sampang","Pamekasan","Sumenep","Jombang","Nganjuk",
"Denpasar","Badung","Gianyar","Tabanan","Buleleng","Karangasem","Klungkung","Bangli","Jembrana",
"Mataram","Lombok Barat","Lombok Tengah","Lombok Timur","Sumbawa","Bima","Kota Bima",
"Kupang","Kota Kupang","Belu","Timor Tengah Selatan","Ende","Sikka","Flores Timur","Manggarai",
"Banda Aceh","Sabang","Langsa","Lhokseumawe","Aceh Besar","Pidie","Bireuen","Aceh Utara","Aceh Timur",
"Medan","Binjai","Deli Serdang","Langkat","Karo","Simalungun","Asahan","Labuhanbatu","Tapanuli Utara","Toba","Samosir","Pematang Siantar","Tebing Tinggi","Tanjung Balai","Sibolga","Padang Sidempuan",
"Padang","Bukittinggi","Payakumbuh","Solok","Kota Solok","Padang Pariaman","Agam","Tanah Datar","Lima Puluh Kota","Pasaman","Pesisir Selatan","Sijunjung","Dharmasraya","Padang Panjang","Pariaman","Sawahlunto",
"Pekanbaru","Dumai","Kampar","Siak","Bengkalis","Rokan Hulu","Rokan Hilir","Pelalawan","Indragiri Hulu","Indragiri Hilir","Kuantan Singingi","Kepulauan Meranti",
"Batam","Tanjungpinang","Bintan","Karimun","Lingga","Natuna","Kepulauan Anambas",
"Jambi","Kota Jambi","Batang Hari","Muaro Jambi","Tanjung Jabung Timur","Tanjung Jabung Barat","Tebo","Bungo","Sarolangun","Merangin","Kerinci","Sungai Penuh",
"Palembang","Prabumulih","Lubuklinggau","Pagar Alam","Banyuasin","Musi Banyuasin","Ogan Komering Ilir","Ogan Komering Ulu","Muara Enim","Lahat","Musi Rawas","Ogan Ilir","Penukal Abab Lematang Ilir",
"Bengkulu","Kota Bengkulu","Rejang Lebong","Bengkulu Utara","Bengkulu Selatan","Mukomuko","Seluma","Kaur","Kepahiang","Lebong","Bengkulu Tengah",
"Bandar Lampung","Metro","Lampung Selatan","Lampung Tengah","Lampung Utara","Lampung Timur","Lampung Barat","Tanggamus","Way Kanan","Pesawaran","Pringsewu","Mesuji","Tulang Bawang","Tulang Bawang Barat","Pesisir Barat",
"Pangkal Pinang","Bangka","Bangka Barat","Bangka Tengah","Bangka Selatan","Belitung","Belitung Timur",
"Pontianak","Singkawang","Sambas","Bengkayang","Landak","Mempawah","Sanggau","Ketapang","Sintang","Kapuas Hulu","Sekadau","Melawi","Kayong Utara","Kubu Raya",
"Palangka Raya","Kotawaringin Timur","Kotawaringin Barat","Kapuas","Barito Selatan","Barito Utara","Sukamara","Lamandau","Seruyan","Katingan","Pulang Pisau","Gunung Mas","Barito Timur","Murung Raya",
"Banjarmasin","Banjarbaru","Banjar","Barito Kuala","Tapin","Hulu Sungai Selatan","Hulu Sungai Tengah","Hulu Sungai Utara","Tabalong","Tanah Laut","Kota Baru","Balangan","Tanah Bumbu",
"Samarinda","Balikpapan","Bontang","Kutai Kartanegara","Kutai Timur","Kutai Barat","Berau","Paser","Penajam Paser Utara","Mahakam Ulu","Nusantara (IKN)",
"Tarakan","Bulungan","Malinau","Nunukan","Tana Tidung",
"Manado","Bitung","Tomohon","Kotamobagu","Minahasa","Minahasa Utara","Minahasa Selatan","Bolaang Mongondow","Kepulauan Sangihe","Kepulauan Talaud",
"Gorontalo","Kota Gorontalo","Bone Bolango","Boalemo","Pohuwato","Gorontalo Utara",
"Makassar","Parepare","Palopo","Gowa","Maros","Pangkajene dan Kepulauan","Takalar","Jeneponto","Bantaeng","Bulukumba","Sinjai","Bone","Soppeng","Wajo","Sidrap","Pinrang","Enrekang","Tana Toraja","Toraja Utara","Luwu","Luwu Timur","Luwu Utara","Barru","Kepulauan Selayar",
"Kendari","Baubau","Buton","Muna","Konawe","Kolaka","Bombana","Wakatobi","Konawe Selatan","Buton Utara","Kolaka Utara","Konawe Utara","Kolaka Timur","Konawe Kepulauan","Muna Barat","Buton Tengah","Buton Selatan",
"Palu","Donggala","Sigi","Parigi Moutong","Poso","Tojo Una-Una","Tolitoli","Buol","Morowali","Morowali Utara","Banggai","Banggai Kepulauan","Banggai Laut",
"Mamuju","Polewali Mandar","Majene","Mamasa","Pasangkayu","Mamuju Tengah",
"Ambon","Kota Ambon","Tual","Maluku Tengah","Buru","Seram Bagian Barat","Seram Bagian Timur","Maluku Tenggara","Kepulauan Tanimbar","Kepulauan Aru","Maluku Barat Daya","Buru Selatan","Kepulauan Aru",
"Ternate","Tidore Kepulauan","Sofifi","Halmahera Barat","Halmahera Timur","Halmahera Utara","Halmahera Selatan","Halmahera Tengah","Kepulauan Sula","Pulau Morotai","Pulau Taliabu",
"Jayapura","Kota Jayapura","Keerom","Sarmi","Mamberamo Raya","Waropen","Kepulauan Yapen","Biak Numfor","Supiori","Jayawijaya","Mimika","Nabire","Paniai","Puncak Jaya","Puncak","Dogiyai","Intan Jaya","Deiyai","Lanny Jaya","Mamberamo Tengah","Nduga","Pegunungan Bintang","Tolikara","Yahukimo","Yalimo",
"Wamena","Timika","Merauke","Asmat","Boven Digoel","Mappi","Sorong","Kota Sorong","Manokwari","Fakfak","Kaimana","Teluk Bintuni","Teluk Wondama","Raja Ampat","Sorong Selatan","Maybrat","Tambrauw","Pegunungan Arfak","Manokwari Selatan"];

var ITEM_FIELDS = {
  experience:[
    {k:"role",label:"Jabatan / Posisi",ph:"Mis. Staff Administrasi"},
    {k:"company",label:"Perusahaan / Organisasi",ph:"Nama perusahaan"},
    {k:"location",label:"Lokasi",type:"location",ph:"Ketik lalu pilih kota/kabupaten"},
    {k:"start",label:"Mulai",type:"month"},
    {k:"end",label:"Selesai",type:"monthend"},
    {k:"bullets",label:"Tanggung jawab & hasil (satu poin per baris)",type:"textarea",ph:"Satu poin per baris.",hint:"Awali tiap poin dengan kata kerja aksi dan angka hasil, mis. “Memproses 30+ berkas per bulan, error turun 15%.”"}
  ],
  related:[
    {k:"role",label:"Peran / Judul Proyek",ph:"Mis. Ketua Divisi Acara"},
    {k:"company",label:"Organisasi / Konteks",ph:"Nama organisasi atau proyek"},
    {k:"location",label:"Lokasi",type:"location",ph:"Ketik lalu pilih kota/kabupaten"},
    {k:"start",label:"Mulai",type:"month"},
    {k:"end",label:"Selesai",type:"monthend"},
    {k:"bullets",label:"Deskripsi & hasil (satu poin per baris)",type:"textarea",ph:"Satu poin per baris.",hint:"Sebutkan hasil terukur bila ada, mis. jumlah peserta, dana, atau pengguna."}
  ],
  education:[
    {k:"school",label:"Sekolah / Universitas",ph:"Nama institusi"},
    {k:"degree",label:"Jenjang & Jurusan",ph:"Mis. S1 Hukum — IPK 3,85"},
    {k:"location",label:"Lokasi",type:"location",ph:"Ketik lalu pilih kota/kabupaten"},
    {k:"start",label:"Mulai",type:"month"},
    {k:"end",label:"Selesai",type:"monthend"},
    {k:"bullets",label:"Catatan (satu poin per baris)",type:"textarea",ph:"Kegiatan, prestasi, atau mata kuliah relevan. Boleh kosong."}
  ],
  certifications:[
    {k:"name",label:"Nama Sertifikasi",ph:"Nama sertifikat"},
    {k:"issuer",label:"Penerbit",ph:"Lembaga penerbit"},
    {k:"year",label:"Tahun",type:"year"},
    {k:"detail",label:"Detail (opsional)",ph:"Nomor kredensial atau keterangan singkat"}
  ],
  awards:[
    {k:"name",label:"Nama Penghargaan",ph:"Nama penghargaan"},
    {k:"issuer",label:"Pemberi",ph:"Institusi pemberi"},
    {k:"year",label:"Tahun",type:"year"},
    {k:"detail",label:"Detail (opsional)",ph:"Keterangan singkat"}
  ],
  tech:[ {k:"value",label:"Keahlian teknis",ph:"Mis. Microsoft Excel"} ],
  soft:[ {k:"value",label:"Keahlian nonteknis",ph:"Mis. Public speaking"} ],
  languages:[
    {k:"name",label:"Bahasa",ph:"Mis. Inggris"},
    {k:"level",label:"Tingkat / Bukti",ph:"Mis. Aktif — IELTS 7.0"}
  ]
};
var LIST_SECTIONS = ["experience","related","education","certifications","awards","tech","soft","languages"];
var MONTHS = { id:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
               en:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] };

function blankItem(key){
  var it = { id: nextId(), enabled: true, endNow: false };
  ITEM_FIELDS[key].forEach(function(f){ it[f.k] = ""; });
  return it;
}
function defaultState(){
  var s = {
    lang:"id", design:"klasik", fontPt:11, headAlign:"left", showPhoto:false, photoData:null, photoName:"",
    personal:{ name:"", role:"", email:"", phone:"", location:"", linkedin:"", website:"" },
    summaryText:"", customTitles:{},
    sectionEnabled:{}, order: SECTION_KEYS.slice(), items:{}
  };
  SECTION_KEYS.forEach(function(k){ s.sectionEnabled[k] = true; s.customTitles[k] = ""; });
  LIST_SECTIONS.forEach(function(k){ s.items[k] = [ blankItem(k) ]; });
  return s;
}
var state = defaultState();
var drafts = [ { name:"Draft 1", data: state } ];
var activeDraft = 0, draftCounter = 1;
var wizard = { on:false, step:0 };
var zoomVal = 1;
var pageEst = 1;

/* ============================== Helpers ============================== */
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function lines(text){ return String(text||"").split(/\n+/).map(function(l){ return l.replace(/^\s*[•\-\*]\s*/,"").trim(); }).filter(Boolean); }
function itemHasContent(key, it){
  return ITEM_FIELDS[key].some(function(f){ return String(it[f.k]||"").trim() !== ""; });
}
function toast(msg){
  var t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); }, 2800);
}
function svgIcon(path){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>'; }
var ICO_UP = svgIcon('<polyline points="18 15 12 9 6 15"/>');
var ICO_DOWN = svgIcon('<polyline points="6 9 12 15 18 9"/>');
var ICO_TRASH = svgIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>');
var ICO_COPY = svgIcon('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>');
var isMonthVal = function(v){ return /^\d{4}-(0[1-9]|1[0-2])$/.test(String(v||"")); };
var PHOTO_RE = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;
function safePhotoData(v){ return (typeof v==="string" && PHOTO_RE.test(v)) ? v : null; }
function fmtMonth(v){
  v = String(v||"").trim(); if(!v) return "";
  if(!isMonthVal(v)) return v;
  var p = v.split("-");
  return MONTHS[state.lang][Number(p[1])-1] + " " + p[0];
}
function dateRange(it){
  var s = fmtMonth(it.start), e = it.endNow ? (state.lang==="id" ? "Sekarang" : "Present") : fmtMonth(it.end);
  return [s,e].filter(Boolean).join(" – ");
}
function headingFor(key){
  var c = String(state.customTitles[key]||"").trim();
  return c || HEADINGS[state.lang][key];
}
function isNonStdTitle(key){
  var c = String(state.customTitles[key]||"").trim().toLowerCase();
  if(!c) return false;
  if(c === HEADINGS.id[key].toLowerCase() || c === HEADINGS.en[key].toLowerCase()) return false;
  var words = c.split(/[^a-zà-ÿ]+/).filter(function(w){ return w.length>=3; });
  var std = (HEADINGS.id[key]+" "+HEADINGS.en[key]).toLowerCase();
  return !words.some(function(w){ return std.indexOf(w)>=0; });
}
var saveTimer = null;
function markSaved(){
  var el = document.getElementById("saveState");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function(){
    var d = new Date();
    var hh = String(d.getHours()).padStart(2,"0"), mm = String(d.getMinutes()).padStart(2,"0");
    el.textContent = "Tersimpan otomatis di browser ini · " + hh + ":" + mm + " — ekspor JSON untuk cadangan lintas perangkat.";
  }, 350);
}
function yearsOptions(sel){
  var out = '<option value="">— Pilih tahun —</option>';
  for(var y=2032; y>=1980; y--){ out += '<option value="'+y+'"'+(String(sel)===String(y)?' selected':'')+'>'+y+'</option>'; }
  return out;
}

/* ============================== Form rendering ============================== */
var formRoot = document.getElementById("formRoot");
function switchHTML(checked, dataAttr, label){
  return '<label class="switch"><input type="checkbox" '+dataAttr+(checked?' checked':'')+'><span class="track"></span><span class="sr-only">'+esc(label)+'</span></label>';
}
function titleHeadHTML(key){
  var warn = isNonStdTitle(key);
  return '<input type="text" class="title-input" data-title-for="'+key+'" value="'+esc(state.customTitles[key]||"")+'" placeholder="'+esc(HEADINGS[state.lang][key])+'" aria-label="Judul bagian (bisa diubah)">'+
    switchHTML(state.sectionEnabled[key],'data-section-toggle="'+key+'"','Aktifkan bagian ini')+
    '<span class="title-warn" data-title-warn="'+key+'"'+(warn?'':' hidden')+'>Judul ini jauh dari standar ATS (“'+esc(HEADINGS.id[key])+'” / “'+esc(HEADINGS.en[key])+'”) — sebagian sistem mungkin tidak mengenalinya.</span>';
}
function personalPanel(){
  var p = state.personal;
  function f(key,label,type,ph,full,extra){
    return '<div class="field'+(full?' full':'')+'"><label for="pf-'+key+'">'+label+'</label>'+
      '<input type="'+type+'" id="pf-'+key+'" data-personal="'+key+'" value="'+esc(p[key])+'" placeholder="'+esc(ph||"")+'" autocomplete="off"'+(extra||"")+"></div>";
  }
  return '<section class="panel" data-panel="__personal" aria-label="Kontak dan identitas"><div class="panel-head"><h3>Kontak &amp; Identitas</h3></div>'+
    '<div class="panel-body"><div class="grid2">'+
    f("name","Nama lengkap","text","Nama kamu",true)+
    f("role","Posisi / bidang yang dituju (opsional)","text","Mis. Analis Hukum / Fresh Graduate",true)+
    f("email","Email","email","nama@email.com")+
    f("phone","Nomor HP","tel","08xxxxxxxxxx")+
    f("location","Kota domisili","text","Ketik lalu pilih dari daftar",false,' list="locList"')+
    f("linkedin","LinkedIn (opsional)","text","linkedin.com/in/…")+
    f("website","Website / Portofolio / GitHub (opsional)","text","https://…",true)+
    '</div></div></section>';
}
function summaryPanel(){
  var en = state.sectionEnabled.summary;
  return '<section class="panel'+(en?'':' off')+'" data-panel="summary"><div class="panel-head">'+titleHeadHTML("summary")+'</div>'+
    '<div class="panel-body"><div class="field" style="margin:0"><label for="summaryText">Isi ringkasan (2–4 kalimat)</label>'+
    '<textarea id="summaryText" data-summary="1" rows="4" placeholder="Latar belakang, keahlian utama, dan tujuan kariermu — singkat dan jujur.">'+esc(state.summaryText)+'</textarea></div></div></section>';
}
function fieldHTML(key, fd, it){
  var val = it[fd.k];
  if(fd.type==="textarea"){
    return '<div class="field full"><label>'+esc(fd.label)+'</label><textarea data-item-field="'+fd.k+'" rows="3" placeholder="'+esc(fd.ph||"")+'">'+esc(val)+'</textarea>'+(fd.hint?'<p class="hint">'+esc(fd.hint)+'</p>':'')+'</div>';
  }
  if(fd.type==="month" || fd.type==="monthend"){
    var legacy = val && !isMonthVal(val) ? '<p class="hint">Nilai lama: “'+esc(val)+'” — pilih bulan &amp; tahun untuk menggantinya.</p>' : '';
    var dis = (fd.type==="monthend" && it.endNow) ? ' disabled' : '';
    var now = fd.type==="monthend" ? '<label class="now-check"><input type="checkbox" data-item-now="1"'+(it.endNow?' checked':'')+'> Masih berjalan (Sekarang)</label>' : '';
    return '<div class="field"><label>'+esc(fd.label)+'</label><input type="month" data-item-field="'+fd.k+'" value="'+(isMonthVal(val)?esc(val):"")+'" min="1980-01" max="2035-12"'+dis+'>'+now+legacy+'</div>';
  }
  if(fd.type==="year"){
    return '<div class="field"><label>'+esc(fd.label)+'</label><select data-item-field="'+fd.k+'">'+yearsOptions(val)+'</select></div>';
  }
  if(fd.type==="location"){
    return '<div class="field"><label>'+esc(fd.label)+'</label><input type="text" data-item-field="'+fd.k+'" value="'+esc(val)+'" placeholder="'+esc(fd.ph||"")+'" autocomplete="off" list="locList"></div>';
  }
  return '<div class="field"><label>'+esc(fd.label)+'</label><input type="text" data-item-field="'+fd.k+'" value="'+esc(val)+'" placeholder="'+esc(fd.ph||"")+'" autocomplete="off"></div>';
}
function itemHTML(key, it, idx, total){
  var fields = ITEM_FIELDS[key].map(function(fd){ return fieldHTML(key, fd, it); }).join("");
  var titleVal = it.role || it.school || it.name || it.value || "";
  var title = titleVal ? titleVal : ("Item " + (idx+1));
  return '<div class="item'+(it.enabled?'':' off')+'" data-item-id="'+it.id+'">'+
    '<div class="item-head">'+ switchHTML(it.enabled,'data-item-toggle="1"','Aktifkan item ini')+
    '<span class="item-title">'+esc(title)+'</span>'+
    '<button type="button" class="icon-btn" data-item-up="1" aria-label="Geser item ke atas" '+(idx===0?'disabled':'')+'>'+ICO_UP+'</button>'+
    '<button type="button" class="icon-btn" data-item-down="1" aria-label="Geser item ke bawah" '+(idx===total-1?'disabled':'')+'>'+ICO_DOWN+'</button>'+
    '<button type="button" class="icon-btn" data-item-dup="1" aria-label="Duplikat item">'+ICO_COPY+'</button>'+
    '<button type="button" class="icon-btn" data-item-del="1" aria-label="Hapus item">'+ICO_TRASH+'</button></div>'+
    '<div class="grid2">'+fields+'</div>'+
    ((key==="experience" || key==="related") ? '<button type="button" class="suggest-btn" data-suggest-bullets="1">Saran poin awal</button>' : '')+'</div>';
}
function listPanel(key){
  var en = state.sectionEnabled[key];
  var items = state.items[key];
  var body = items.map(function(it,i){ return itemHTML(key,it,i,items.length); }).join("");
  return '<section class="panel'+(en?'':' off')+'" data-panel="'+key+'"><div class="panel-head">'+titleHeadHTML(key)+'</div>'+
    '<div class="panel-body" data-items="'+key+'">'+body+
    '<button type="button" class="add-btn" data-add="'+key+'">+ Tambah item</button></div></section>';
}
function renderForm(){
  var html = personalPanel();
  state.order.forEach(function(k){
    html += (k==="summary") ? summaryPanel() : listPanel(k);
  });
  formRoot.innerHTML = html;
  renderOrderList();
  applyWizard();
  renderPreview();
}
function renderOrderList(){
  var ul = document.getElementById("orderList");
  ul.innerHTML = state.order.map(function(k,i){
    return '<li><span class="nm">'+esc(headingFor(k))+'</span>'+
      switchHTML(state.sectionEnabled[k],'data-order-toggle="'+k+'"','Tampilkan bagian ini')+
      '<button type="button" class="icon-btn" data-order-up="'+k+'" aria-label="Geser bagian ke atas" '+(i===0?'disabled':'')+'>'+ICO_UP+'</button>'+
      '<button type="button" class="icon-btn" data-order-down="'+k+'" aria-label="Geser bagian ke bawah" '+(i===state.order.length-1?'disabled':'')+'>'+ICO_DOWN+'</button></li>';
  }).join("");
}

/* ============================== Wizard ============================== */
function wizardSteps(){
  var steps = [{key:"__personal", label:"Kontak & Identitas"}];
  state.order.forEach(function(k){ steps.push({key:k, label:headingFor(k)}); });
  steps.push({key:"__finish", label:"Selesai & Unduh"});
  return steps;
}
function applyWizard(){
  var steps = wizardSteps();
  if(wizard.step > steps.length-1) wizard.step = steps.length-1;
  if(wizard.step < 0) wizard.step = 0;
  document.body.classList.toggle("wizard-on", wizard.on);
  var finish = document.getElementById("finishPanel");
  if(!wizard.on){
    formRoot.querySelectorAll("[data-panel]").forEach(function(p){ p.hidden = false; });
    finish.hidden = true;
    return;
  }
  var cur = steps[wizard.step].key;
  formRoot.querySelectorAll("[data-panel]").forEach(function(p){ p.hidden = p.getAttribute("data-panel") !== cur; });
  finish.hidden = cur !== "__finish";
  if(cur !== "__finish" && cur !== "__personal" && !state.sectionEnabled[cur]){
    state.sectionEnabled[cur] = true;
    var tgl = formRoot.querySelector('[data-section-toggle="'+cur+'"]');
    if(tgl) tgl.checked = true;
    var panel = formRoot.querySelector('[data-panel="'+cur+'"]');
    if(panel) panel.classList.remove("off");
  }
  document.getElementById("wizardStepMeta").textContent = "Langkah " + (wizard.step+1) + " dari " + steps.length;
  document.getElementById("wizardStepName").textContent = steps[wizard.step].label;
  document.getElementById("wizPrev").disabled = wizard.step === 0;
  document.getElementById("wizNext").textContent = wizard.step === steps.length-1 ? "Selesai ✓" : "Berikutnya →";
}

/* ============================== Preview ============================== */
function contactLine(){
  var p = state.personal;
  return [p.email,p.phone,p.location,p.linkedin,p.website].map(function(v){return String(v||"").trim();}).filter(Boolean).join("  •  ");
}
function contactDokumenHTML(){
  // Kontak dua kolom ala contoh dokumen: kiri LinkedIn + domisili, kanan Email + Mobile.
  // Hanya pakai field yang sudah ada di Berkas (linkedin, location, email, phone, website);
  // kalau field kosong, barisnya dihilangkan, bukan diisi data contoh.
  var p = state.personal;
  var li = String(p.linkedin || "").trim(), loc = String(p.location || "").trim();
  var em = String(p.email || "").trim(), ph = String(p.phone || "").trim(), ws = String(p.website || "").trim();
  if(!li && !loc && !em && !ph && !ws) return "";
  function linkHref(v){ return /^https?:\/\//i.test(v) ? v : "https://" + v; }
  var left = "";
  if(li) left += '<div class="cv-contact-line"><a href="' + esc(linkHref(li)) + '" target="_blank" rel="noopener">' + esc(li) + '</a></div>';
  if(loc) left += '<div class="cv-contact-line">Domicile : ' + esc(loc) + '</div>';
  if(ws) left += '<div class="cv-contact-line">' + esc(ws) + '</div>';
  var right = "";
  if(em) right += '<div class="cv-contact-line">Email&nbsp;&nbsp;&nbsp;: <a href="mailto:' + esc(em) + '">' + esc(em) + '</a></div>';
  if(ph) right += '<div class="cv-contact-line">Mobile&nbsp;: ' + esc(ph) + '</div>';
  if(!left && !right) return "";
  return '<div class="cv-contact-grid"><div>' + left + '</div><div>' + right + '</div></div>';
}
function sectionContentHTML(key){
  var H = headingFor(key);
  if(key==="summary"){
    var t = state.summaryText.trim();
    return t ? '<h4 class="cv-sec">'+esc(H)+'</h4><p>'+esc(t)+'</p>' : "";
  }
  var items = state.items[key].filter(function(it){ return it.enabled && itemHasContent(key,it); });
  if(!items.length) return "";
  var out = '<h4 class="cv-sec">'+esc(H)+'</h4>';
  if(key==="tech" || key==="soft"){
    out += '<p>'+items.map(function(it){ return esc(it.value.trim()); }).filter(Boolean).join("  •  ")+'</p>';
    return out;
  }
  if(key==="languages"){
    out += '<p>'+items.map(function(it){
      return esc(it.name.trim()) + (it.level.trim() ? " — "+esc(it.level.trim()) : "");
    }).join("  •  ")+'</p>';
    return out;
  }
  items.forEach(function(it){
    if(key==="experience" || key==="related"){
      var bl = lines(it.bullets);
      out += '<div class="cv-item cv-exp"><div class="cv-line1"><span class="cv-strong">'+esc(it.role.trim())+'</span>'+
        '<span class="cv-dates">'+esc(dateRange(it))+'</span></div>'+
        '<div class="cv-sub">'+esc([it.company.trim(),it.location.trim()].filter(Boolean).join(", "))+'</div>'+
        (bl.length ? '<ul>'+bl.map(function(b){ return '<li>'+esc(b)+'</li>'; }).join("")+'</ul>' : '')+'</div>';
    } else if(key==="education"){
      var bl2 = lines(it.bullets);
      out += '<div class="cv-item"><div class="cv-line1"><span class="cv-strong">'+esc(it.school.trim())+'</span>'+
        '<span class="cv-dates">'+esc(dateRange(it))+'</span></div>'+
        '<div class="cv-sub">'+esc([it.degree.trim(),it.location.trim()].filter(Boolean).join(", "))+'</div>'+
        (bl2.length ? '<ul>'+bl2.map(function(b){ return '<li>'+esc(b)+'</li>'; }).join("")+'</ul>' : '')+'</div>';
    } else {
      var main = it.name.trim();
      var meta = [it.issuer.trim(), it.year.trim()].filter(Boolean).join(", ");
      out += '<div class="cv-item"><span class="cv-strong">'+esc(main)+'</span>'+(meta ? ' — '+esc(meta) : '')+
        (it.detail.trim() ? '<div class="cv-sub">'+esc(it.detail.trim())+'</div>' : '')+'</div>';
    }
  });
  return out;
}
function renderPreview(){
  var paper = document.getElementById("paper");
  paper.className = "paper design-" + state.design + " fs-" + state.fontPt + " head-" + (state.headAlign || "left");
  paper.style.zoom = zoomVal;
  var p = state.personal;
  var photoHTML = "";
  if(state.showPhoto){
    var pd = safePhotoData(state.photoData);
    photoHTML = pd
      ? '<img class="cv-photo" src="'+esc(pd)+'" alt="Foto profil">'
      : '<div class="cv-photo-empty">Foto 3×4<br>(belum dipilih)</div>';
  }
  var head = '<div class="cv-head"><div class="cv-head-text">'+
    (p.name.trim() ? '<p class="cv-name">'+esc(p.name.trim())+'</p>' : '<p class="cv-name cv-empty">Nama Lengkap</p>')+
    (p.role.trim() ? '<p class="cv-role">'+esc(p.role.trim())+'</p>' : '')+
    (state.design==="dokumen" ? (contactDokumenHTML() || '<p class="cv-contact cv-empty">email • nomor HP • kota domisili</p>')
      : (contactLine() ? '<p class="cv-contact">'+esc(contactLine())+'</p>' : '<p class="cv-contact cv-empty">email • nomor HP • kota domisili</p>'))+
    '</div>'+photoHTML+'</div>';
  var body = "";
  state.order.forEach(function(k){
    if(state.sectionEnabled[k]) body += sectionContentHTML(k);
  });
  if(!body){
    body = '<p class="cv-empty" style="margin-top:22px">Pratinjau terisi saat kamu mulai mengetik. Bagian kosong atau nonaktif tidak ikut tercetak.</p>';
  }
  paper.innerHTML = head + body;
  requestAnimationFrame(function(){
    var w = paper.clientWidth || 794;
    var h = paper.scrollHeight / (zoomVal || 1);
    pageEst = Math.max(1, Math.ceil(h / (w * 297/210) - 0.02));
    updateStats();
  });
  updateStats();
}

/* ============================== Stats: kelengkapan + cek ATS ============================== */
function completeness(){
  var p = state.personal;
  var checks = [
    ["Nama", !!p.name.trim()], ["Email", !!p.email.trim()], ["Nomor HP", !!p.phone.trim()],
    ["Lokasi", !!p.location.trim()], ["Ringkasan profil", !!state.summaryText.trim()],
    ["Pengalaman kerja", state.items.experience.some(function(it){ return itemHasContent("experience", it); })],
    ["Pendidikan", state.items.education.some(function(it){ return itemHasContent("education", it); })],
    ["Keahlian teknis", state.items.tech.some(function(it){ return itemHasContent("tech", it); })]
  ];
  var done = checks.filter(function(c){ return c[1]; }).length;
  return { checks:checks, pct: Math.round(done/checks.length*100),
           missing: checks.filter(function(c){ return !c[1]; }).map(function(c){ return c[0]; }) };
}
function atsChecks(){
  var p = state.personal, out = [];
  out.push({ ok: !!p.name.trim(), text: p.name.trim() ? "Nama terisi." : "Nama belum diisi." });
  var emailOk = /.+@.+\..+/.test(p.email.trim());
  out.push({ ok: emailOk, text: emailOk ? "Format email valid." : "Email kosong atau formatnya belum valid." });
  var hasExp = state.items.experience.some(function(it){ return it.enabled && itemHasContent("experience", it); });
  out.push({ ok: hasExp, text: hasExp ? "Ada pengalaman kerja aktif." : "Belum ada pengalaman kerja yang aktif dan terisi." });
  var hasEdu = state.items.education.some(function(it){ return it.enabled && itemHasContent("education", it); });
  out.push({ ok: hasEdu, text: hasEdu ? "Ada pendidikan aktif." : "Belum ada pendidikan yang aktif dan terisi." });
  var badDate = false;
  ["experience","related","education"].forEach(function(k){
    state.items[k].forEach(function(it){
      if(isMonthVal(it.start) && isMonthVal(it.end) && !it.endNow && it.start > it.end) badDate = true;
    });
  });
  out.push({ ok: !badDate, text: badDate ? "Ada tanggal selesai yang lebih awal dari tanggal mulai — periksa lagi." : "Urutan tanggal mulai–selesai konsisten." });
  out.push({ ok: !state.showPhoto, text: state.showPhoto ? "Foto aktif — sebagian ATS tidak memproses foto; matikan untuk lamaran via sistem ATS." : "Tanpa foto — aman untuk ATS." });
  var nonStd = SECTION_KEYS.filter(function(k){ return isNonStdTitle(k); });
  out.push({ ok: nonStd.length===0, text: nonStd.length ? "Judul bagian tidak standar: " + nonStd.map(function(k){ return headingFor(k); }).join(", ") + "." : "Semua judul bagian standar ATS." });
  out.push({ ok: pageEst<=2, text: "Perkiraan panjang " + pageEst + " halaman" + (pageEst<=2 ? " — ideal untuk CV (1–2 halaman)." : " — lebih dari 2 halaman, pertimbangkan desain Ringkas atau font 10pt.") });
  return out;
}
function updateStats(){
  var c = completeness();
  var fill = document.getElementById("completeFill");
  if(fill){
    fill.style.width = c.pct + "%";
    document.getElementById("completeBar").setAttribute("aria-valuenow", c.pct);
    document.getElementById("completePct").textContent = c.pct + "% lengkap";
    document.getElementById("completeMiss").textContent = c.missing.length ? "Kurang: " + c.missing.join(", ") : "Semua bagian inti terisi.";
  }
  var ats = document.getElementById("atsList");
  if(ats){
    ats.innerHTML = atsChecks().map(function(ch){
      return '<li><span class="mark '+(ch.ok?'ok':'warn')+'">'+(ch.ok?'✓':'!')+'</span><span>'+esc(ch.text)+'</span></li>';
    }).join("");
  }
  var meta = document.getElementById("previewMeta");
  if(meta){
    var d = DESIGNS.filter(function(x){ return x.id===state.design; })[0];
    meta.textContent = d.name + " · ±" + pageEst + " halaman";
  }
}

/* ============================== Plain text (salin + kata kunci + DOCX) ============================== */
function buildPlainText(){
  var p = state.personal, out = [];
  out.push((p.name.trim() || "Nama Lengkap").toUpperCase());
  if(p.role.trim()) out.push(p.role.trim());
  if(contactLine()) out.push(contactLine());
  state.order.forEach(function(key){
    if(!state.sectionEnabled[key]) return;
    if(key==="summary"){
      if(state.summaryText.trim()){ out.push("", headingFor(key).toUpperCase(), state.summaryText.trim()); }
      return;
    }
    var items = state.items[key].filter(function(it){ return it.enabled && itemHasContent(key,it); });
    if(!items.length) return;
    out.push("", headingFor(key).toUpperCase());
    if(key==="tech" || key==="soft"){
      out.push(items.map(function(it){ return it.value.trim(); }).filter(Boolean).join(" • "));
      return;
    }
    if(key==="languages"){
      out.push(items.map(function(it){ return it.name.trim() + (it.level.trim() ? " — " + it.level.trim() : ""); }).join(" • "));
      return;
    }
    items.forEach(function(it){
      if(key==="experience" || key==="related"){
        out.push(it.role.trim() + (dateRange(it) ? "  (" + dateRange(it) + ")" : ""));
        var sub = [it.company.trim(), it.location.trim()].filter(Boolean).join(", ");
        if(sub) out.push(sub);
        lines(it.bullets).forEach(function(b){ out.push("• " + b); });
      } else if(key==="education"){
        out.push(it.school.trim() + (dateRange(it) ? "  (" + dateRange(it) + ")" : ""));
        var sub2 = [it.degree.trim(), it.location.trim()].filter(Boolean).join(", ");
        if(sub2) out.push(sub2);
        lines(it.bullets).forEach(function(b){ out.push("• " + b); });
      } else {
        var meta = [it.issuer.trim(), it.year.trim()].filter(Boolean).join(", ");
        out.push(it.name.trim() + (meta ? " — " + meta : ""));
        if(it.detail.trim()) out.push(it.detail.trim());
      }
      out.push("");
    });
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/* ============================== Design / bahasa / font / tema ============================== */
function renderDesigns(){
  var el = document.getElementById("designList");
  el.innerHTML = DESIGNS.map(function(d){
    return '<button type="button" class="design-card" role="radio" data-design="'+d.id+'" aria-checked="'+(state.design===d.id)+'">'+
      '<span class="dmini"><i class="dmini-name"></i><i></i><i></i><i class="short"></i></span>'+
      '<span class="dname">'+esc(d.name)+'</span><span class="ddesc">'+esc(d.desc)+'</span></button>';
  }).join("");
}
function syncLangSeg(){
  document.getElementById("langId").setAttribute("aria-pressed", state.lang==="id" ? "true":"false");
  document.getElementById("langEn").setAttribute("aria-pressed", state.lang==="en" ? "true":"false");
}
function syncFontSeg(){
  document.querySelectorAll("[data-fontpt]").forEach(function(b){
    b.setAttribute("aria-pressed", Number(b.getAttribute("data-fontpt"))===state.fontPt ? "true":"false");
  });
}
function themeLabel(){
  var dark = document.documentElement.getAttribute("data-theme")==="dark";
  document.getElementById("btnTheme").innerHTML =
    svgIcon(dark ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
                 : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>') +
    (dark ? "Mode Terang" : "Mode Gelap");
}
document.getElementById("btnTheme").addEventListener("click", function(){
  var cur = document.documentElement.getAttribute("data-theme")==="dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", cur);
  themeLabel();
});
document.getElementById("designList").addEventListener("click", function(e){
  var btn = e.target.closest("[data-design]"); if(!btn) return;
  state.design = btn.getAttribute("data-design");
  renderDesigns(); renderPreview(); markSaved();
});
function setLang(lang){
  if(state.lang === lang){ syncLangSeg(); return; }
  state.lang = lang; syncLangSeg(); renderForm(); markSaved();
}
document.getElementById("langId").addEventListener("click", function(){ setLang("id"); });
document.getElementById("langEn").addEventListener("click", function(){ setLang("en"); });
document.querySelectorAll("[data-fontpt]").forEach(function(b){
  b.addEventListener("click", function(){
    state.fontPt = Number(b.getAttribute("data-fontpt"));
    syncFontSeg(); renderPreview(); markSaved();
  });
});
document.querySelectorAll("[data-zoom]").forEach(function(b){
  b.addEventListener("click", function(){
    zoomVal = Number(b.getAttribute("data-zoom"));
    document.querySelectorAll("[data-zoom]").forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true":"false"); });
    renderPreview();
  });
});
document.getElementById("photoToggle").addEventListener("change", function(e){
  state.showPhoto = e.target.checked; renderPreview(); markSaved();
});
document.getElementById("btnPhoto").addEventListener("click", function(){ document.getElementById("filePhoto").click(); });
document.getElementById("filePhoto").addEventListener("change", function(e){
  var file = e.target.files[0]; if(!file) return;
  if(file.size > 2.5*1024*1024){ toast("Foto terlalu besar (maks 2,5 MB)."); return; }
  var r = new FileReader();
  r.onload = function(){
    var pd = safePhotoData(r.result);
    if(!pd){ toast("File foto tidak valid."); return; }
    state.photoData = pd; state.photoName = file.name;
    document.getElementById("photoName").textContent = file.name;
    if(!state.showPhoto){ state.showPhoto = true; document.getElementById("photoToggle").checked = true; }
    renderPreview(); markSaved(); toast("Foto ditambahkan ke pratinjau.");
  };
  r.readAsDataURL(file);
  e.target.value = "";
});

/* ============================== Draf ============================== */
function renderDrafts(){
  var sel = document.getElementById("draftSel");
  sel.innerHTML = drafts.map(function(d,i){ return '<option value="'+i+'"'+(i===activeDraft?' selected':'')+'>'+esc(d.name)+'</option>'; }).join("");
  document.getElementById("draftName").value = drafts[activeDraft].name;
  document.getElementById("btnDelDraft").disabled = drafts.length<=1;
}
document.getElementById("draftSel").addEventListener("change", function(e){
  activeDraft = Number(e.target.value);
  state = drafts[activeDraft].data;
  syncAllUI();
  toast("Beralih ke " + drafts[activeDraft].name + ".");
});
document.getElementById("draftName").addEventListener("input", function(e){
  drafts[activeDraft].name = e.target.value || ("Draft " + (activeDraft+1));
  var sel = document.getElementById("draftSel");
  sel.options[activeDraft].textContent = drafts[activeDraft].name;
});
document.getElementById("btnDupDraft").addEventListener("click", function(){
  draftCounter++;
  var copy = JSON.parse(JSON.stringify(state));
  /* id item harus unik antar draf tidak masalah, tapi segarkan agar tidak bentrok saat impor */
  drafts.splice(activeDraft+1, 0, { name:"Draft " + draftCounter, data: copy });
  activeDraft++;
  state = drafts[activeDraft].data;
  syncAllUI();
  toast("Draf diduplikat sebagai " + drafts[activeDraft].name + ".");
});
document.getElementById("btnDelDraft").addEventListener("click", function(){
  if(drafts.length<=1) return;
  var nm = drafts[activeDraft].name;
  drafts.splice(activeDraft,1);
  if(activeDraft > drafts.length-1) activeDraft = drafts.length-1;
  state = drafts[activeDraft].data;
  syncAllUI();
  toast("Draf “" + nm + "” dihapus.");
});
function syncAllUI(){
  document.getElementById("photoToggle").checked = state.showPhoto;
  document.getElementById("photoName").textContent = state.photoName || "Belum ada foto";
  syncLangSeg(); syncFontSeg(); syncAlignSeg(); renderDesigns(); renderDrafts(); renderForm();
}

/* ============================== Wizard events ============================== */
document.getElementById("btnWizard").addEventListener("click", function(){
  wizard.on = !wizard.on;
  if(wizard.on) wizard.step = 0;
  this.setAttribute("aria-pressed", wizard.on ? "true":"false");
  applyWizard(); renderOrderList(); renderPreview();
  window.scrollTo({ top:0, behavior:"smooth" });
});
document.getElementById("wizPrev").addEventListener("click", function(){
  if(wizard.step>0){ wizard.step--; applyWizard(); window.scrollTo({top:0,behavior:"smooth"}); }
});
document.getElementById("wizNext").addEventListener("click", function(){
  var steps = wizardSteps();
  if(wizard.step >= steps.length-1){
    wizard.on = false;
    document.getElementById("btnWizard").setAttribute("aria-pressed","false");
    applyWizard(); renderOrderList(); renderPreview();
    toast("Wizard selesai. Periksa pratinjau lalu unduh PDF-nya.");
  } else { wizard.step++; applyWizard(); window.scrollTo({top:0,behavior:"smooth"}); }
});

/* ============================== Form events ============================== */
function findItem(panel, wrap){
  var key = panel.getAttribute("data-panel");
  var id = Number(wrap.getAttribute("data-item-id"));
  var it = state.items[key].filter(function(x){ return x.id===id; })[0];
  return { key:key, item:it };
}
formRoot.addEventListener("input", function(e){
  var t = e.target;
  if(t.hasAttribute("data-personal")){ state.personal[t.getAttribute("data-personal")] = t.value; renderPreview(); markSaved(); return; }
  if(t.hasAttribute("data-summary")){ state.summaryText = t.value; renderPreview(); markSaved(); return; }
  if(t.hasAttribute("data-title-for")){
    var key = t.getAttribute("data-title-for");
    state.customTitles[key] = t.value;
    var warn = document.querySelector('[data-title-warn="'+key+'"]');
    if(warn) warn.hidden = !isNonStdTitle(key);
    renderOrderList(); renderPreview(); markSaved(); return;
  }
  if(t.hasAttribute("data-item-field")){
    var wrap = t.closest("[data-item-id]"); var panel = t.closest("[data-panel]");
    if(!wrap || !panel) return;
    var f = findItem(panel, wrap);
    if(f.item){ f.item[t.getAttribute("data-item-field")] = t.value; renderPreview(); markSaved(); }
  }
});
formRoot.addEventListener("change", function(e){
  var t = e.target;
  if(t.hasAttribute("data-section-toggle")){
    state.sectionEnabled[t.getAttribute("data-section-toggle")] = t.checked;
    renderForm(); markSaved(); return;
  }
  if(t.hasAttribute("data-item-toggle")){
    var wrap = t.closest("[data-item-id]"); var panel = t.closest("[data-panel]");
    if(!wrap || !panel) return;
    var f = findItem(panel, wrap);
    if(f.item){ f.item.enabled = t.checked; wrap.classList.toggle("off", !t.checked); renderPreview(); markSaved(); }
    return;
  }
  if(t.hasAttribute("data-item-now")){
    var wrap2 = t.closest("[data-item-id]"); var panel2 = t.closest("[data-panel]");
    if(!wrap2 || !panel2) return;
    var f2 = findItem(panel2, wrap2);
    if(f2.item){
      f2.item.endNow = t.checked;
      var endInput = wrap2.querySelector('[data-item-field="end"]');
      if(endInput) endInput.disabled = t.checked;
      renderPreview(); markSaved();
    }
    return;
  }
  if(t.hasAttribute("data-item-field") && t.tagName==="SELECT"){
    var wrap3 = t.closest("[data-item-id]"); var panel3 = t.closest("[data-panel]");
    if(!wrap3 || !panel3) return;
    var f3 = findItem(panel3, wrap3);
    if(f3.item){ f3.item[t.getAttribute("data-item-field")] = t.value; renderPreview(); markSaved(); }
  }
});
formRoot.addEventListener("click", function(e){
  var add = e.target.closest("[data-add]");
  if(add){ state.items[add.getAttribute("data-add")].push(blankItem(add.getAttribute("data-add"))); renderForm(); markSaved(); return; }
  var sug = e.target.closest("[data-suggest-bullets]");
  if(sug){
    var swrap = sug.closest("[data-item-id]"); var spanel = sug.closest("[data-panel]");
    if(swrap && spanel){
      var skey = spanel.getAttribute("data-panel"); var sid = Number(swrap.getAttribute("data-item-id"));
      var sarr = state.items[skey]; var sidx = -1; sarr.forEach(function(x,i){ if(x.id===sid) sidx=i; });
      if(sidx >= 0){
        var sitem = sarr[sidx];
        var org = (sitem.company || "").trim();
        var starters = [
          "Mengelola tugas harian" + (org ? " di " + org : "") + " sesuai target dan tenggat yang disepakati.",
          "Memproses dan memeriksa data sebelum diserahkan agar akurat dan lengkap.",
          "Berkolaborasi dengan tim untuk meningkatkan efisiensi proses kerja."
        ];
        sitem.bullets = (sitem.bullets || "").trim() ? sitem.bullets.trim() + "\n" + starters.join("\n") : starters.join("\n");
        renderForm(); markSaved();
        toast("3 poin awal ditambahkan — edit angka dan hasilnya agar spesifik.");
      }
    }
    return;
  }
  var del = e.target.closest("[data-item-del]");
  var dup = e.target.closest("[data-item-dup]");
  var up = e.target.closest("[data-item-up]");
  var down = e.target.closest("[data-item-down]");
  var btn = del || dup || up || down;
  if(btn){
    var wrap = btn.closest("[data-item-id]"); var panel = btn.closest("[data-panel]");
    if(!wrap || !panel) return;
    var key = panel.getAttribute("data-panel");
    var id = Number(wrap.getAttribute("data-item-id"));
    var arr = state.items[key];
    var idx = -1; arr.forEach(function(x,i){ if(x.id===id) idx=i; });
    if(idx<0) return;
    if(del){ arr.splice(idx,1); if(!arr.length) arr.push(blankItem(key)); }
    if(dup){
      var cp = JSON.parse(JSON.stringify(arr[idx])); cp.id = nextId();
      arr.splice(idx+1, 0, cp);
      toast("Item diduplikat.");
    }
    if(up && idx>0){ var tmp=arr[idx-1]; arr[idx-1]=arr[idx]; arr[idx]=tmp; }
    if(down && idx<arr.length-1){ var tmp2=arr[idx+1]; arr[idx+1]=arr[idx]; arr[idx]=tmp2; }
    renderForm(); markSaved();
  }
});
document.getElementById("orderList").addEventListener("change", function(e){
  var t = e.target;
  if(t.hasAttribute("data-order-toggle")){
    state.sectionEnabled[t.getAttribute("data-order-toggle")] = t.checked;
    renderForm(); markSaved();
  }
});
document.getElementById("orderList").addEventListener("click", function(e){
  var up = e.target.closest("[data-order-up]"); var down = e.target.closest("[data-order-down]");
  var btn = up || down; if(!btn) return;
  var key = btn.getAttribute("data-order-up") || btn.getAttribute("data-order-down");
  var idx = state.order.indexOf(key); if(idx<0) return;
  if(up && idx>0){ var a=state.order[idx-1]; state.order[idx-1]=state.order[idx]; state.order[idx]=a; }
  if(down && idx<state.order.length-1){ var b=state.order[idx+1]; state.order[idx+1]=state.order[idx]; state.order[idx]=b; }
  renderForm(); markSaved();
});

/* mobile tabs */
function setTab(tab){
  document.body.setAttribute("data-tab", tab);
  document.getElementById("tabForm").setAttribute("aria-pressed", tab==="form"?"true":"false");
  document.getElementById("tabPreview").setAttribute("aria-pressed", tab==="preview"?"true":"false");
  if(tab==="preview") window.scrollTo({top:0});
}
document.getElementById("tabForm").addEventListener("click", function(){ setTab("form"); });
document.getElementById("tabPreview").addEventListener("click", function(){ setTab("preview"); });

/* ============================== Kata kunci lowongan ============================== */
var STOP = ("yang dan di ke dari untuk dengan pada adalah ini itu atau dalam sebagai juga akan tidak ada saya kami anda mereka dia dapat lebih telah tahun kerja pengalaman kemampuan memiliki termasuk mampu bekerja tim secara baik sangat perusahaan posisi bidang menggunakan menguasai bahasa inggris indonesia minimal lulusan pendidikan jurusan usia bersedia ditempatkan memiliki pengalaman di bidang terkait the and of to in for with on a an is are will be as at by or we you our their this that from have has job work experience years team skills ability able requirements required preferred bachelor's degree company position responsibilities qualifications").split(" ");
document.getElementById("btnKw").addEventListener("click", function(){
  var jd = document.getElementById("jdText").value.trim();
  var box = document.getElementById("kwResult");
  if(!jd){ box.innerHTML = '<p class="kw-summary">Tempel dulu deskripsi lowongannya.</p>'; return; }
  var freq = {};
  jd.toLowerCase().replace(/[^a-zà-ÿ0-9+#.\s-]/g," ").split(/\s+/).forEach(function(w){
    w = w.replace(/^[.-]+|[.-]+$/g,"");
    if(w.length<3 || STOP.indexOf(w)>=0 || /^\d+$/.test(w)) return;
    freq[w] = (freq[w]||0)+1;
  });
  var words = Object.keys(freq).sort(function(a,b){ return freq[b]-freq[a]; }).slice(0,30);
  if(!words.length){ box.innerHTML = '<p class="kw-summary">Tidak ada kata kunci yang terbaca dari teks itu.</p>'; return; }
  var cv = buildPlainText().toLowerCase();
  var found = words.filter(function(w){ return cv.indexOf(w)>=0; });
  var miss = words.filter(function(w){ return cv.indexOf(w)<0; });
  box.innerHTML = '<p class="kw-summary">'+found.length+' dari '+words.length+' kata kunci utama lowongan sudah ada di CV-mu.</p>'+
    '<div class="chips">'+
    found.map(function(w){ return '<span class="chip found">✓ '+esc(w)+'</span>'; }).join("")+
    miss.map(function(w){ return '<span class="chip miss">'+esc(w)+'</span>'; }).join("")+
    '</div>'+
    (miss.length ? '<p class="hint" style="margin-top:8px">Yang belum ada: tambahkan hanya jika memang sesuai pengalamanmu — jangan mengarang.</p><div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">' +
    miss.slice(0, 8).map(function(w){ return '<button type="button" class="btn small" data-kw-add="'+esc(w)+'">+ '+esc(w)+'</button>'; }).join("") + '</div>' : '');
});

/* ============================== Berkas: JSON / teks / DOCX ============================== */
function downloadBlob(blob, filename){
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
}
function fileBase(){
  return (state.personal.name.trim() || "CV").replace(/[^\w\- ]+/g,"").trim().replace(/\s+/g,"_");
}
document.getElementById("btnExport").addEventListener("click", function(){
  var data = JSON.parse(JSON.stringify(state));
  delete data.photoData;
  downloadBlob(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}), fileBase() + "_data.json");
  dirtySinceExport = false;
  toast("JSON diekspor — simpan sebagai cadangan.");
});
document.getElementById("btnImport").addEventListener("click", function(){ document.getElementById("fileImport").click(); });
document.getElementById("fileImport").addEventListener("change", function(e){
  var file = e.target.files[0]; if(!file) return;
  var r = new FileReader();
  r.onload = function(){
    try{
      var data = JSON.parse(r.result);
      if(!data || typeof data!=="object" || !data.personal || !data.items) throw new Error("format");
      var fresh = defaultState();
      fresh.lang = data.lang==="en" ? "en":"id";
      fresh.design = DESIGNS.some(function(d){return d.id===data.design;}) ? data.design : "klasik";
      fresh.fontPt = [10,11,12].indexOf(Number(data.fontPt))>=0 ? Number(data.fontPt) : 11;
      fresh.headAlign = ["left","center","right"].indexOf(data.headAlign)>=0 ? data.headAlign : "left";
      fresh.showPhoto = !!data.showPhoto;
      fresh.photoData = safePhotoData(data.photoData);
      fresh.photoName = fresh.photoData ? String(data.photoName||"Foto impor") : "";
      Object.keys(fresh.personal).forEach(function(k){ fresh.personal[k] = String(data.personal[k]||""); });
      fresh.summaryText = String(data.summaryText||"");
      if(data.customTitles) SECTION_KEYS.forEach(function(k){ fresh.customTitles[k] = String(data.customTitles[k]||""); });
      if(Array.isArray(data.order) && data.order.length){
        var ord = data.order.filter(function(k){ return SECTION_KEYS.indexOf(k)>=0; });
        SECTION_KEYS.forEach(function(k){ if(ord.indexOf(k)<0) ord.push(k); });
        fresh.order = ord;
      }
      SECTION_KEYS.forEach(function(k){ if(data.sectionEnabled && typeof data.sectionEnabled[k]==="boolean") fresh.sectionEnabled[k]=data.sectionEnabled[k]; });
      LIST_SECTIONS.forEach(function(k){
        if(Array.isArray(data.items[k]) && data.items[k].length){
          fresh.items[k] = data.items[k].map(function(raw){
            var it = blankItem(k); it.enabled = raw.enabled!==false; it.endNow = !!raw.endNow;
            ITEM_FIELDS[k].forEach(function(f){ it[f.k] = String(raw[f.k]||""); });
            return it;
          });
        }
      });
      state = fresh;
      drafts[activeDraft].data = state;
      syncAllUI();
      toast("Data berhasil diimpor ke " + drafts[activeDraft].name + ".");
    }catch(err){ toast("File JSON tidak valid untuk generator ini."); }
  };
  r.readAsText(file);
  e.target.value = "";
});
function copyPlainText(){
  var txt = buildPlainText();
  function done(){ toast("Versi teks polos tersalin — siap ditempel ke portal lamaran."); }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done, function(){ fallbackCopy(txt); done(); });
  } else { fallbackCopy(txt); done(); }
}
function fallbackCopy(txt){
  var ta = document.createElement("textarea");
  ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand("copy"); }catch(e){}
  ta.remove();
}
document.getElementById("btnCopy").addEventListener("click", copyPlainText);
document.getElementById("btnCopy2").addEventListener("click", copyPlainText);

function xmlEsc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function buildDocx(){
  if(!window.JSZip){ toast("Pustaka DOCX belum termuat. Cek koneksi lalu coba lagi."); return; }
  var headings = {};
  SECTION_KEYS.forEach(function(k){ headings[headingFor(k).toUpperCase()] = true; });
  var nameLine = (state.personal.name.trim() || "Nama Lengkap").toUpperCase();
  var paras = buildPlainText().split("\n").map(function(ln){
    var style = "";
    if(ln === nameLine){ style = '<w:pPr><w:spacing w:after="60"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="32"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(ln)+'</w:t></w:r>'; }
    else if(headings[ln]){ style = '<w:pPr><w:spacing w:before="240" w:after="80"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="24"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(ln)+'</w:t></w:r>'; }
    else { style = '<w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">'+xmlEsc(ln)+'</w:t></w:r>'; }
    return '<w:p>'+style+'</w:p>';
  }).join("");
  var docXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paras+
    '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1020" w:right="1020" w:bottom="1020" w:left="1020"/></w:sectPr></w:body></w:document>';
  var ctXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
  var relsXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  var zip = new window.JSZip();
  zip.file("[Content_Types].xml", ctXml);
  zip.folder("_rels").file(".rels", relsXml);
  zip.folder("word").file("document.xml", docXml);
  zip.generateAsync({ type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
    .then(function(blob){ downloadBlob(blob, fileBase() + "_CV.docx"); toast("DOCX terunduh."); })
    .catch(function(){ toast("Gagal membuat DOCX. Coba PDF atau teks polos."); });
}
document.getElementById("btnDocx").addEventListener("click", buildDocx);
document.getElementById("btnDocx2").addEventListener("click", buildDocx);

/* reset */
var resetModal = document.getElementById("resetModal");
document.getElementById("btnReset").addEventListener("click", function(){ resetModal.classList.add("open"); });
document.getElementById("resetCancel").addEventListener("click", function(){ resetModal.classList.remove("open"); });
resetModal.addEventListener("click", function(e){ if(e.target===resetModal) resetModal.classList.remove("open"); });
document.getElementById("resetConfirm").addEventListener("click", function(){
  clearLocal();
  state = defaultState();
  drafts = [ { name:"Draft 1", data: state } ];
  activeDraft = 0; draftCounter = 1;
  wizard.on = false; wizard.step = 0;
  document.getElementById("btnWizard").setAttribute("aria-pressed","false");
  document.getElementById("jdText").value = "";
  document.getElementById("kwResult").innerHTML = "";
  resetModal.classList.remove("open");
  syncAllUI();
  toast("Semua data dikosongkan.");
});

/* ============================== PDF (teks asli, ATS-friendly) ============================== */
function triggerPdf(){
  if(!window.jspdf || !window.jspdf.jsPDF){ toast("Pustaka PDF belum termuat. Cek koneksi internet lalu coba lagi."); return; }
  try{ buildPDF(); }catch(err){ toast("Gagal membuat PDF. Coba lagi, atau ekspor JSON sebagai cadangan."); }
}
document.getElementById("btnPdf").addEventListener("click", triggerPdf);
document.getElementById("btnPdf2").addEventListener("click", triggerPdf);
function buildPDF(){
  var JsPDF = window.jspdf.jsPDF;
  var doc = new JsPDF({ unit:"mm", format:"a4" });
  var compact = state.design==="ringkas";
  var navy = state.design==="navy";
  var serif = state.design==="serif";
  var dokumen = state.design==="dokumen";
  var baseFont = (serif || dokumen) ? "times" : "helvetica";
  var pageW = 210, margin = compact ? 15 : 18, maxW = pageW - margin*2;
  var bodySize = state.fontPt - (compact ? 0.5 : 0);
  var lineH = bodySize * 0.5;
  var y = margin;
  var navyRGB = [27,58,92], black = [17,17,17], gray = [90,90,90];
  function ensure(space){
    if(y + (space || 0) > 297 - margin){ doc.addPage(); y = margin; }
  }
  function write(text, size, style, rgb, gapAfter, indent){
    doc.setFont(baseFont, style); doc.setFontSize(size); doc.setTextColor(rgb[0],rgb[1],rgb[2]);
    var wrapped = doc.splitTextToSize(String(text||""), maxW - (indent||0));
    wrapped.forEach(function(ln){
      ensure(lineH);
      doc.text(ln, margin + (indent||0), y);
      y += lineH;
    });
    y += (gapAfter||0);
  }
  function heading(text){
    ensure(lineH*2.4);
    if(dokumen){
      // Ala contoh dokumen: garis di ATAS judul, judul rata tengah, tanpa garis bawah.
      y += 3.2;
      doc.setDrawColor(0,0,0); doc.setLineWidth(0.4);
      doc.line(margin, y, pageW-margin, y);
      y += lineH*0.95;
      doc.setFont(baseFont,"bold"); doc.setFontSize(bodySize+1); doc.setTextColor(0,0,0);
      doc.text(String(text).toUpperCase(), pageW/2, y, { align:"center" });
      y += lineH*0.95;
      return;
    }
    y += compact ? 3.2 : 4.2;
    doc.setFont(baseFont,"bold"); doc.setFontSize(bodySize+1);
    var c = navy ? navyRGB : black; doc.setTextColor(c[0],c[1],c[2]);
    doc.text(String(text).toUpperCase(), margin, y);
    y += 1.8;
    doc.setDrawColor(c[0],c[1],c[2]); doc.setLineWidth(navy?0.55:0.4);
    doc.line(margin, y, pageW-margin, y);
    y += lineH*0.95;
  }
  var p = state.personal;
  var photoW = 25, photoH = 31;
  var photoSrc = safePhotoData(state.photoData);
  var hasPhoto = state.showPhoto && !!photoSrc;
  var headTextW = hasPhoto ? maxW - photoW - 6 : maxW;
  doc.setFont(baseFont,"bold"); doc.setFontSize(compact?19:22);
  var nc = navy ? navyRGB : black; doc.setTextColor(nc[0],nc[1],nc[2]);
  var headAlign = dokumen ? "left" : (state.headAlign || "left");
  var headX = headAlign==="center" ? pageW/2 : (headAlign==="right" ? pageW-margin : margin);
  var headOpt = headAlign==="left" ? {} : { align: headAlign };
  var nameLines = doc.splitTextToSize((p.name.trim() || "Nama Lengkap").toUpperCase(), headTextW);
  nameLines.forEach(function(ln){ doc.text(ln, headX, y, headOpt); y += compact?7:8; });
  if(p.role.trim()){
    doc.setFont(baseFont,"normal"); doc.setFontSize(bodySize+0.5); doc.setTextColor(nc[0],nc[1],nc[2]);
    doc.text(p.role.trim(), headX, y, headOpt); y += lineH;
  }
  if(dokumen && (p.linkedin.trim() || p.location.trim() || p.email.trim() || p.phone.trim())){
    // Kontak dua kolom ala contoh: kiri LinkedIn + domisili, kanan Email + Mobile.
    var midX = margin + maxW/2;
    var leftLines = [], rightLines = [];
    if(p.linkedin.trim()) leftLines.push({ text: p.linkedin.trim(), link: true });
    if(p.location.trim()) leftLines.push({ text: "Domicile : " + p.location.trim(), link: false });
    if(p.email.trim()) rightLines.push({ text: "Email : " + p.email.trim(), link: true });
    if(p.phone.trim()) rightLines.push({ text: "Mobile : " + p.phone.trim(), link: false });
    var rows = Math.max(leftLines.length, rightLines.length);
    doc.setFont(baseFont,"normal"); doc.setFontSize(bodySize-0.5);
    for(var ci = 0; ci < rows; ci++){
      ensure(lineH);
      if(leftLines[ci]){
        doc.setTextColor(leftLines[ci].link ? 5 : 0, leftLines[ci].link ? 99 : 0, leftLines[ci].link ? 193 : 0);
        doc.text(leftLines[ci].text, margin, y);
      }
      if(rightLines[ci]){
        doc.setTextColor(rightLines[ci].link ? 5 : 0, rightLines[ci].link ? 99 : 0, rightLines[ci].link ? 193 : 0);
        doc.text(rightLines[ci].text, midX, y);
      }
      y += lineH;
    }
    doc.setTextColor(0,0,0);
  } else if(contactLine()){
    doc.setFont(baseFont,"normal"); doc.setFontSize(bodySize-0.5); doc.setTextColor(gray[0],gray[1],gray[2]);
    var cl = doc.splitTextToSize(contactLine(), headTextW);
    cl.forEach(function(ln){ doc.text(ln, headX, y, headOpt); y += lineH; });
  }
  if(hasPhoto){
    var photoFmt = photoSrc.indexOf("image/png") >= 0 ? "PNG" : "JPEG";
    try{ doc.addImage(photoSrc, photoFmt, headAlign==="right" ? margin : pageW - margin - photoW, margin, photoW, photoH); }catch(e){ /* foto WebP/tidak didukung dilewati, PDF tetap jadi */ }
    if(y < margin + photoH) y = margin + photoH;
  }
  y += 1.5;

  state.order.forEach(function(key){
    if(!state.sectionEnabled[key]) return;
    var H = headingFor(key);
    if(key==="summary"){
      var t = state.summaryText.trim(); if(!t) return;
      heading(H);
      write(t, bodySize, "normal", black, 1.5);
      return;
    }
    var items = state.items[key].filter(function(it){ return it.enabled && itemHasContent(key,it); });
    if(!items.length) return;
    heading(H);
    if(key==="tech" || key==="soft"){
      write(items.map(function(it){ return it.value.trim(); }).filter(Boolean).join("  •  "), bodySize, "normal", black, 1.5);
      return;
    }
    if(key==="languages"){
      write(items.map(function(it){ return it.name.trim() + (it.level.trim() ? " — "+it.level.trim() : ""); }).join("  •  "), bodySize, "normal", black, 1.5);
      return;
    }
    items.forEach(function(it){
      if(key==="experience" || key==="related" || key==="education"){
        var title = key==="education" ? it.school.trim() : it.role.trim();
        var sub = key==="education" ? [it.degree.trim(),it.location.trim()].filter(Boolean).join(", ")
                                    : [it.company.trim(),it.location.trim()].filter(Boolean).join(", ");
        var dates = dateRange(it);
        ensure(lineH*2);
        if(dokumen && (key==="experience" || key==="related") && it.company.trim()){
          // Ala contoh: perusahaan (kapital, tebal) di baris sendiri di atas jabatan.
          doc.setFont(baseFont,"bold"); doc.setFontSize(bodySize); doc.setTextColor(0,0,0);
          var compLines = doc.splitTextToSize(it.company.trim().toUpperCase(), maxW);
          compLines.forEach(function(ln){ ensure(lineH); doc.text(ln, margin, y); y += lineH; });
        }
        doc.setFont(baseFont,"bold"); doc.setFontSize(bodySize); doc.setTextColor(0,0,0);
        var tw = doc.splitTextToSize(title, dates ? maxW-46 : maxW);
        var startY = y;
        tw.forEach(function(ln){ doc.text(ln, margin, y); y += lineH; });
        if(dates){
          doc.setFont(baseFont, dokumen ? "bold" : "normal"); doc.setFontSize(bodySize-0.5);
          doc.text(dates, pageW-margin, startY, { align:"right" });
        }
        if(sub && !(dokumen && (key==="experience" || key==="related") && it.company.trim())){
          write(sub, bodySize, "normal", black, 0.4);
        } else if(sub && dokumen && (key==="experience" || key==="related") && it.location.trim()){
          // Lokasi tetap tersimpan: tampil sebagai baris kecil di bawah jabatan.
          write(it.location.trim(), bodySize, "normal", black, 0.4);
        }
        lines(it.bullets).forEach(function(b){
          doc.setFont(baseFont,"normal"); doc.setFontSize(bodySize); doc.setTextColor(0,0,0);
          var wrapped = doc.splitTextToSize(b, maxW-6);
          wrapped.forEach(function(ln, i){
            ensure(lineH);
            if(i===0) doc.text("•", margin+1, y);
            doc.text(ln, margin+6, y);
            y += lineH;
          });
        });
        y += compact ? 1.6 : 2.6;
      } else {
        var main = it.name.trim();
        var meta = [it.issuer.trim(), it.year.trim()].filter(Boolean).join(", ");
        ensure(lineH);
        doc.setFont(baseFont,"bold"); doc.setFontSize(bodySize); doc.setTextColor(0,0,0);
        doc.text(main, margin, y);
        if(meta){
          var mw = doc.getTextWidth(main+" ");
          doc.setFont(baseFont,"normal");
          doc.text("— "+meta, margin+mw, y);
        }
        y += lineH;
        if(it.detail.trim()) write(it.detail.trim(), bodySize, "normal", black, 0);
        y += 1.2;
      }
    });
  });

  doc.save(fileBase() + "_CV.pdf");
  toast("PDF terunduh — teksnya bisa diseleksi & dibaca ATS.");
}





/* ============================== Asisten CV lokal (tanpa AI eksternal) ============================== */
var lastSummary = "";
function aiListItems(key){
  return state.items[key].filter(function(it){ return it.enabled && itemHasContent(key, it); });
}
function aiFirstNumberedBullet(){
  var exps = aiListItems("experience").concat(aiListItems("related"));
  for(var i=0;i<exps.length;i++){
    var bl = lines(exps[i].bullets || "");
    for(var j=0;j<bl.length;j++){ if(/\d/.test(bl[j])) return bl[j]; }
  }
  return "";
}
function buildSummary(){
  var p = state.personal, en = state.lang === "en";
  var exps = aiListItems("experience");
  var techs = aiListItems("tech").map(function(it){ return it.value.trim(); }).filter(Boolean);
  var edu = aiListItems("education")[0];
  var parts = [];
  if(en){
    var open = "";
    if(p.name.trim()) open += p.name.trim() + " is ";
    open += p.role.trim() ? "a " + p.role.trim() : "a professional";
    if(exps.length){
      var e0 = exps[0];
      open += " with experience at " + [e0.company.trim(), e0.role.trim()].filter(Boolean).join(" as ");
    }
    open += ".";
    parts.push(open);
    if(techs.length) parts.push("Key skills: " + techs.slice(0, 4).join(", ") + ".");
    var num = aiFirstNumberedBullet();
    if(num) parts.push("Measurable result: " + num.replace(/\.$/, "") + ".");
    if(edu && edu.school.trim()) parts.push("Graduated from " + edu.school.trim() + (edu.degree.trim() ? " (" + edu.degree.trim() + ")" : "") + ".");
  } else {
    var openId = "";
    if(p.name.trim()) openId += p.name.trim() + " adalah ";
    openId += p.role.trim() ? p.role.trim() : "profesional";
    if(exps.length){
      var e1 = exps[0];
      openId += " dengan pengalaman di " + [e1.company.trim(), e1.role.trim()].filter(Boolean).join(" sebagai ");
    }
    openId += ".";
    parts.push(openId);
    if(techs.length) parts.push("Keahlian utama: " + techs.slice(0, 4).join(", ") + ".");
    var numId = aiFirstNumberedBullet();
    if(numId) parts.push("Hasil terukur: " + numId.replace(/\.$/, "") + ".");
    if(edu && edu.school.trim()) parts.push("Lulusan " + edu.school.trim() + (edu.degree.trim() ? " (" + edu.degree.trim() + ")" : "") + ".");
  }
  return parts.join(" ");
}
function improveSummary(){
  var t = state.summaryText.trim();
  if(!t) return buildSummary();
  var s = t.replace(/Saya adalah (seorang )?/gi, "").replace(/saya sangat bersemangat/gi, "berpengalaman")
    .replace(/orang yang pekerja keras/gi, "profesional yang berorientasi hasil")
    .replace(/\s+/g, " ").trim();
  if(s && s.charAt(0) === s.charAt(0).toLowerCase()) s = s.charAt(0).toUpperCase() + s.slice(1);
  var sentences = s.split(/\.(\s+|$)/).filter(function(x){ return x && x.trim().length > 1 && x.trim() !== "."; });
  var clean = [];
  sentences.forEach(function(x){ var v = x.trim().replace(/\.$/, ""); if(v) clean.push(v); });
  if(clean.length > 3) clean = clean.slice(0, 3);
  return clean.join(". ") + (clean.length ? "." : "");
}
function aiAddMsg(who, html, applySummary){
  var log = document.getElementById("aiLog");
  if(!log) return;
  var div = document.createElement("div");
  div.className = "ai-msg " + who;
  div.innerHTML = '<span class="who">' + (who === "user" ? "Kamu" : "Asisten") + '</span><span>' + html + '</span>' +
    (applySummary ? '<div style="margin-top:8px"><button type="button" class="btn small primary" data-ai-apply="1">Pakai ringkasan ini</button></div>' : "");
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function aiAnswer(raw){
  var q = (raw || "").toLowerCase().trim();
  if(!q) return;
  aiAddMsg("user", esc(raw));
  var m;
  if((m = q.match(/tambah keahlian (.+)/))){
    var v = m[1].replace(/[.\s]+$/, "").trim();
    if(v){ var it = blankItem("tech"); it.value = v; state.items.tech.push(it); syncAllUI(); markSaved();
      aiAddMsg("bot", "Sudah ditambahkan ke Keahlian Teknis: <b>" + esc(v) + "</b>."); return; }
  }
  if((m = q.match(/tambah (keahlian nonteknis|soft skill) (.+)/))){
    var v2 = m[2].replace(/[.\s]+$/, "").trim();
    if(v2){ var it2 = blankItem("soft"); it2.value = v2; state.items.soft.push(it2); syncAllUI(); markSaved();
      aiAddMsg("bot", "Sudah ditambahkan ke Keahlian Nonteknis: <b>" + esc(v2) + "</b>."); return; }
  }
  if((m = q.match(/tambah bahasa (.+)/))){
    var v3 = m[1].replace(/[.\s]+$/, "").trim();
    if(v3){ var it3 = blankItem("languages"); it3.name = v3; state.items.languages.push(it3); syncAllUI(); markSaved();
      aiAddMsg("bot", "Sudah ditambahkan ke Bahasa: <b>" + esc(v3) + "</b>. Lengkapi tingkatnya di panel Bahasa."); return; }
  }
  if(q.indexOf("matikan foto") >= 0 || q.indexOf("hapus foto") >= 0 || q.indexOf("tanpa foto") >= 0){
    state.showPhoto = false; syncAllUI(); markSaved();
    aiAddMsg("bot", "Foto sudah dimatikan. Ini pilihan paling aman untuk lamaran lewat sistem ATS."); return;
  }
  if((m = q.match(/pakai desain (.+)/))){
    var want = m[1].trim();
    var found = DESIGNS.filter(function(d){ return d.name.toLowerCase() === want || d.name.toLowerCase().indexOf(want) >= 0; })[0];
    if(found){ state.design = found.id; syncAllUI(); markSaved();
      aiAddMsg("bot", "Desain diubah ke <b>" + esc(found.name) + "</b>. Lihat pratinjau di kanan."); return; }
  }
  if((m = q.match(/font (10|11|12)\s?pt/))){
    state.fontPt = Number(m[1]); syncAllUI(); markSaved();
    aiAddMsg("bot", "Ukuran font isi CV diubah ke <b>" + m[1] + "pt</b>."); return;
  }
  if(q.indexOf("pakai ringkasan") >= 0 && lastSummary){
    state.summaryText = lastSummary; syncAllUI(); markSaved();
    aiAddMsg("bot", "Ringkasan sudah dipakai dan muncul di pratinjau."); return;
  }
  if(q.indexOf("ringkasan") >= 0 || q.indexOf("summary") >= 0){
    var s = buildSummary();
    if(!s){ aiAddMsg("bot", "Isi dulu nama, jabatan, atau satu pengalaman kerja, lalu minta lagi — ringkasannya akan disusun dari data itu."); return; }
    lastSummary = s;
    aiAddMsg("bot", "Ini draf ringkasan dari datamu:<br><br>" + esc(s) + "<br><br>Tekan tombol di bawah kalau mau langsung dipakai, atau edit dulu di panel Ringkasan Profil.", true); return;
  }
  if(q.indexOf("perbaiki") >= 0){
    var imp = improveSummary();
    if(!imp){ aiAddMsg("bot", "Belum ada ringkasan untuk diperbaiki. Coba perintah “Buatkan ringkasan” dulu."); return; }
    lastSummary = imp;
    aiAddMsg("bot", "Versi yang lebih ringkas dan langsung ke hasil:<br><br>" + esc(imp), true); return;
  }
  if(q.indexOf("kurang") >= 0 || q.indexOf("apa yang") >= 0 || q.indexOf("cek cv") >= 0){
    var c = completeness();
    aiAddMsg("bot", c.missing.length
      ? "Yang masih kurang: <b>" + esc(c.missing.join(", ")) + "</b>. Kelengkapan sekarang " + c.pct + "%."
      : "Semua bagian inti sudah terisi (" + c.pct + "%). Tinggal periksa pratinjau dan unduh."); return;
  }
  if(q.indexOf("kata kerja") >= 0 || q.indexOf("action verb") >= 0 || q.indexOf("pengalaman") >= 0){
    aiAddMsg("bot", "Awali tiap poin pengalaman dengan kata kerja aksi dan angka hasil. Contoh: Mengelola, Memproses, Meningkatkan, Mengurangi, Menyusun, Melayani, Mengkoordinasikan. Lalu tambah hasil terukur, mis. “Memproses 30+ berkas per bulan, error turun 15%.”"); return;
  }
  if(q.indexOf("ats") >= 0){
    var a = atsChecks();
    aiAddMsg("bot", a.map(function(x){ return (x.ok ? "✓ " : "! ") + x.text; }).join("<br>")); return;
  }
  if(q.indexOf("foto") >= 0){
    aiAddMsg("bot", "Untuk lamaran via ATS, lebih aman tanpa foto. Foto hanya cocok untuk CV yang dikirim langsung ke perekrut atau untuk portofolio."); return;
  }
  if(q.indexOf("halaman") >= 0 || q.indexOf("panjang") >= 0){
    aiAddMsg("bot", "Perkiraan sekarang ±" + pageEst + " halaman. Idealnya 1–2 halaman. Kalau lebih, pakai desain Formal Ringkas atau font 10pt, dan pangkas poin yang paling tidak relevan."); return;
  }
  if(q.indexOf("desain") >= 0 || q.indexOf("template") >= 0){
    aiAddMsg("bot", "Ada " + DESIGNS.length + " desain: " + DESIGNS.map(function(d){ return d.name; }).join(", ") + ". Untuk sistem ATS, paling aman Klasik ATS atau Formal Ringkas."); return;
  }
  if(q.indexOf("halo") >= 0 || q.indexOf("hai") >= 0 || q.indexOf("bisa apa") >= 0 || q.indexOf("help") >= 0){
    aiAddMsg("bot", "Aku bisa buatkan ringkasan dari datamu, memperbaiki ringkasan, mengecek yang kurang dan cek ATS, memberi saran kata kerja, serta mengeksekusi perintah seperti tambah keahlian atau ganti desain. Semua diproses di browser, datamu tidak dikirim ke mana-mana."); return;
  }
  aiAddMsg("bot", "Aku belum yakin maksudnya. Coba salah satu: “Buatkan ringkasan”, “Apa yang kurang?”, “Saran kata kerja”, atau perintah “tambah keahlian Excel”.");
}
function aiSend(){
  var inp = document.getElementById("aiInput");
  var v = inp.value.trim();
  if(!v) return;
  inp.value = "";
  aiAnswer(v);
}
document.getElementById("aiSend").addEventListener("click", aiSend);
document.getElementById("aiInput").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); aiSend(); } });
document.querySelectorAll("[data-ai-chip]").forEach(function(b){
  b.addEventListener("click", function(){
    var k = b.getAttribute("data-ai-chip");
    if(k === "ringkasan") aiAnswer("Buatkan ringkasan");
    else if(k === "perbaiki") aiAnswer("Perbaiki ringkasan");
    else if(k === "kurang") aiAnswer("Apa yang kurang?");
    else if(k === "katakerja") aiAnswer("Saran kata kerja");
    else if(k === "ats") aiAnswer("Cek ATS singkat");
  });
});
document.getElementById("aiLog").addEventListener("click", function(e){
  var btn = e.target.closest ? e.target.closest("[data-ai-apply]") : null;
  if(!btn || !lastSummary) return;
  state.summaryText = lastSummary; syncAllUI(); markSaved();
  aiAddMsg("bot", "Ringkasan sudah dipakai dan muncul di pratinjau.");
});
aiAddMsg("bot", "Halo, aku Asisten CV. Coba tekan “Buatkan ringkasan” setelah kamu mengisi nama, jabatan, dan pengalaman — atau tanya apa yang kurang di CV-mu.");

document.getElementById("kwResult").addEventListener("click", function(e){
  var b = e.target.closest ? e.target.closest("[data-kw-add]") : null;
  if(!b) return;
  var w = b.getAttribute("data-kw-add");
  var it = blankItem("tech"); it.value = w; state.items.tech.push(it);
  syncAllUI(); markSaved();
  toast("“" + w + "” ditambahkan ke Keahlian Teknis.");
});



function syncAlignSeg(){
  var a = state.headAlign || "left";
  document.getElementById("alignLeft").setAttribute("aria-pressed", a==="left" ? "true":"false");
  document.getElementById("alignCenter").setAttribute("aria-pressed", a==="center" ? "true":"false");
  document.getElementById("alignRight").setAttribute("aria-pressed", a==="right" ? "true":"false");
}
function setHeadAlign(a){
  state.headAlign = a; syncAlignSeg(); renderPreview(); markSaved();
}
document.getElementById("alignLeft").addEventListener("click", function(){ setHeadAlign("left"); });
document.getElementById("alignCenter").addEventListener("click", function(){ setHeadAlign("center"); });
document.getElementById("alignRight").addEventListener("click", function(){ setHeadAlign("right"); });


function toggleAi(open){
  var panel = document.getElementById("aiPanel");
  var fab = document.getElementById("aiFab");
  if(!panel || !fab) return;
  var show = (typeof open === "boolean") ? open : panel.hidden;
  panel.hidden = !show;
  fab.setAttribute("aria-expanded", show ? "true" : "false");
  if(show){ var inp = document.getElementById("aiInput"); if(inp) inp.focus(); }
}
(function(){
  var fab = document.getElementById("aiFab");
  if(fab) fab.addEventListener("click", function(){ toggleAi(); });
  var close = document.getElementById("aiClose");
  if(close) close.addEventListener("click", function(){ toggleAi(false); });
  var nav = document.getElementById("navAi");
  if(nav) nav.addEventListener("click", function(){ toggleAi(true); });
})();
document.addEventListener("keydown", function(e){ if(e.key === "Escape") toggleAi(false); });


/* ============================== Penyimpanan lokal (dengan fallback) ============================== */
/* Urutan fallback: 1) localStorage di browser ini (bertahan refresh/tutup tab),
   2) kalau localStorage tidak tersedia/penuh, tetap jalan di memori sesi + peringatan tutup tab,
   3) selalu ada Ekspor JSON manual sebagai cadangan lintas perangkat.
   Foto tidak ikut disimpan lokal (bisa melewati kuota): foto harus dipilih ulang setelah restore. */
var LOCAL_KEY = "berkas.cv.v2";
var persistOk = true;
var persistTimer = null;
function persistLocal(){
  try{
    var copy = JSON.parse(JSON.stringify(drafts));
    copy.forEach(function(d){
      if(d.data){ d.data.photoData = null; d.data.photoName = ""; d.data.showPhoto = false; }
    });
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ v: 2, savedAt: Date.now(), drafts: copy, activeDraft: activeDraft, draftCounter: draftCounter }));
    persistOk = true;
  }catch(e){ persistOk = false; }
}
function schedulePersist(){
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persistLocal, 400);
}
function restoreLocal(){
  try{
    var raw = localStorage.getItem(LOCAL_KEY);
    if(!raw) return false;
    var saved = JSON.parse(raw);
    if(!saved || !Array.isArray(saved.drafts) || !saved.drafts.length) return false;
    var d0 = saved.drafts[0];
    if(!d0 || !d0.data || !d0.data.personal || !d0.data.items) return false;
    drafts = saved.drafts;
    activeDraft = (typeof saved.activeDraft === "number" && saved.activeDraft >= 0 && saved.activeDraft < drafts.length) ? saved.activeDraft : 0;
    draftCounter = typeof saved.draftCounter === "number" ? saved.draftCounter : drafts.length;
    state = drafts[activeDraft].data;
    // ID item harus unik: lanjutkan counter dari ID terbesar yang tersimpan.
    var maxId = 0;
    drafts.forEach(function(d){
      Object.keys(d.data.items || {}).forEach(function(k){
        (d.data.items[k] || []).forEach(function(it){ if(it.id && it.id > maxId) maxId = it.id; });
      });
    });
    uid = maxId;
    return true;
  }catch(e){ return false; }
}
function clearLocal(){
  try{ localStorage.removeItem(LOCAL_KEY); }catch(e){}
}

/* ============================== Mode Fokus + peringatan tutup tab ============================== */
var dirtySinceExport = false;
var _origMarkSaved = markSaved;
markSaved = function(){ dirtySinceExport = true; _origMarkSaved(); schedulePersist(); scheduleServerSync(); };
document.getElementById("btnFocus").addEventListener("click", function(){
  var on = document.body.classList.toggle("focus-on");
  this.setAttribute("aria-pressed", on ? "true" : "false");
  this.textContent = on ? "Keluar Fokus" : "Mode Fokus";
});
document.getElementById("btnCopySummary").addEventListener("click", function(){
  var t = state.summaryText.trim();
  if(!t){ toast("Ringkasan masih kosong — isi dulu di panel Ringkasan Profil."); return; }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){ toast("Ringkasan tersalin."); }, function(){ toast("Gagal menyalin ringkasan."); });
  } else { toast("Salin manual dari panel Ringkasan Profil."); }
});
window.addEventListener("beforeunload", function(e){
  if(dirtySinceExport){
    persistLocal();
    if(!persistOk){
      e.preventDefault();
      e.returnValue = "";
    }
  }
});

/* ============================== Login wajib via Supabase (v2.3.0) ============================== */
/* Model sync: SATU baris per user di tabel drafts, kolom data berisi seluruh bundle
   {drafts, activeDraft, draftCounter} (foto dipotong, seperti localStorage).
   Alasan: tidak butuh unique constraint tambahan di SQL yang sudah di-run user,
   hapus/duplikat/reset draf tidak bisa "bangkit lagi" dari baris lama, dan
   localStorage tetap menjadi cache. RLS di SQL memastikan user hanya bisa
   membaca/menulis baris miliknya sendiri. Kunci service_role TIDAK PERNAH
   dipakai di sini — hanya anon key (publishable) lewat /api/config atau
   supabase-config.json, yang memang dirancang Supabase untuk frontend. */
var supa = null, authUser = null, serverRowId = null, serverSyncTimer = null, authMode = "login";
function authEls(id){ return document.getElementById(id); }
function setAuthMsg(msg){
  var el = authEls("authMsg");
  if(el) el.textContent = msg || "";
}
function showGate(){
  var g = authEls("authGate");
  if(g) g.hidden = false;
  document.body.classList.add("auth-locked");
}
function hideGate(){
  var g = authEls("authGate");
  if(g) g.hidden = true;
  document.body.classList.remove("auth-locked");
  var lbl = authEls("authUserLabel"), lo = authEls("btnLogout");
  if(lbl && authUser){ lbl.textContent = authUser.email || ""; lbl.hidden = false; }
  if(lo) lo.hidden = false;
}
function setAuthTab(mode){
  authMode = mode;
  var tl = authEls("authTabLogin"), tr = authEls("authTabRegister"), sb = authEls("authSubmit"), ti = authEls("authTitle");
  if(tl) tl.setAttribute("aria-pressed", mode === "login" ? "true" : "false");
  if(tr) tr.setAttribute("aria-pressed", mode === "register" ? "true" : "false");
  if(sb) sb.textContent = mode === "login" ? "Masuk" : "Daftar";
  if(ti) ti.textContent = mode === "login" ? "Masuk untuk membuka CV-mu" : "Daftar akun Berkas.";
}
async function loadSupabaseConfig(){
  if(window.BERKAS_SUPABASE && window.BERKAS_SUPABASE.url && window.BERKAS_SUPABASE.anonKey){
    return window.BERKAS_SUPABASE;
  }
  var sources = ["supabase-config.json", "/api/config"];
  for(var i = 0; i < sources.length; i++){
    try{
      var r = await fetch(sources[i], { cache: "no-store" });
      if(!r.ok) continue;
      var j = await r.json();
      if(j && j.url && j.anonKey) return { url: j.url, anonKey: j.anonKey };
    }catch(e){ /* coba sumber berikutnya */ }
  }
  return null;
}
function stripPhotos(bundle){
  var copy = JSON.parse(JSON.stringify(bundle));
  (copy.drafts || []).forEach(function(d){
    if(d.data){ d.data.photoData = null; d.data.photoName = ""; d.data.showPhoto = false; }
  });
  return copy;
}
function serverBundle(){
  return stripPhotos({ drafts: drafts, activeDraft: activeDraft, draftCounter: draftCounter });
}
function applyServerBundle(bundle){
  if(!bundle || !Array.isArray(bundle.drafts) || !bundle.drafts.length) return false;
  var d0 = bundle.drafts[0];
  if(!d0 || !d0.data || !d0.data.personal || !d0.data.items){
    // Format lama: satu draf langsung di kolom data.
    if(bundle.personal && bundle.items){
      drafts = [{ name: "Draft 1", data: bundle }];
      activeDraft = 0; draftCounter = 1; state = drafts[0].data; return true;
    }
    return false;
  }
  drafts = bundle.drafts;
  activeDraft = (typeof bundle.activeDraft === "number" && bundle.activeDraft >= 0 && bundle.activeDraft < drafts.length) ? bundle.activeDraft : 0;
  draftCounter = typeof bundle.draftCounter === "number" ? bundle.draftCounter : drafts.length;
  state = drafts[activeDraft].data;
  var maxId = 0;
  drafts.forEach(function(d){
    Object.keys((d.data && d.data.items) || {}).forEach(function(k){
      (d.data.items[k] || []).forEach(function(it){ if(it.id && it.id > maxId) maxId = it.id; });
    });
  });
  uid = maxId;
  return true;
}
async function serverLoad(){
  if(!supa || !authUser) return false;
  try{
    var res = await supa.from("drafts").select("id,data").eq("user_id", authUser.id).order("updated_at", { ascending: false }).limit(1).maybeSingle();
    if(res.error || !res.data) return false;
    serverRowId = res.data.id;
    return applyServerBundle(res.data.data);
  }catch(e){ return false; }
}
async function serverSave(){
  if(!supa || !authUser) return;
  var bundle = serverBundle();
  try{
    if(serverRowId){
      var up = await supa.from("drafts").update({ data: bundle, name: drafts[activeDraft].name || "Draf CV" }).eq("id", serverRowId).eq("user_id", authUser.id);
      if(!up.error) { markServerSaved(); return; }
      serverRowId = null; // baris hilang (mis. dihapus manual) -> insert ulang di bawah
    }
    var ins = await supa.from("drafts").insert({ user_id: authUser.id, name: drafts[activeDraft].name || "Draf CV", data: bundle }).select("id").single();
    if(!ins.error && ins.data) serverRowId = ins.data.id;
    if(!ins.error) markServerSaved();
  }catch(e){ /* diam: localStorage tetap jadi cache, sync berikutnya mencoba lagi */ }
}
function markServerSaved(){
  var el = authEls("saveState");
  if(el && authUser){
    var d = new Date();
    el.textContent = "Tersimpan otomatis ke akun " + authUser.email + " · " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + " — dan di browser ini sebagai cache.";
  }
}
function scheduleServerSync(){
  if(!supa || !authUser) return;
  clearTimeout(serverSyncTimer);
  serverSyncTimer = setTimeout(serverSave, 800);
}
function bindAuthForm(){
  var tl = authEls("authTabLogin"), tr = authEls("authTabRegister");
  if(tl) tl.addEventListener("click", function(){ setAuthTab("login"); setAuthMsg(""); });
  if(tr) tr.addEventListener("click", function(){ setAuthTab("register"); setAuthMsg(""); });
  var sb = authEls("authSubmit");
  if(sb) sb.addEventListener("click", submitAuth);
  var pw = authEls("authPassword");
  if(pw) pw.addEventListener("keydown", function(e){ if(e.key === "Enter") submitAuth(); });
  var fg = authEls("authForgot");
  if(fg) fg.addEventListener("click", async function(){
    var email = String((authEls("authEmail") || {}).value || "").trim();
    if(!email){ setAuthMsg("Isi email dulu untuk reset password."); return; }
    if(!supa){ setAuthMsg("Supabase belum dikonfigurasi."); return; }
    setAuthMsg("Mengirim link reset…");
    var r = await supa.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/" });
    setAuthMsg(r.error ? ("Gagal mengirim link reset: " + r.error.message) : "Link reset dikirim ke emailmu — cek inbox/spam.");
  });
  var lo = authEls("btnLogout");
  if(lo) lo.addEventListener("click", async function(){
    try{ if(supa) await supa.auth.signOut(); }catch(e){}
    window.location.reload();
  });
}
async function submitAuth(){
  var email = String((authEls("authEmail") || {}).value || "").trim();
  var password = String((authEls("authPassword") || {}).value || "");
  if(!email || password.length < 6){ setAuthMsg("Isi email dan password minimal 6 karakter."); return; }
  if(!supa){ setAuthMsg("Supabase belum dikonfigurasi."); return; }
  setAuthMsg(authMode === "login" ? "Memeriksa akun…" : "Mendaftarkan akun…");
  try{
    var r = authMode === "login"
      ? await supa.auth.signInWithPassword({ email: email, password: password })
      : await supa.auth.signUp({ email: email, password: password });
    if(r.error){ setAuthMsg("Gagal: " + r.error.message); return; }
    if(!r.data || !r.data.session){
      // Confirm email aktif: user harus klik link verifikasi dulu.
      setAuthMsg("Akun dibuat. Cek emailmu untuk verifikasi, lalu masuk di sini.");
      setAuthTab("login");
      return;
    }
    authUser = r.data.session.user;
    var loaded = await serverLoad();
    if(!loaded){
      // Akun baru / belum ada draf server: unggah draf lokal saat ini sebagai awal.
      await serverSave();
    }
    persistLocal();
    hideGate();
    syncAllUI();
    toast(loaded ? "Selamat datang kembali — draf dari akunmu dimuat." : "Selamat datang — draf lokalmu disimpan ke akunmu.");
  }catch(e){ setAuthMsg("Terjadi kesalahan, coba lagi."); }
}
async function initAuth(restoredLocal){
  var gate = authEls("authGate");
  if(!gate){ return; } // tanpa gate, jalan lokal seperti biasa
  bindAuthForm();
  setAuthTab("login");
  showGate();
  setAuthMsg("Memuat…");
  try{
    var cfg = await loadSupabaseConfig();
    if(!cfg){
      var host = String(window.location.hostname || "");
      if(host.indexOf("vercel.app") >= 0){
        var cm = authEls("authConfigMsg");
        if(cm) cm.hidden = false;
        setAuthMsg("Supabase belum dikonfigurasi di deployment Vercel ini.");
        return; // tetap terkunci: login wajib, dan belum ada server untuk login
      }
      // GitHub Pages / lokal: tidak ada function server, jadi jalan mode lokal.
      hideGate();
      syncAllUI();
      if(restoredLocal) toast("Draf terakhir dipulihkan dari browser ini. Foto tidak ikut tersimpan — pilih ulang kalau perlu.");
      return;
    }
    if(!window.supabase || !window.supabase.createClient){
      setAuthMsg("Gagal memuat pustaka Supabase. Periksa koneksi lalu refresh halaman.");
      return;
    }
    supa = window.supabase.createClient(cfg.url, cfg.anonKey);
    var sess = await supa.auth.getSession();
    var user = sess && sess.data && sess.data.session ? sess.data.session.user : null;
    if(!user){
      setAuthMsg("");
      return; // tetap di gate, tunggu login/daftar
    }
    authUser = user;
    var loaded = await serverLoad();
    persistLocal();
    hideGate();
    syncAllUI();
    toast(loaded ? "Draf dari akunmu dimuat." : "Masuk sebagai " + (authUser.email || "") + ".");
  }catch(e){
    // Jangan pernah membuat editor hilang total karena error auth tak terduga.
    if(String(window.location.hostname || "").indexOf("vercel.app") < 0){
      hideGate();
      syncAllUI();
    } else {
      setAuthMsg("Terjadi kesalahan saat memuat login. Coba refresh halaman.");
    }
  }
}

/* ============================== Init ============================== */
var locDl = document.getElementById("locList");
locDl.innerHTML = LOCATIONS.map(function(l){ return '<option value="'+esc(l)+'"></option>'; }).join("");
themeLabel();
var restored = restoreLocal();
initAuth(restored);
})();
