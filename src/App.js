import { useState, useEffect, useRef, useMemo } from "react";

const C = {
  primary:"#1a5c38",primaryDk:"#0d2e1c",primaryLt:"#eaf4ee",
  gold:"#b8922a",text:"#111827",textMd:"#6b7280",textLt:"#9ca3af",
  bg:"#f4f6f8",card:"#fff",border:"#e5e7eb",
  success:"#15803d",successBg:"#f0fdf4",
  danger:"#dc2626",dangerBg:"#fef2f2",
  info:"#1d4ed8",infoBg:"#eff6ff",
  warn:"#b45309",warnBg:"#fffbeb",
  shadow:"0 1px 4px rgba(0,0,0,.07)",
};

const SCHOOL = {
  name:"Paragon Islamic School",
  phone:"+92 37 5378045",
  wa:"+92 345 2247258",
  email:"info@paragonislamicschool.edu.pk",
  address:"Main Circular Road, Dera Ismail Khan, KPK, Pakistan",
  hours:"Monday to Saturday 8:00 AM to 2:00 PM",
  principal:"Prof. Abdul Rehman Khan",
  founded:"2005",
};

const CLASSES = ["Play Group","Nursery","Prep","Class 1","Class 2","Class 3",
                 "Class 4","Class 5","Class 6","Class 7","Class 8"];
const TODAY = new Date().toISOString().split("T")[0];

// ── AI KNOWLEDGE BASE ─────────────────────────────────
const AI_KB = [
  {
    keys:["salam","hello","hi","السلام","assalam","marhaba","مرحبا","hey"],
    reply:`وعلیکم السلام! 😊
پیراگون اسلامک اسکول میں خوش آمدید!
میں آپ کا AI اسسٹنٹ ہوں۔

آپ مجھ سے پوچھ سکتے ہیں:
• داخلہ معلومات
• فیس اسٹرکچر
• اسکول کے اوقات
• رابطہ معلومات
• مضامین اور جماعتیں

Walaikum Assalam! Welcome to Paragon Islamic School!
You can ask me about:
• Admissions • Fees • Timings • Contact • Classes`
  },
  {
    keys:["admission","daakhla","داخلہ","apply","enroll","registration","form","آخری","last date","june","july"],
    reply:`داخلہ معلومات — Session 2025-26:

✅ جماعتیں: Play Group تا Class 8
✅ آخری تاریخ: 30 جون 2025
✅ انٹری ٹیسٹ: 5 جولائی 2025
✅ نئی کلاسیں: 1 اگست 2025

داخلے کے لیے:
📞 Phone: +92 37 5378045
📱 WhatsApp: +92 345 2247258
📧 Email: info@paragonislamicschool.edu.pk

Admission Info — Session 2025-26:
✅ Classes: Play Group to Class 8
✅ Last Date: June 30, 2025
✅ Entry Test: July 5, 2025
✅ Session Starts: August 1, 2025

Apply Now:
📞 Call: +92 37 5378045
📱 WhatsApp: +92 345 2247258`
  },
  {
    keys:["fee","فیس","fees","monthly","payment","maheena","ماہانہ","kitni","کتنی","charges"],
    reply:`ماہانہ فیس — 2025-26:

🟢 Play Group: Rs. 2,000
🟢 Nursery: Rs. 2,200
🟢 Prep: Rs. 2,500
🟢 Class 1 & 2: Rs. 2,800
🟢 Class 3 & 4: Rs. 3,000
🟢 Class 5: Rs. 3,200
🟢 Class 6: Rs. 3,500
🟢 Class 7: Rs. 3,800
🟢 Class 8: Rs. 4,000

ٹرانسپورٹ فیس: Rs. 800/month
داخلہ فیس: Rs. 1,000 (ایک بار)

Monthly Fee 2025-26:
Play Group: Rs.2,000 | Prep: Rs.2,500
Class 1-2: Rs.2,800 | Class 3-4: Rs.3,000
Class 5: Rs.3,200 | Class 6: Rs.3,500
Class 7: Rs.3,800 | Class 8: Rs.4,000`
  },
  {
    keys:["time","timing","وقت","hours","schedule","اوقات","kab","کب","open","band","close"],
    reply:`اسکول کے اوقات:

🕗 پیر تا ہفتہ: صبح 8:00 بجے تا دوپہر 2:00 بجے
🕗 اتوار: بند

پہلی گھنٹی: 8:00 AM
چھٹی: 2:00 PM
دفتری اوقات: 8:00 AM - 3:00 PM

School Timings:
Monday to Saturday: 8:00 AM to 2:00 PM
Sunday: Closed
Office Hours: 8:00 AM to 3:00 PM`
  },
  {
    keys:["contact","رابطہ","phone","number","whatsapp","email","address","پتہ","location","kahan","کہاں","where"],
    reply:`رابطہ معلومات:

📞 Phone: +92 37 5378045
📱 WhatsApp: +92 345 2247258
📧 Email: info@paragonislamicschool.edu.pk
📧 Support: support@paragonislamicschool.edu.pk
📍 Address: Main Circular Road, Dera Ismail Khan, KPK, Pakistan

اوقات: پیر تا ہفتہ 8AM - 2PM

Contact Information:
📞 Phone: +92 37 5378045
📱 WhatsApp: +92 345 2247258
📧 Email: info@paragonislamicschool.edu.pk
📍 Main Circular Road, Dera Ismail Khan, KPK`
  },
  {
    keys:["class","جماعت","grade","subject","مضمون","syllabus","curriculum","math","science","english","urdu","islamiat","computer"],
    reply:`جماعتیں اور مضامین:

📚 Play Group: English, Urdu, Math, Drawing
📚 Nursery: English, Urdu, Math, Islamiat
📚 Prep: English, Urdu, Math, G.K, Islamiat
📚 Class 1-2: English, Urdu, Math, Science, Islamiat, Social Studies
📚 Class 3-5: English, Urdu, Math, Science, Islamiat, Computer, Social Studies
📚 Class 6-8: English, Urdu, Math, Physics, Chemistry, Islamiat, Pak Studies, Computer

Classes and Subjects:
Play Group to Class 8
Core: English, Urdu, Math, Science, Islamiat
Additional: Computer, Social Studies, Pakistan Studies`
  },
  {
    keys:["principal","پرنسپل","head","headmaster","incharge","principal"],
    reply:`پرنسپل:

👨‍💼 پروفیسر عبدالرحمن خان
🎓 M.Ed, B.Ed
📅 تجربہ: 20+ سال

Principal:
Prof. Abdul Rehman Khan
Experience: 20+ years in education
Contact via school: +92 37 5378045`
  },
  {
    keys:["teacher","استاد","faculty","staff","معلم"],
    reply:`اساتذہ کرام:

👨‍🏫 کل اساتذہ: 45+
✅ تمام اساتذہ MA/MSc تعلیم یافتہ
✅ تجربہ کار اور پیشہ ور

مضامین کے اساتذہ:
• ریاضی، سائنس، انگریزی
• اردو، اسلامیات، کمپیوٹر
• پاکستان اسٹڈیز

Our Teachers:
45+ qualified teachers
All MA/MSc qualified
Experienced and professional`
  },
  {
    keys:["uniform","یونیفارم","dress","لباس","clothes","kapray","کپڑے"],
    reply:`یونیفارم:

👦 لڑکے:
• سفید شلوار قمیض
• سبز واسکٹ
• کالے جوتے
• سفید موزے

👧 لڑکیاں:
• سفید شلوار قمیض
• سبز دوپٹہ
• کالے جوتے

School Uniform:
Boys: White shalwar kameez, green waistcoat, black shoes
Girls: White shalwar kameez, green dupatta, black shoes`
  },
  {
    keys:["holiday","چھٹی","chutti","break","vacation","چھٹیاں","eid","عید","summer","winter","سردی","گرمی"],
    reply:`سالانہ چھٹیاں:

🌙 عید الفطر: 3 دن
🐄 عید الاضحی: 3 دن
🇵🇰 یوم آزادی: 14 اگست
📚 موسم گرما: جولائی 16 - 31
❄️ موسم سرما: 25 دسمبر - 5 جنوری
📖 نصف سال: مئی 1-10

Annual Holidays:
Eid-ul-Fitr: 3 days | Eid-ul-Adha: 3 days
Independence Day: Aug 14
Summer Break: July 16-31
Winter Break: Dec 25 - Jan 5`
  },
  {
    keys:["transport","بس","bus","pick","drop","van","سواری","gaari","گاڑی"],
    reply:`ٹرانسپورٹ سہولت:

🚌 8 بسیں دستیاب ہیں
📍 شہر کے تمام علاقوں میں
💰 فیس: Rs. 800/month
✅ تجربہ کار ڈرائیور
✅ GPS ٹریکنگ

ٹرانسپورٹ کے لیے رابطہ:
📞 +92 37 5378045
📱 +92 345 2247258

Transport Service:
8 buses available, all city areas
Fee: Rs.800/month
Contact: +92 37 5378045`
  },
  {
    keys:["result","نتیجہ","exam","امتحان","marks","نمبر","test","pass","fail","grade"],
    reply:`امتحانات اور نتائج:

📝 ماہانہ ٹیسٹ: ہر مہینے
📋 نصف سالانہ: مئی 2025
📋 سالانہ: جولائی 2025

گریڈ سسٹم:
A+ = 90-100% | A = 80-89%
B+ = 70-79% | B = 60-69%
C = 50-59% | F = Below 50%

نتائج کے لیے رابطہ:
📞 +92 37 5378045

Exams Schedule:
Monthly Tests: Every month
Mid-Term: May 2025
Annual: July 2025
Contact for results: +92 37 5378045`
  },
  {
    keys:["facility","سہولت","lab","library","ground","mosque","computer lab","science lab","لائبریری","مسجد"],
    reply:`اسکول کی سہولیات:

🖥️ کمپیوٹر لیب: 30 کمپیوٹر
🔬 سائنس لیب: مکمل لیس
📚 لائبریری: 2,500+ کتابیں
🕌 مسجد: روزانہ نماز
⚽ کھیل کا میدان: کرکٹ، فٹبال
🚌 ٹرانسپورٹ: 8 بسیں

School Facilities:
Computer Lab (30 PCs), Science Lab
Library (2500+ books), Mosque
Sports Ground, Transport (8 buses)`
  },
  {
    keys:["about","متعلق","history","تاریخ","founded","قائم","information","معلومات","school info","paragon"],
    reply:`پیراگون اسلامک اسکول کے بارے میں:

🏫 نام: Paragon Islamic School
📅 قائم: 2005
👨‍💼 پرنسپل: Prof. Abdul Rehman Khan
👨‍🎓 طلبہ: 1,200+
👨‍🏫 اساتذہ: 45+
📍 مقام: ڈیرہ اسماعیل خان، کے پی کے
🎯 جماعتیں: Play Group تا Class 8
✅ کامیابی کی شرح: 98%

About Paragon Islamic School:
Established: 2005 | Students: 1,200+
Teachers: 45+ | Pass Rate: 98%
Location: Dera Ismail Khan, KPK
Classes: Play Group to Class 8`
  },
  {
    keys:["math","ریاضی","mathematics","addition","subtraction","multiply","divide","fraction","algebra","geometry"],
    reply:`ریاضی میں مدد:

میں آپ کی ریاضی میں مدد کر سکتا ہوں!
کون سی جماعت اور کون سا ٹاپک ہے؟

مثلاً:
• جمع، تفریق، ضرب، تقسیم
• کسر (Fractions)
• الجبرا
• جیومیٹری
• مسائل حل کرنا

Math Help Available!
Which class and which topic?
I can help with:
• Basic operations, Fractions
• Algebra, Geometry
• Problem solving

Please share your specific question!`
  },
  {
    keys:["science","سائنس","biology","physics","chemistry","photosynthesis","cell","plant","animal","human body"],
    reply:`سائنس میں مدد:

میں سائنس کے سوالات میں مدد کر سکتا ہوں!

موضوعات جن میں مدد مل سکتی ہے:
• فوٹوسنتھیسس (Photosynthesis)
• خلیہ (Cell)
• نظام ہضم (Digestive System)
• آبی چکر (Water Cycle)
• فزکس کے اصول
• کیمیاء کے تجربات

Science Help Available!
Topics: Photosynthesis, Cells, 
Human Body, Water Cycle,
Physics concepts, Chemistry basics

Please ask your specific question!`
  },
  {
    keys:["english","انگریزی","grammar","essay","paragraph","story","writing","spelling","vocabulary"],
    reply:`انگریزی میں مدد:

میں انگریزی میں مدد کر سکتا ہوں!

• گرامر (Grammar)
• مضمون لکھنا (Essay Writing)
• پیراگراف (Paragraph)
• کہانی (Story Writing)
• ہجے (Spelling)
• الفاظ (Vocabulary)

English Help:
I can help with Grammar, Essays,
Paragraphs, Stories, Spelling,
and Vocabulary!

Please share what you need help with!`
  },
  {
    keys:["islamiat","اسلامیات","quran","قرآن","hadith","حدیث","namaz","نماز","prayer","islam","islamic"],
    reply:`اسلامیات میں مدد:

میں اسلامیات میں مدد کر سکتا ہوں!

• قرآن پاک کی آیات
• احادیث مبارکہ
• نماز کا طریقہ
• اسلامی تاریخ
• ارکان اسلام
• اخلاق اسلامی

Islamiat Help:
Quran, Hadith, Namaz, 
Islamic History, Pillars of Islam

Please ask your specific question!
اپنا سوال پوچھیں!`
  },
  {
    keys:["study","پڑھائی","plan","schedule","تیاری","preparation","tips","exam tips","کیسے پڑھیں"],
    reply:`مطالعے کا منصوبہ:

📚 روزانہ مطالعے کا شیڈول:

⏰ 8:00-2:00 — اسکول
⏰ 3:00-4:00 — آرام
⏰ 4:00-6:00 — ہوم ورک
⏰ 6:30-7:00 — نماز مغرب
⏰ 7:00-9:00 — مطالعہ
⏰ 9:00 — عشاء + سونا

مطالعے کے ٹپس:
✅ ہر روز پڑھیں
✅ نوٹس بنائیں
✅ سوال کریں
✅ دہرائیں

Study Plan Tips:
✅ Study daily, make notes
✅ Ask questions, revise daily
✅ Sleep 8 hours, eat healthy`
  },
];

function getAIReply(question) {
  const q = question.toLowerCase().trim();
  for (const item of AI_KB) {
    if (item.keys.some(k => q.includes(k))) {
      return item.reply;
    }
  }
  return `آپ کے سوال کے لیے شکریہ!

میں ان موضوعات میں مدد کر سکتا ہوں:
• داخلہ • فیس • اوقات • رابطہ
• جماعتیں • مضامین • یونیفارم
• چھٹیاں • ٹرانسپورٹ • امتحانات
• ریاضی • سائنس • انگریزی • اسلامیات

براہ کرم دوبارہ پوچھیں یا رابطہ کریں:
📞 +92 37 5378045
📱 WhatsApp: +92 345 2247258

Thank you for your question!
I can help with: Admission, Fees, 
Timings, Classes, Subjects, Homework
Please rephrase or contact us:
📞 +92 37 5378045`;
}

// ── UI ATOMS ──────────────────────────────────────────
function Btn({children,onClick,variant="primary",size="md",disabled,full,style:s={}}){
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,fontWeight:600,cursor:disabled?"not-allowed":"pointer",border:"1.5px solid transparent",borderRadius:6,fontFamily:"inherit",opacity:disabled?.55:1,whiteSpace:"nowrap",width:full?"100%":"auto",transition:"opacity .15s"};
  const sz={sm:{padding:"4px 12px",fontSize:11},md:{padding:"8px 18px",fontSize:12},lg:{padding:"11px 26px",fontSize:14}};
  const v={primary:{background:C.primary,color:"#fff",borderColor:C.primary},secondary:{background:"transparent",color:C.primary,borderColor:C.primary},danger:{background:C.danger,color:"#fff",borderColor:C.danger},ghost:{background:"transparent",color:C.textMd,borderColor:C.border},gold:{background:C.gold,color:"#fff",borderColor:C.gold},success:{background:C.success,color:"#fff",borderColor:C.success}};
  return <button onClick={onClick} disabled={disabled} style={{...base,...sz[size],...v[variant],...s}}>{children}</button>;
}
function Badge({label,color="gray"}){
  const m={green:[C.successBg,C.success],red:[C.dangerBg,C.danger],yellow:[C.warnBg,C.warn],blue:[C.infoBg,C.info],gray:["#f3f4f6","#374151"],gold:["#fdf6e3",C.gold]};
  const [bg,fg]=m[color]||m.gray;
  return <span style={{background:bg,color:fg,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>;
}
function Card({children,style:s={},onClick}){return <div onClick={onClick} style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,boxShadow:C.shadow,...s}}>{children}</div>;}
function StatCard({label,value,sub,color=C.primary}){
  return <Card style={{padding:"16px 18px",flex:1,minWidth:120,borderTop:`3px solid ${color}`}}>
    <div style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",letterSpacing:.8,marginBottom:6}}>{label}</div>
    <div style={{fontSize:24,fontWeight:800,color,lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:C.textLt,marginTop:4}}>{sub}</div>}
  </Card>;
}
function PageHdr({title,sub,actions}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18,gap:10,flexWrap:"wrap"}}>
    <div><h2 style={{margin:0,fontSize:18,fontWeight:700,color:C.text}}>{title}</h2>{sub&&<p style={{margin:"4px 0 0",fontSize:12,color:C.textMd}}>{sub}</p>}</div>
    {actions&&<div style={{display:"flex",gap:8}}>{actions}</div>}
  </div>;
}
function Table({cols,rows}){
  return <div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{background:C.primaryDk}}>{cols.map(c=><th key={c} style={{padding:"9px 12px",textAlign:"left",fontWeight:600,fontSize:11,color:"#fff",whiteSpace:"nowrap"}}>{c}</th>)}</tr></thead>
      <tbody>{rows.length===0&&<tr><td colSpan={cols.length} style={{padding:32,textAlign:"center",color:C.textMd}}>No records found.</td></tr>}
        {rows.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"#fff":"#fafafa"}} onMouseEnter={e=>e.currentTarget.style.background=C.primaryLt} onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#fafafa"}>{r.map((cell,j)=><td key={j} style={{padding:"9px 12px",verticalAlign:"middle"}}>{cell}</td>)}</tr>)}
      </tbody>
    </table>
  </div>;
}
function Field({label,type="text",value,onChange,options,placeholder,required,error}){
  const s={width:"100%",padding:"8px 11px",border:`1px solid ${error?C.danger:C.border}`,borderRadius:6,fontSize:12,fontFamily:"inherit",color:C.text,background:"#fff",boxSizing:"border-box",outline:"none"};
  return <div style={{marginBottom:13}}>
    {label&&<label style={{display:"block",fontSize:11,fontWeight:700,color:C.textMd,marginBottom:4,textTransform:"uppercase",letterSpacing:.4}}>{label}{required&&<span style={{color:C.danger}}> *</span>}</label>}
    {type==="select"?<select value={value} onChange={e=>onChange(e.target.value)} style={s}>{!required&&<option value="">— Select —</option>}{(options||[]).map(o=><option key={o}>{o}</option>)}</select>
    :type==="textarea"?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} style={{...s,resize:"vertical"}}/>
    :<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required} style={s}/>}
    {error&&<div style={{fontSize:11,color:C.danger,marginTop:3}}>{error}</div>}
  </div>;
}
function Modal({open,onClose,title,children,width=560}){
  if(!open) return null;
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
    <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:width,maxHeight:"90vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.2)"}} onClick={e=>e.stopPropagation()}>
      <div style={{padding:"14px 20px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:1}}>
        <h3 style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{title}</h3>
        <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:"50%",width:26,height:26,cursor:"pointer",fontSize:15,color:C.textMd}}>×</button>
      </div>
      <div style={{padding:"18px 20px"}}>{children}</div>
    </div>
  </div>;
}
function Alert({type="info",msg,onClose}){
  const m={success:[C.successBg,C.success],error:[C.dangerBg,C.danger],warning:[C.warnBg,C.warn],info:[C.infoBg,C.info]};
  const [bg,fg]=m[type]||m.info;
  return <div style={{background:bg,border:`1px solid ${fg}33`,borderRadius:6,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
    <span style={{flex:1,fontSize:12,color:fg,fontWeight:500}}>{msg}</span>
    {onClose&&<button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:fg,fontSize:15}}>×</button>}
  </div>;
}
function Tabs({tabs,active,onChange}){
  return <div style={{display:"flex",gap:2,borderBottom:`1px solid ${C.border}`,marginBottom:16,overflowX:"auto"}}>
    {tabs.map(t=><button key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 16px",background:"none",border:"none",borderBottom:`2px solid ${active===t.id?C.primary:"transparent"}`,color:active===t.id?C.primary:C.textMd,fontWeight:active===t.id?700:500,cursor:"pointer",fontSize:12,whiteSpace:"nowrap",fontFamily:"inherit"}}>{t.label}</button>)}
  </div>;
}

// ── CHAT BUBBLE ───────────────────────────────────────
function ChatBubble({msgs,loading,bottomRef}){
  return <div style={{flex:1,overflowY:"auto",padding:12,background:"#f8fafc",display:"flex",flexDirection:"column",gap:8}}>
    {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
      <div style={{maxWidth:"85%",background:m.role==="user"?`linear-gradient(135deg,${C.primary},${C.primaryDk})`:"#fff",color:m.role==="user"?"#fff":C.text,borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",padding:"10px 13px",fontSize:12,lineHeight:1.7,boxShadow:C.shadow,border:m.role==="user"?"none":`1px solid ${C.border}`,whiteSpace:"pre-wrap"}}>{m.text}</div>
    </div>)}
    {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}>
      <div style={{background:"#fff",borderRadius:"14px 14px 14px 3px",padding:"10px 14px",boxShadow:C.shadow,border:`1px solid ${C.border}`,display:"flex",gap:4,alignItems:"center"}}>
        {[0,1,2].map(d=><div key={d} style={{width:7,height:7,borderRadius:"50%",background:C.primary,opacity:.3+d*.3}}/>)}
      </div>
    </div>}
    <div ref={bottomRef}/>
  </div>;
}

// ── FLOATING AI ───────────────────────────────────────
function FloatingAI(){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:"assistant",text:"السلام علیکم! 😊\nمیں پیراگون اسکول کا AI اسسٹنٹ ہوں۔\nاردو یا انگریزی میں پوچھیں!\n\nAssalam-o-Alaikum!\nI am Paragon School AI Assistant.\nAsk in Urdu or English!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const send=()=>{
    const q=input.trim();
    if(!q||loading) return;
    setInput("");
    setMsgs(prev=>[...prev,{role:"user",text:q}]);
    setLoading(true);
    setTimeout(()=>{
      const reply=getAIReply(q);
      setMsgs(prev=>[...prev,{role:"assistant",text:reply}]);
      setLoading(false);
    },600);
  };

  const QUICK=[
    {l:"داخلہ",q:"admission information"},
    {l:"فیس",q:"fee structure"},
    {l:"اوقات",q:"school timing"},
    {l:"Admission",q:"admission"},
    {l:"Fees",q:"fee"},
    {l:"Contact",q:"contact"},
  ];

  return <>
    <button onClick={()=>setOpen(o=>!o)} style={{position:"fixed",bottom:20,right:20,width:54,height:54,borderRadius:"50%",background:`linear-gradient(135deg,${C.primaryDk},${C.primary})`,border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(26,92,56,.5)",zIndex:8000,color:"#fff",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {open?"✕":"💬"}
    </button>
    {open&&<div style={{position:"fixed",bottom:84,right:20,width:340,height:520,background:"#fff",borderRadius:16,boxShadow:"0 8px 40px rgba(0,0,0,.18)",zIndex:8000,display:"flex",flexDirection:"column",overflow:"hidden",border:`1px solid ${C.border}`}}>
      <div style={{background:`linear-gradient(135deg,${C.primaryDk},${C.primary})`,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>AI</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Paragon AI Assistant</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>اردو + English • Online</div>
        </div>
        <button onClick={()=>setMsgs([{role:"assistant",text:"Chat clear ho gaya!\nDobara poochh saktay hain!"}])} style={{background:"none",border:"none",color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:11}}>Clear</button>
      </div>
      <div style={{display:"flex",gap:4,padding:"6px 10px",background:"#f0f4f8",overflowX:"auto",flexShrink:0}}>
        {QUICK.map((q,i)=><button key={i} onClick={()=>{setInput(q.q);}} style={{padding:"3px 10px",borderRadius:12,border:`1px solid ${C.border}`,background:"#fff",cursor:"pointer",fontSize:10,color:C.primary,fontFamily:"inherit",whiteSpace:"nowrap",fontWeight:600}}>{q.l}</button>)}
      </div>
      <ChatBubble msgs={msgs} loading={loading} bottomRef={ref}/>
      <div style={{padding:"8px 10px",borderTop:`1px solid ${C.border}`,background:"#fff",display:"flex",gap:8,flexShrink:0}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Urdu ya English mein likhein..." rows={2} style={{flex:1,padding:"7px 10px",border:`1px solid ${C.border}`,borderRadius:10,fontSize:12,fontFamily:"inherit",resize:"none",outline:"none"}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{width:36,height:36,borderRadius:"50%",border:"none",background:loading||!input.trim()?C.border:`linear-gradient(135deg,${C.primary},${C.primaryDk})`,cursor:loading||!input.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,alignSelf:"flex-end"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>}
  </>;
}

// ── PUBLIC WEBSITE ────────────────────────────────────
function Website(){
  const [page,setPage]=useState("home");
  const [form,setForm]=useState({name:"",father:"",cls:"",contact:"",gender:""});
  const [sent,setSent]=useState(false);
  const [errs,setErrs]=useState({});
  const nav=[{id:"home",l:"Home"},{id:"about",l:"About"},{id:"academics",l:"Academics"},{id:"admissions",l:"Admissions"},{id:"contact",l:"Contact"}];
  const HDR={background:`linear-gradient(145deg,${C.primaryDk},${C.primary})`};
  const validate=()=>{const e={};if(!form.name.trim())e.name="Required";if(!form.father.trim())e.father="Required";if(!form.cls)e.cls="Required";if(!form.contact.trim())e.contact="Required";setErrs(e);return Object.keys(e).length===0;};
  return <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100%",background:"#fff"}}>
    <div style={{background:C.primaryDk,color:"rgba(255,255,255,.6)",fontSize:11,padding:"5px 20px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
      <span>{SCHOOL.hours}</span>
      <div style={{display:"flex",gap:16}}>
        <a href={"tel:"+SCHOOL.phone} style={{color:"rgba(255,255,255,.6)",textDecoration:"none"}}>{SCHOOL.phone}</a>
        <a href={"mailto:"+SCHOOL.email} style={{color:"rgba(255,255,255,.6)",textDecoration:"none"}}>{SCHOOL.email}</a>
      </div>
    </div>
    <div style={{...HDR,padding:"12px 20px",display:"flex",alignItems:"center",gap:12}}>
      <div style={{width:46,height:46,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:900,color:"#fff",flexShrink:0}}>P</div>
      <div style={{flex:1}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{SCHOOL.name}</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>Excellence in Education — Rooted in Islamic Values</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <a href={"https://wa.me/"+SCHOOL.wa.replace(/\D/g,"")} target="_blank" rel="noopener" style={{background:"#25d366",color:"#fff",padding:"6px 14px",borderRadius:6,textDecoration:"none",fontSize:11,fontWeight:700}}>WhatsApp</a>
        <a href={"tel:"+SCHOOL.phone} style={{background:C.gold,color:"#fff",padding:"6px 14px",borderRadius:6,textDecoration:"none",fontSize:11,fontWeight:700}}>Call Now</a>
      </div>
    </div>
    <nav style={{background:C.primary,display:"flex",padding:"0 10px",overflowX:"auto",borderBottom:"3px solid "+C.gold}}>
      {nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)} style={{background:"none",color:page===n.id?C.gold:"rgba(255,255,255,.8)",border:"none",borderBottom:"3px solid "+(page===n.id?C.gold:"transparent"),padding:"10px 14px",cursor:"pointer",fontWeight:page===n.id?700:500,fontSize:12,whiteSpace:"nowrap",marginBottom:-3,fontFamily:"inherit"}}>{n.l}</button>)}
      <button onClick={()=>setPage("admissions")} style={{marginLeft:"auto",background:C.gold,color:"#fff",border:"none",padding:"6px 16px",cursor:"pointer",fontWeight:700,fontSize:12,borderRadius:6,margin:"7px 0 7px auto",fontFamily:"inherit"}}>Apply Now</button>
    </nav>
    {page==="home"&&<>
      <div style={{...HDR,padding:"60px 36px",textAlign:"center"}}>
        <div style={{maxWidth:650,margin:"0 auto"}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:8}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
          <h1 style={{fontSize:34,fontWeight:900,color:"#fff",margin:"0 0 12px"}}>Welcome to {SCHOOL.name}</h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,.8)",marginBottom:24,lineHeight:1.8}}>Nurturing Young Minds with Knowledge, Faith and Character since {SCHOOL.founded}</p>
          <div style={{background:C.gold,display:"inline-block",borderRadius:6,padding:"8px 20px",color:"#fff",fontWeight:700,fontSize:12,marginBottom:22}}>New Admissions Open — Session 2025-26</div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn variant="gold" size="lg" onClick={()=>setPage("admissions")}>Apply for Admission</Btn>
            <Btn size="lg" style={{background:"rgba(255,255,255,.12)",color:"#fff",borderColor:"rgba(255,255,255,.4)"}} onClick={()=>setPage("about")}>Learn More</Btn>
          </div>
        </div>
      </div>
      <div style={{display:"flex",background:C.primaryDk,color:"#fff",textAlign:"center"}}>
        {[["1,200+","Students"],["45+","Teachers"],["20","Years"],["98%","Pass Rate"]].map(([v,l])=>(
          <div key={l} style={{flex:1,padding:"18px 6px",borderRight:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{fontSize:24,fontWeight:900,color:C.gold}}>{v}</div>
            <div style={{fontSize:11,opacity:.6,marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"44px 36px",background:"#f8fafc"}}>
        <h2 style={{textAlign:"center",fontSize:22,fontWeight:800,color:C.text,margin:"0 0 24px"}}>Our Campus</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
          {[["Modern Classrooms","Smart board equipped"],["Computer Lab","30 workstations"],["Science Lab","Fully equipped"],["Library","2,500+ books"],["Prayer Hall","Daily prayers"],["Sports Ground","Cricket & football"]].map(([t,d])=>(
            <Card key={t} style={{padding:16,borderTop:"3px solid "+C.primary,textAlign:"center"}}>
              <div style={{fontWeight:700,color:C.text,fontSize:12,marginBottom:4}}>{t}</div>
              <div style={{fontSize:11,color:C.textMd,lineHeight:1.5}}>{d}</div>
            </Card>
          ))}
        </div>
      </div>
      <div style={{padding:"40px 36px",background:"#fff"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",gap:24,flexWrap:"wrap",alignItems:"flex-start"}}>
          <div style={{width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,"+C.primary+","+C.primaryDk+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:"#fff",fontWeight:900,flexShrink:0}}>P</div>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontSize:10,color:C.primary,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Principal's Message</div>
            <p style={{color:C.textMd,lineHeight:1.9,fontSize:13,margin:"0 0 8px"}}>At {SCHOOL.name}, we believe true education combines academic excellence with strong Islamic values.</p>
            <div style={{fontStyle:"italic",color:C.primary,fontWeight:700,fontSize:12}}>— {SCHOOL.principal}, Principal</div>
          </div>
        </div>
      </div>
      <div style={{...HDR,padding:"36px"}}>
        <div style={{textAlign:"center",marginBottom:20}}><h2 style={{fontSize:20,fontWeight:800,color:"#fff",margin:0}}>Contact Us</h2></div>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <a href={"tel:"+SCHOOL.phone} style={{background:C.gold,color:"#fff",padding:"11px 22px",borderRadius:6,textDecoration:"none",fontWeight:700,fontSize:12,textAlign:"center"}}>{SCHOOL.phone}<br/><span style={{fontWeight:400,opacity:.85,fontSize:10}}>Call Now</span></a>
          <a href={"https://wa.me/"+SCHOOL.wa.replace(/\D/g,"")} target="_blank" rel="noopener" style={{background:"#25d366",color:"#fff",padding:"11px 22px",borderRadius:6,textDecoration:"none",fontWeight:700,fontSize:12,textAlign:"center"}}>{SCHOOL.wa}<br/><span style={{fontWeight:400,opacity:.85,fontSize:10}}>WhatsApp</span></a>
        </div>
      </div>
      <footer style={{background:"#0a0f14",color:"#666",padding:"36px 36px 16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:24,marginBottom:28}}>
          <div><div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:8}}>{SCHOOL.name}</div><p style={{fontSize:11,lineHeight:1.8,margin:"0 0 6px"}}>{SCHOOL.address}</p><p style={{fontSize:11,margin:"0 0 3px"}}>{SCHOOL.phone}</p><p style={{fontSize:11}}>{SCHOOL.email}</p></div>
          <div><div style={{fontSize:11,fontWeight:700,color:"#bbb",marginBottom:8}}>Quick Links</div>{nav.map(n=><div key={n.id} style={{marginBottom:5}}><button onClick={()=>setPage(n.id)} style={{background:"none",border:"none",color:"#666",fontSize:11,cursor:"pointer",fontFamily:"inherit",padding:0}}>{n.l}</button></div>)}</div>
          <div><div style={{fontSize:11,fontWeight:700,color:"#bbb",marginBottom:8}}>Contact</div><div style={{fontSize:11,marginBottom:4}}>Mobile: {SCHOOL.phone}</div><div style={{fontSize:11,marginBottom:4}}>WhatsApp: {SCHOOL.wa}</div><div style={{fontSize:11}}>{SCHOOL.email}</div></div>
          <div><div style={{fontSize:11,fontWeight:700,color:"#bbb",marginBottom:8}}>Hours</div><div style={{fontSize:11}}>{SCHOOL.hours}</div></div>
        </div>
        <div style={{borderTop:"1px solid #1a1f28",paddingTop:14,textAlign:"center",fontSize:11}}>© {new Date().getFullYear()} {SCHOOL.name}. All Rights Reserved.</div>
      </footer>
    </>}
    {page==="about"&&<div style={{padding:"44px 36px",maxWidth:860,margin:"0 auto"}}>
      <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 22px"}}>About {SCHOOL.name}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:22}}>
        {[["Founded",SCHOOL.founded],["Location","Dera Ismail Khan, KPK"],["Principal",SCHOOL.principal],["Classes","Play Group to Class 8"],["Students","1,200+"],["Staff","62 Members"]].map(([k,v])=>(
          <div key={k} style={{borderLeft:"3px solid "+C.primary,paddingLeft:10}}>
            <div style={{fontSize:10,color:C.textMd,fontWeight:700,textTransform:"uppercase"}}>{k}</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginTop:2}}>{v}</div>
          </div>
        ))}
      </div>
    </div>}
    {page==="academics"&&<div style={{padding:"44px 36px"}}>
      <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 22px"}}>Academic Programs</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
        {CLASSES.map(cls=>(
          <Card key={cls} style={{padding:18,borderTop:"3px solid "+C.primary}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{cls}</div>
            <div style={{fontSize:11,color:C.textMd}}>Urdu, English, Math, Science, Islamiat</div>
          </Card>
        ))}
      </div>
    </div>}
    {page==="admissions"&&<div style={{padding:"44px 36px",maxWidth:700,margin:"0 auto"}}>
      <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 6px"}}>Online Admission Form</h2>
      <p style={{color:C.textMd,marginBottom:22,fontSize:13}}>Session 2025-26 | Play Group to Class 8</p>
      {sent?<Card style={{padding:32,textAlign:"center"}}>
        <div style={{color:C.success,fontSize:32,marginBottom:10}}>✓</div>
        <h3 style={{color:C.success,margin:"0 0 8px"}}>Application Submitted!</h3>
        <p style={{color:C.textMd,fontSize:13}}>We will contact you within 2 working days.</p>
        <Btn style={{marginTop:12}} onClick={()=>{setSent(false);setForm({name:"",father:"",cls:"",contact:"",gender:""});}}>New Application</Btn>
      </Card>:
      <Card style={{padding:24}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <Field label="Student Name" value={form.name} onChange={v=>setForm({...form,name:v})} required error={errs.name}/>
          <Field label="Father's Name" value={form.father} onChange={v=>setForm({...form,father:v})} required error={errs.father}/>
          <Field label="Class" type="select" value={form.cls} onChange={v=>setForm({...form,cls:v})} options={CLASSES} required error={errs.cls}/>
          <Field label="Gender" type="select" value={form.gender} onChange={v=>setForm({...form,gender:v})} options={["Male","Female"]}/>
          <Field label="Contact Number" value={form.contact} onChange={v=>setForm({...form,contact:v})} placeholder="03XXXXXXXXX" required error={errs.contact}/>
        </div>
        {Object.keys(errs).length>0&&<Alert type="error" msg="Please fill all required fields."/>}
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <Btn size="lg" onClick={()=>{if(validate())setSent(true);}}>Submit Application</Btn>
          <a href={"https://wa.me/"+SCHOOL.wa.replace(/\D/g,"")} target="_blank" rel="noopener" style={{background:"#25d366",color:"#fff",padding:"11px 18px",borderRadius:6,textDecoration:"none",fontSize:12,fontWeight:700,display:"flex",alignItems:"center"}}>Apply on WhatsApp</a>
        </div>
      </Card>}
    </div>}
    {page==="contact"&&<div style={{padding:"44px 36px",maxWidth:860,margin:"0 auto"}}>
      <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 20px"}}>Contact Us</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10}}>
        {[[SCHOOL.phone,"Mobile","tel:"+SCHOOL.phone],[SCHOOL.wa,"WhatsApp","https://wa.me/"+SCHOOL.wa.replace(/\D/g,"")],[SCHOOL.email,"Email","mailto:"+SCHOOL.email],[SCHOOL.address,"Address","#"]].map(([val,label,href])=>(
          <a key={label} href={href} target={href.startsWith("http")?"_blank":"_self"} rel="noopener" style={{textDecoration:"none"}}>
            <Card style={{padding:14,textAlign:"center"}}><div style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",marginBottom:4}}>{label}</div><div style={{fontSize:11,fontWeight:600,color:C.primary,lineHeight:1.5}}>{val}</div></Card>
          </a>
        ))}
      </div>
    </div>}
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────
function Dashboard({students,fees,attendance}){
  const att=attendance[TODAY]||{};
  const present=Object.values(att).filter(v=>v==="Present").length;
  const absent=Object.values(att).filter(v=>v==="Absent").length;
  const collected=fees.filter(f=>f.status==="Paid").reduce((a,f)=>a+f.amount,0);
  const pending=fees.filter(f=>f.status==="Unpaid").reduce((a,f)=>a+f.amount,0);
  return <div>
    <PageHdr title="Admin Dashboard" sub={new Date().toLocaleDateString("en-PK",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}/>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Total Students" value={students.length} color={C.primary}/>
      <StatCard label="Present Today" value={present} color={C.success} sub={Math.round(present/(students.length||1)*100)+"%"}/>
      <StatCard label="Absent Today" value={absent} color={C.danger}/>
      <StatCard label="Fee Collected" value={"Rs."+(collected/1000).toFixed(0)+"K"} color={C.gold} sub="June 2025"/>
      <StatCard label="Fee Pending" value={"Rs."+(pending/1000).toFixed(0)+"K"} color={C.danger} sub={fees.filter(f=>f.status==="Unpaid").length+" students"}/>
      <StatCard label="Total Staff" value="62" color={C.info}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:8}}>
      {CLASSES.map(cls=>{const cnt=students.filter(s=>s.cls===cls).length;return <Card key={cls} style={{padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,color:C.text,fontSize:12}}>{cls}</div><div style={{fontSize:10,color:C.textMd}}>{cnt} students</div></div><div style={{width:30,height:30,borderRadius:"50%",background:C.primaryLt,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:C.primary,fontSize:12}}>{cnt}</div></Card>;})}
    </div>
  </div>;
}

// ── STUDENTS ──────────────────────────────────────────
const INIT_STUDENTS=[
  {id:"S001",roll:"5A-01",name:"Ahmed Ali Khan",father:"Muhammad Ali",cls:"Class 5",section:"A",contact:"03001234567",gender:"Male",dob:"2013-03-12",admDate:"2020-04-01",status:"Active",address:"Street 4, DIK"},
  {id:"S002",roll:"3B-01",name:"Fatima Noor",father:"Noor Ahmad",cls:"Class 3",section:"B",contact:"03119876543",gender:"Female",dob:"2015-06-22",admDate:"2022-04-01",status:"Active",address:"Circular Road, DIK"},
  {id:"S003",roll:"7A-01",name:"Usman Tariq",father:"Tariq Mehmood",cls:"Class 7",section:"A",contact:"03451122334",gender:"Male",dob:"2011-11-05",admDate:"2018-04-01",status:"Active",address:"Model Town, DIK"},
  {id:"S004",roll:"6A-01",name:"Hassan Raza",father:"Raza Hussain",cls:"Class 6",section:"A",contact:"03001112222",gender:"Male",dob:"2012-01-30",admDate:"2019-04-01",status:"Active",address:"City Saddar, DIK"},
  {id:"S005",roll:"5A-02",name:"Sara Imran",father:"Imran Khan",cls:"Class 5",section:"A",contact:"03112233445",gender:"Female",dob:"2013-07-15",admDate:"2020-04-01",status:"Active",address:"Jamia Chowk, DIK"},
  {id:"S006",roll:"8A-01",name:"Maryam Sajid",father:"Sajid Mehmood",cls:"Class 8",section:"A",contact:"03331122334",gender:"Female",dob:"2010-09-05",admDate:"2017-04-01",status:"Active",address:"G.T. Road, DIK"},
];

function Students({students,setStudents}){
  const [sel,setSel]=useState(null);
  const [modal,setModal]=useState(false);
  const [search,setSearch]=useState("");
  const [filterCls,setFilterCls]=useState("");
  const [alert,setAlert]=useState(null);
  const [form,setForm]=useState({name:"",father:"",cls:"Class 1",section:"A",contact:"",gender:"Male",dob:"",address:"",admDate:TODAY,status:"Active"});
  const [errs,setErrs]=useState({});
  const filtered=useMemo(()=>students.filter(s=>(!filterCls||s.cls===filterCls)&&(!search||(s.name+s.father+s.id).toLowerCase().includes(search.toLowerCase()))),[students,filterCls,search]);
  const validate=()=>{const e={};if(!form.name.trim())e.name="Required";if(!form.father.trim())e.father="Required";if(!form.contact.trim())e.contact="Required";setErrs(e);return Object.keys(e).length===0;};
  const save=()=>{
    if(!validate()) return;
    const id="S"+String(students.length+1).padStart(3,"0");
    const cnt=students.filter(s=>s.cls===form.cls&&s.section===form.section).length+1;
    const roll=form.cls.replace(/\D/g,"").padStart(2,"0")+form.section+"-"+String(cnt).padStart(2,"0");
    setStudents(prev=>[...prev,{...form,id,roll}]);
    setModal(false);setErrs({});
    setAlert({type:"success",msg:"Student "+form.name+" registered! ID: "+id});
    setForm({name:"",father:"",cls:"Class 1",section:"A",contact:"",gender:"Male",dob:"",address:"",admDate:TODAY,status:"Active"});
  };
  if(sel) return <div>
    <Btn variant="ghost" size="sm" onClick={()=>setSel(null)} style={{marginBottom:14}}>Back</Btn>
    <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:14}}>
      <Card style={{padding:20,textAlign:"center"}}>
        <div style={{width:70,height:70,borderRadius:"50%",background:"linear-gradient(135deg,"+C.primary+","+C.primaryDk+")",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:"#fff",fontWeight:900}}>{sel.name[0]}</div>
        <div style={{fontWeight:800,color:C.text,fontSize:14}}>{sel.name}</div>
        <div style={{fontSize:11,color:C.textMd}}>{sel.id}</div>
        <div style={{marginTop:8}}><Badge label={sel.status} color="green"/></div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:14}}>
          <Btn size="sm" full>Edit</Btn>
          <Btn size="sm" variant="danger" full onClick={()=>{setStudents(p=>p.filter(s=>s.id!==sel.id));setSel(null);}}>Delete</Btn>
        </div>
      </Card>
      <Card style={{padding:20}}>
        <h3 style={{margin:"0 0 14px",fontSize:13,fontWeight:700,color:C.primary}}>Student Profile</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 20px"}}>
          {[["ID",sel.id],["Roll",sel.roll],["Name",sel.name],["Father",sel.father],["Gender",sel.gender],["DOB",sel.dob],["Class",sel.cls],["Section","Section "+sel.section],["Contact",sel.contact],["Address",sel.address],["Admission",sel.admDate],["Status",sel.status]].map(([k,v])=>(
            <div key={k} style={{paddingBottom:7,borderBottom:"1px solid "+C.border}}>
              <div style={{fontSize:10,color:C.textMd,fontWeight:700,textTransform:"uppercase"}}>{k}</div>
              <div style={{fontSize:12,color:C.text,fontWeight:600,marginTop:2}}>{v||"—"}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>;
  return <div>
    <PageHdr title="Student Management" sub={filtered.length+" students"} actions={<Btn onClick={()=>setModal(true)}>+ Add Student</Btn>}/>
    {alert&&<Alert type={alert.type} msg={alert.msg} onClose={()=>setAlert(null)}/>}
    <Card style={{padding:"10px 12px",marginBottom:10}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:150,padding:"7px 11px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit",outline:"none"}}/>
        <select value={filterCls} onChange={e=>setFilterCls(e.target.value)} style={{padding:"7px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit"}}>
          <option value="">All Classes</option>{CLASSES.map(c=><option key={c}>{c}</option>)}
        </select>
        {(search||filterCls)&&<Btn variant="ghost" size="sm" onClick={()=>{setSearch("");setFilterCls("");}}>Clear</Btn>}
      </div>
    </Card>
    <Card style={{overflow:"hidden"}}>
      <Table cols={["ID","Roll","Name","Father","Class","Sec","Contact","Status","Action"]}
        rows={filtered.map(s=>[
          <span style={{fontFamily:"monospace",fontSize:10,color:C.textMd}}>{s.id}</span>,
          <span style={{fontFamily:"monospace",fontSize:11}}>{s.roll}</span>,
          <span style={{fontWeight:700}}>{s.name}</span>,
          s.father,s.cls,<Badge label={"Sec "+s.section} color="blue"/>,
          <span style={{fontSize:11}}>{s.contact}</span>,
          <Badge label={s.status} color="green"/>,
          <div style={{display:"flex",gap:4}}><Btn size="sm" onClick={e=>{e.stopPropagation();setSel(s);}}>View</Btn><Btn size="sm" variant="danger" onClick={e=>{e.stopPropagation();setStudents(p=>p.filter(x=>x.id!==s.id));}}>Del</Btn></div>
        ])}/>
    </Card>
    <Modal open={modal} onClose={()=>setModal(false)} title="Register New Student" width={580}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
        <Field label="Student Name" value={form.name} onChange={v=>setForm({...form,name:v})} required error={errs.name}/>
        <Field label="Father's Name" value={form.father} onChange={v=>setForm({...form,father:v})} required error={errs.father}/>
        <Field label="Gender" type="select" value={form.gender} onChange={v=>setForm({...form,gender:v})} options={["Male","Female"]}/>
        <Field label="Date of Birth" type="date" value={form.dob} onChange={v=>setForm({...form,dob:v})}/>
        <Field label="Class" type="select" value={form.cls} onChange={v=>setForm({...form,cls:v})} options={CLASSES} required/>
        <Field label="Section" type="select" value={form.section} onChange={v=>setForm({...form,section:v})} options={["A","B","C"]}/>
        <Field label="Contact" value={form.contact} onChange={v=>setForm({...form,contact:v})} placeholder="03XXXXXXXXX" required error={errs.contact}/>
        <Field label="Admission Date" type="date" value={form.admDate} onChange={v=>setForm({...form,admDate:v})}/>
      </div>
      <Field label="Address" type="textarea" value={form.address} onChange={v=>setForm({...form,address:v})}/>
      <div style={{display:"flex",gap:8}}><Btn onClick={save}>Save</Btn><Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn></div>
    </Modal>
  </div>;
}

// ── ATTENDANCE ────────────────────────────────────────
const INIT_ATT={[TODAY]:{S001:"Present",S002:"Absent",S003:"Present",S004:"Late",S005:"Present",S006:"Present"}};

function Attendance({students,attendance,setAttendance}){
  const [cls,setCls]=useState("Class 5");
  const [sec,setSec]=useState("A");
  const [date,setDate]=useState(TODAY);
  const [tab,setTab]=useState("mark");
  const clsStu=useMemo(()=>students.filter(s=>s.cls===cls&&s.section===sec),[students,cls,sec]);
  const dayAtt=attendance[date]||{};
  const mark=(id,st)=>setAttendance(prev=>({...prev,[date]:{...(prev[date]||{}),[id]:st}}));
  const markAll=st=>{const u={};clsStu.forEach(s=>{u[s.id]=st;});setAttendance(prev=>({...prev,[date]:{...(prev[date]||{}),...u}}));};
  const stats={present:clsStu.filter(s=>dayAtt[s.id]==="Present").length,absent:clsStu.filter(s=>dayAtt[s.id]==="Absent").length,late:clsStu.filter(s=>dayAtt[s.id]==="Late").length};
  return <div>
    <PageHdr title="Attendance System"/>
    <Card style={{padding:"12px 14px",marginBottom:12}}>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div style={{flex:1,minWidth:120}}><label style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",display:"block",marginBottom:4}}>Class</label><select value={cls} onChange={e=>setCls(e.target.value)} style={{width:"100%",padding:"7px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit"}}>{CLASSES.map(c=><option key={c}>{c}</option>)}</select></div>
        <div style={{flex:1,minWidth:100}}><label style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",display:"block",marginBottom:4}}>Section</label><select value={sec} onChange={e=>setSec(e.target.value)} style={{width:"100%",padding:"7px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit"}}>{["A","B","C"].map(s=><option key={s}>{s}</option>)}</select></div>
        <div style={{flex:1,minWidth:120}}><label style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",display:"block",marginBottom:4}}>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:"100%",padding:"7px 10px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit"}}/></div>
        <Btn size="sm" variant="success" onClick={()=>markAll("Present")}>All Present</Btn>
        <Btn size="sm" variant="danger" onClick={()=>markAll("Absent")}>All Absent</Btn>
      </div>
    </Card>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
      <StatCard label="Present" value={stats.present} color={C.success}/>
      <StatCard label="Absent" value={stats.absent} color={C.danger}/>
      <StatCard label="Late" value={stats.late} color={C.warn}/>
      <StatCard label="Total" value={clsStu.length} color={C.primary}/>
    </div>
    <Tabs tabs={[{id:"mark",label:"Mark Attendance"},{id:"report",label:"Report"}]} active={tab} onChange={setTab}/>
    {tab==="mark"&&<Card style={{overflow:"hidden"}}>
      {clsStu.length===0?<div style={{padding:32,textAlign:"center",color:C.textMd}}>No students in {cls} Section {sec}</div>:
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:C.primaryDk,color:"#fff"}}>{["Roll","Name","Status","Mark"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",fontSize:11,fontWeight:600}}>{h}</th>)}</tr></thead>
        <tbody>{clsStu.map((s,i)=>{const st=dayAtt[s.id]||"";return <tr key={s.id} style={{borderBottom:"1px solid "+C.border,background:i%2===0?"#fff":"#fafafa"}}>
          <td style={{padding:"8px 12px",fontFamily:"monospace",fontSize:11}}>{s.roll}</td>
          <td style={{padding:"8px 12px",fontWeight:700}}>{s.name}</td>
          <td style={{padding:"8px 12px"}}>{st?<Badge label={st} color={st==="Present"?"green":st==="Absent"?"red":st==="Late"?"yellow":"blue"}/>:<span style={{color:C.textLt,fontSize:11}}>Not marked</span>}</td>
          <td style={{padding:"6px 12px"}}><div style={{display:"flex",gap:5}}>{["Present","Absent","Late","Leave"].map(status=><button key={status} onClick={()=>mark(s.id,status)} style={{padding:"3px 8px",borderRadius:5,border:"1.5px solid "+(st===status?(status==="Present"?C.success:status==="Absent"?C.danger:status==="Late"?C.warn:C.info):C.border),cursor:"pointer",fontSize:10,fontWeight:700,background:st===status?(status==="Present"?C.success:status==="Absent"?C.danger:status==="Late"?C.warn:C.info):"transparent",color:st===status?"#fff":C.textMd,fontFamily:"inherit"}}>{status}</button>)}</div></td>
        </tr>;})}
        </tbody>
      </table>}
    </Card>}
    {tab==="report"&&<Card style={{overflow:"hidden"}}>
      <Table cols={["Student","Roll","Present","Absent","Attendance %","Status"]}
        rows={students.map(s=>{const total=Object.keys(attendance).length||1;const pres=Object.values(attendance).filter(d=>d[s.id]==="Present").length;const pct=Math.round(pres/total*100);return[<span style={{fontWeight:600}}>{s.name}</span>,s.roll,pres,total-pres,<span style={{fontWeight:700,color:pct>=80?C.success:pct>=60?C.warn:C.danger}}>{pct}%</span>,<Badge label={pct>=80?"Regular":"Irregular"} color={pct>=80?"green":"red"}/>];})}/>
    </Card>}
  </div>;
}

// ── FEES ──────────────────────────────────────────────
const INIT_FEES=[
  {id:"F001",studentId:"S001",student:"Ahmed Ali Khan",cls:"Class 5",month:"June 2025",amount:3200,status:"Paid",paidDate:"2025-06-05",method:"JazzCash"},
  {id:"F002",studentId:"S002",student:"Fatima Noor",cls:"Class 3",month:"June 2025",amount:3000,status:"Unpaid",paidDate:null,method:null},
  {id:"F003",studentId:"S003",student:"Usman Tariq",cls:"Class 7",month:"June 2025",amount:3800,status:"Paid",paidDate:"2025-06-03",method:"Cash"},
  {id:"F004",studentId:"S004",student:"Hassan Raza",cls:"Class 6",month:"June 2025",amount:3500,status:"Paid",paidDate:"2025-06-08",method:"EasyPaisa"},
  {id:"F005",studentId:"S005",student:"Sara Imran",cls:"Class 5",month:"June 2025",amount:3200,status:"Unpaid",paidDate:null,method:null},
  {id:"F006",studentId:"S006",student:"Maryam Sajid",cls:"Class 8",month:"June 2025",amount:4000,status:"Paid",paidDate:"2025-06-02",method:"JazzCash"},
];

function Fees({fees,setFees}){
  const [filter,setFilter]=useState("All");
  const [payModal,setPayModal]=useState(null);
  const [method,setMethod]=useState("Cash");
  const [alert,setAlert]=useState(null);
  const collected=fees.filter(f=>f.status==="Paid").reduce((a,f)=>a+f.amount,0);
  const pending=fees.filter(f=>f.status==="Unpaid").reduce((a,f)=>a+f.amount,0);
  const filtered=fees.filter(f=>filter==="All"||f.status===filter);
  const markPaid=()=>{setFees(p=>p.map(f=>f.id===payModal.id?{...f,status:"Paid",paidDate:TODAY,method}:f));setAlert({type:"success",msg:"Fee paid for "+payModal.student});setPayModal(null);};
  return <div>
    <PageHdr title="Fee Management" sub="June 2025"/>
    {alert&&<Alert type={alert.type} msg={alert.msg} onClose={()=>setAlert(null)}/>}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Collected" value={"Rs."+(collected/1000).toFixed(1)+"K"} color={C.success}/>
      <StatCard label="Pending" value={"Rs."+(pending/1000).toFixed(1)+"K"} color={C.danger} sub={fees.filter(f=>f.status==="Unpaid").length+" students"}/>
      <StatCard label="Collection Rate" value={Math.round(collected/(collected+pending||1)*100)+"%"} color={C.gold}/>
    </div>
    <div style={{display:"flex",gap:6,marginBottom:12}}>{["All","Paid","Unpaid"].map(f=><Btn key={f} variant={filter===f?"primary":"ghost"} size="sm" onClick={()=>setFilter(f)}>{f}</Btn>)}</div>
    <Card style={{overflow:"hidden"}}>
      <Table cols={["ID","Student","Class","Month","Amount","Status","Paid On","Method","Action"]}
        rows={filtered.map(f=>[
          <span style={{fontFamily:"monospace",fontSize:10,color:C.textMd}}>{f.id}</span>,
          <span style={{fontWeight:700}}>{f.student}</span>,f.cls,f.month,
          <span style={{fontWeight:700}}>Rs. {f.amount.toLocaleString()}</span>,
          <Badge label={f.status} color={f.status==="Paid"?"green":"red"}/>,
          f.paidDate||"—",f.method?<Badge label={f.method} color="blue"/>:"—",
          f.status==="Unpaid"?<Btn size="sm" onClick={()=>setPayModal(f)}>Mark Paid</Btn>:<Badge label="Cleared" color="green"/>
        ])}/>
    </Card>
    <Modal open={!!payModal} onClose={()=>setPayModal(null)} title="Record Payment" width={400}>
      <div style={{background:C.primaryLt,borderRadius:6,padding:"10px 14px",marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:13}}>{payModal?.student}</div>
        <div style={{fontSize:12,color:C.textMd}}>Rs. {payModal?.amount?.toLocaleString()}</div>
      </div>
      <Field label="Payment Method" type="select" value={method} onChange={setMethod} options={["Cash","JazzCash","EasyPaisa","Bank Transfer","Cheque"]}/>
      <div style={{display:"flex",gap:8}}><Btn onClick={markPaid}>Confirm</Btn><Btn variant="ghost" onClick={()=>setPayModal(null)}>Cancel</Btn></div>
    </Modal>
  </div>;
}

// ── EXAMS ─────────────────────────────────────────────
function Exams(){
  const results=[
    {student:"Ahmed Ali Khan",cls:"Class 5",math:88,eng:75,sci:90,urdu:82,isl:95,total:430},
    {student:"Hassan Raza",cls:"Class 6",math:92,eng:85,sci:88,urdu:79,isl:90,total:434},
    {student:"Sara Imran",cls:"Class 5",math:94,eng:90,sci:92,urdu:88,isl:97,total:461},
    {student:"Maryam Sajid",cls:"Class 8",math:78,eng:82,sci:80,urdu:75,isl:92,total:407},
    {student:"Usman Tariq",cls:"Class 7",math:70,eng:68,sci:74,urdu:80,isl:85,total:377},
  ];
  return <div>
    <PageHdr title="Exams and Results" sub="Mid-Term 2025" actions={<Btn>+ Add Result</Btn>}/>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Students" value={results.length} color={C.primary}/>
      <StatCard label="Avg Score" value="87%" color={C.success}/>
      <StatCard label="Pass Rate" value="100%" color={C.gold}/>
    </div>
    <Card style={{overflow:"hidden"}}>
      <Table cols={["Student","Class","Math","English","Science","Urdu","Islamiat","Total","Percent","Grade"]}
        rows={results.map(r=>{const pct=Math.round(r.total/500*100);const grade=pct>=90?"A+":pct>=80?"A":pct>=70?"B+":pct>=60?"B":"C";return[<span style={{fontWeight:700}}>{r.student}</span>,r.cls,r.math,r.eng,r.sci,r.urdu,r.isl,<span style={{fontWeight:700}}>{r.total}</span>,<span style={{fontWeight:700,color:pct>=80?C.success:pct>=60?C.warn:C.danger}}>{pct}%</span>,<Badge label={grade} color={grade.startsWith("A")?"green":"blue"}/>];})}/>
    </Card>
  </div>;
}

// ── TEACHERS ──────────────────────────────────────────
function Teachers(){
  const list=[
    {id:"T001",name:"Khalid Mahmood",subject:"Mathematics",cls:"Class 5",qual:"M.Sc Math",exp:"8 yrs",salary:35000},
    {id:"T002",name:"Saira Bashir",subject:"English",cls:"Class 3",qual:"M.A English",exp:"5 yrs",salary:30000},
    {id:"T003",name:"Imran Qureshi",subject:"Physics",cls:"Class 7",qual:"M.Sc Physics",exp:"10 yrs",salary:38000},
    {id:"T004",name:"Rukhsana Bibi",subject:"Urdu",cls:"Class 2",qual:"M.A Urdu",exp:"12 yrs",salary:32000},
  ];
  return <div>
    <PageHdr title="Teacher Management" actions={<Btn>+ Add Teacher</Btn>}/>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Total" value="45" color={C.primary}/><StatCard label="Present" value="42" color={C.success}/><StatCard label="Payroll" value="Rs.15L" color={C.gold}/>
    </div>
    <Card style={{overflow:"hidden"}}>
      <Table cols={["ID","Name","Subject","Class","Qualification","Exp","Salary","Action"]}
        rows={list.map(t=>[
          <span style={{fontFamily:"monospace",fontSize:10,color:C.textMd}}>{t.id}</span>,
          <span style={{fontWeight:700}}>{t.name}</span>,
          <Badge label={t.subject} color="blue"/>,t.cls,t.qual,t.exp,
          <span style={{fontWeight:700}}>Rs. {t.salary.toLocaleString()}</span>,
          <Btn size="sm">View</Btn>
        ])}/>
    </Card>
  </div>;
}

// ── TIMETABLE ─────────────────────────────────────────
function Timetable(){
  const [cls,setCls]=useState("Class 5");
  const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const periods=[{t:"8:00-8:45",l:"Period 1"},{t:"8:45-9:30",l:"Period 2"},{t:"9:30-10:15",l:"Period 3"},{t:"10:15-10:30",l:"Break"},{t:"10:30-11:15",l:"Period 4"},{t:"11:15-12:00",l:"Period 5"},{t:"12:00-12:45",l:"Period 6"}];
  const subjects=["Math","English","Science","Urdu","Islamiat","Computer","Social St."];
  const colors=["#dbeafe","#d1fae5","#fef3c7","#fce7f3","#ede9fe","#cffafe","#fee2e2"];
  const tColors=["#1e40af","#065f46","#92400e","#9d174d","#5b21b6","#155e75","#991b1b"];
  return <div>
    <PageHdr title="Class Timetable" actions={<select value={cls} onChange={e=>setCls(e.target.value)} style={{padding:"7px 12px",border:"1px solid "+C.border,borderRadius:6,fontSize:12,fontFamily:"inherit"}}>{CLASSES.map(c=><option key={c}>{c}</option>)}</select>}/>
    <Card style={{overflow:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:600}}>
        <thead><tr style={{background:C.primaryDk,color:"#fff"}}><th style={{padding:"9px 12px",textAlign:"left",fontWeight:600,minWidth:100}}>Period</th>{days.map(d=><th key={d} style={{padding:"9px 12px",textAlign:"center",fontWeight:600}}>{d}</th>)}</tr></thead>
        <tbody>{periods.map((p,pi)=>(
          <tr key={pi} style={{borderBottom:"1px solid "+C.border,background:p.l==="Break"?"#fffde7":"transparent"}}>
            <td style={{padding:"8px 12px",background:C.bg}}><div style={{fontWeight:700,color:C.text,fontSize:11}}>{p.l}</div><div style={{fontSize:10,color:C.textMd}}>{p.t}</div></td>
            {days.map((d,di)=>{
              if(p.l==="Break") return <td key={d} style={{textAlign:"center",padding:"8px",color:C.warn,fontSize:10,fontWeight:700}}>Break</td>;
              const si=(di*5+pi)%subjects.length;
              return <td key={d} style={{padding:"5px 7px"}}><div style={{background:colors[si],color:tColors[si],borderRadius:6,padding:"4px 7px",textAlign:"center",fontSize:10,fontWeight:700}}>{subjects[si]}</div></td>;
            })}
          </tr>
        ))}</tbody>
      </table>
    </Card>
  </div>;
}

// ── CERTIFICATES ──────────────────────────────────────
function Certificates({students}){
  const [type,setType]=useState("leaving");
  const [student,setStudent]=useState(students[0]);
  const date=new Date().toLocaleDateString("en-PK",{day:"numeric",month:"long",year:"numeric"});
  return <div>
    <PageHdr title="Certificate Generator"/>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      {[["leaving","School Leaving"],["character","Character"],["bonafide","Bonafide"]].map(([id,l])=>(
        <Btn key={id} variant={type===id?"primary":"ghost"} onClick={()=>setType(id)}>{l} Certificate</Btn>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:14}}>
      <Card style={{padding:12}}>
        <div style={{fontSize:10,fontWeight:700,color:C.textMd,textTransform:"uppercase",marginBottom:8}}>Select Student</div>
        {students.map(s=><div key={s.id} onClick={()=>setStudent(s)} style={{padding:"7px 10px",borderRadius:6,cursor:"pointer",marginBottom:4,background:student?.id===s.id?C.primaryLt:"#f9fafb",border:"1px solid "+(student?.id===s.id?C.primary:C.border),fontSize:11,fontWeight:student?.id===s.id?700:400}}>{s.name}<br/><span style={{color:C.textMd,fontWeight:400}}>{s.cls}</span></div>)}
      </Card>
      <div>
        <Card style={{padding:32,border:"5px double "+C.gold,borderRadius:4,fontFamily:"Georgia,serif"}}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:C.primary,margin:"0 auto 8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",fontWeight:900}}>P</div>
            <div style={{fontWeight:900,color:C.primaryDk,fontSize:15}}>{SCHOOL.name}</div>
            <div style={{fontSize:10,color:C.textMd}}>{SCHOOL.address}</div>
            <div style={{height:2,background:"linear-gradient(90deg,transparent,"+C.gold+",transparent)",margin:"10px auto",maxWidth:260}}/>
            <div style={{fontWeight:800,color:C.text,fontSize:14,letterSpacing:2,textTransform:"uppercase"}}>{type==="leaving"?"School Leaving Certificate":type==="character"?"Character Certificate":"Bonafide Certificate"}</div>
          </div>
          <div style={{lineHeight:2.1,fontSize:12.5,color:C.text}}>
            <p>This is to certify that <strong>{student?.name}</strong>, son/daughter of <strong>{student?.father}</strong>, bearing Roll No. <strong>{student?.roll}</strong>, was enrolled in <strong>{student?.cls}, Section {student?.section}</strong>.</p>
            {type==="character"&&<p>The student maintained <strong>excellent character, discipline and Islamic conduct</strong> throughout their stay.</p>}
            {type==="leaving"&&<p>The student is leaving effective <strong>{date}</strong>. We wish them every success.</p>}
            {type==="bonafide"&&<p>This confirms that the above-named student is a bonafide student of this institution.</p>}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:36,fontSize:11}}>
            <div style={{textAlign:"center"}}><div style={{borderTop:"1px solid "+C.text,paddingTop:4,width:110}}>Class Teacher</div></div>
            <div style={{textAlign:"center"}}><div style={{borderTop:"1px solid "+C.text,paddingTop:4,width:110}}>Date: {date}</div></div>
            <div style={{textAlign:"center"}}><div style={{borderTop:"1px solid "+C.text,paddingTop:4,width:130}}>Principal</div></div>
          </div>
        </Card>
        <div style={{display:"flex",gap:8,marginTop:12}}><Btn size="lg">Download PDF</Btn><Btn size="lg" variant="secondary">Print</Btn></div>
      </div>
    </div>
  </div>;
}

// ── PARENTS ───────────────────────────────────────────
function Parents({students,fees,attendance}){
  const child=students[0];
  const childFee=fees.find(f=>f.studentId===child?.id);
  const attPct=child?Math.round(Object.values(attendance).filter(d=>d[child.id]==="Present").length/Math.max(Object.keys(attendance).length,1)*100):0;
  return <div>
    <PageHdr title="Parent Portal" sub={"Welcome — "+(child?.father||"Parent")}/>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Attendance" value={attPct+"%"} color={attPct>=80?C.success:C.warn}/>
      <StatCard label="Fee Status" value={childFee?.status||"—"} color={childFee?.status==="Paid"?C.success:C.danger}/>
      <StatCard label="Latest Grade" value="A+" color={C.gold}/>
      <StatCard label="Homework" value="3" color={C.info} sub="Pending"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Card style={{padding:18}}>
        <h3 style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:C.primary}}>Child Info</h3>
        {child&&[["Name",child.name],["Class",child.cls],["Roll No.",child.roll],["Father",child.father],["Today",(attendance[TODAY]||{})[child.id]||"Not Marked"]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid "+C.border}}>
            <span style={{fontSize:12,color:C.textMd,fontWeight:600}}>{k}</span>
            <span style={{fontSize:12,fontWeight:600}}>{v}</span>
          </div>
        ))}
      </Card>
      <Card style={{padding:18}}>
        <h3 style={{margin:"0 0 12px",fontSize:13,fontWeight:700,color:C.primary}}>Fee Summary</h3>
        {fees.slice(0,4).map(f=>(
          <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid "+C.border}}>
            <div><div style={{fontSize:12,fontWeight:600}}>{f.student}</div><div style={{fontSize:10,color:C.textMd}}>{f.month}</div></div>
            <Badge label={f.status} color={f.status==="Paid"?"green":"red"}/>
          </div>
        ))}
      </Card>
    </div>
  </div>;
}

// ── AI PAGE ───────────────────────────────────────────
function AIPage(){
  const [msgs,setMsgs]=useState([{role:"assistant",text:"السلام علیکم! 😊\nمیں پیراگون اسکول کا AI اسسٹنٹ ہوں۔\n\nآپ مجھ سے پوچھ سکتے ہیں:\n• داخلہ معلومات\n• فیس اسٹرکچر\n• اوقات\n• جماعتیں اور مضامین\n• رابطہ معلومات\n• ریاضی، سائنس، انگریزی میں مدد\n\nAssalam-o-Alaikum!\nAsk me anything about Paragon Islamic School!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const send=()=>{
    const q=input.trim();
    if(!q||loading) return;
    setInput("");
    setMsgs(prev=>[...prev,{role:"user",text:q}]);
    setLoading(true);
    setTimeout(()=>{
      const reply=getAIReply(q);
      setMsgs(prev=>[...prev,{role:"assistant",text:reply}]);
      setLoading(false);
    },600);
  };

  const QUICK=[
    {l:"داخلہ",q:"admission"},
    {l:"فیس",q:"fee"},
    {l:"اوقات",q:"timing"},
    {l:"رابطہ",q:"contact"},
    {l:"Admission",q:"admission info"},
    {l:"Fees",q:"fee structure"},
    {l:"Classes",q:"classes subjects"},
    {l:"Study Tips",q:"study plan"},
  ];

  return <div>
    <PageHdr title="AI Assistant" sub="Bilingual — Urdu and English"/>
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
      {QUICK.map((q,i)=><button key={i} onClick={()=>{setInput(q.q);}} style={{padding:"5px 12px",borderRadius:20,border:"1px solid "+C.border,background:"#fff",cursor:"pointer",fontSize:11,color:C.primary,fontFamily:"inherit",fontWeight:600}}>{q.l}</button>)}
    </div>
    <Card style={{overflow:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,"+C.primaryDk+","+C.primary+")",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff"}}>AI</div>
        <div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Paragon AI Assistant</div><div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>اردو + English</div></div>
        <div style={{marginLeft:"auto",background:"#22c55e",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:"#fff"}}>Online</div>
      </div>
      <ChatBubble msgs={msgs} loading={loading} bottomRef={ref}/>
      <div style={{padding:"10px 14px",borderTop:"1px solid "+C.border,display:"flex",gap:8,background:"#fff"}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Urdu ya English mein likhein..." style={{flex:1,padding:"9px 14px",border:"1px solid "+C.border,borderRadius:22,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
        <Btn onClick={send} disabled={loading||!input.trim()}>Send</Btn>
      </div>
    </Card>
  </div>;
}

// ── NAV ───────────────────────────────────────────────
const NAV=[
  {group:"Public Website",items:[{id:"website",label:"School Website"}]},
  {group:"Administration",items:[{id:"dashboard",label:"Admin Dashboard"},{id:"students",label:"Students"},{id:"attendance",label:"Attendance"},{id:"fees",label:"Fee Management"},{id:"exams",label:"Exams and Results"},{id:"teachers",label:"Teachers"}]},
  {group:"Portals",items:[{id:"parents",label:"Parent Portal"}]},
  {group:"Modules",items:[{id:"timetable",label:"Timetable"},{id:"certs",label:"Certificates"}]},
  {group:"AI Tools",items:[{id:"ai",label:"AI Assistant"}]},
];

// ── ROOT ──────────────────────────────────────────────
export default function App(){
  const [active,setActive]=useState("website");
  const [sidebar,setSidebar]=useState(true);
  const [students,setStudents]=useState(INIT_STUDENTS);
  const [attendance,setAttendance]=useState(INIT_ATT);
  const [fees,setFees]=useState(INIT_FEES);

  const render=()=>{
    if(active==="website")    return <Website/>;
    if(active==="dashboard")  return <Dashboard students={students} fees={fees} attendance={attendance}/>;
    if(active==="students")   return <Students students={students} setStudents={setStudents}/>;
    if(active==="attendance") return <Attendance students={students} attendance={attendance} setAttendance={setAttendance}/>;
    if(active==="fees")       return <Fees fees={fees} setFees={setFees}/>;
    if(active==="exams")      return <Exams/>;
    if(active==="teachers")   return <Teachers/>;
    if(active==="timetable")  return <Timetable/>;
    if(active==="certs")      return <Certificates students={students}/>;
    if(active==="parents")    return <Parents students={students} fees={fees} attendance={attendance}/>;
    if(active==="ai")         return <AIPage/>;
    return <Dashboard students={students} fees={fees} attendance={attendance}/>;
  };

  return <div style={{display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.bg,overflow:"hidden"}}>
    <div style={{width:sidebar?210:0,minWidth:sidebar?210:0,background:"linear-gradient(180deg,"+C.primaryDk+","+C.primary+")",color:"#fff",transition:"all .22s",overflow:"hidden",display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"13px 12px 9px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0}}>P</div>
          <div><div style={{fontSize:11,fontWeight:800,whiteSpace:"nowrap"}}>PARAGON SCHOOL</div><div style={{fontSize:9,opacity:.5}}>ERP System</div></div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
        {NAV.map(g=><div key={g.group}>
          <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:1.2,textTransform:"uppercase",padding:"10px 12px 3px"}}>{g.group}</div>
          {g.items.map(n=><button key={n.id} onClick={()=>setActive(n.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",background:active===n.id?"rgba(255,255,255,.15)":"transparent",color:active===n.id?"#fff":"rgba(255,255,255,.6)",border:"none",borderLeft:"3px solid "+(active===n.id?C.gold:"transparent"),cursor:"pointer",fontSize:11,fontWeight:active===n.id?700:400,fontFamily:"inherit",transition:"all .12s"}}>{n.label}</button>)}
        </div>)}
      </div>
      <div style={{padding:"8px 12px",borderTop:"1px solid rgba(255,255,255,.08)",fontSize:9,color:"rgba(255,255,255,.3)",textAlign:"center"}}>{SCHOOL.phone}</div>
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
      <div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 16px",display:"flex",alignItems:"center",gap:10,height:48,flexShrink:0,boxShadow:C.shadow}}>
        <button onClick={()=>setSidebar(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",flexDirection:"column",gap:3}}>
          {[0,1,2].map(i=><div key={i} style={{width:16,height:2,background:C.textMd,borderRadius:2}}/>)}
        </button>
        <div style={{height:20,width:1,background:C.border}}/>
        <div style={{fontWeight:700,color:C.text,fontSize:13}}>{NAV.flatMap(g=>g.items).find(n=>n.id===active)?.label||"Dashboard"}</div>
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:10,color:C.textLt}}>Session 2025-26</span>
          <div style={{background:C.primaryLt,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:C.primary}}>Admin</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:active==="website"?0:18}}>{render()}</div>
    </div>
    <FloatingAI/>
  </div>;
}
