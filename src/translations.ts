export type Language = 'EN' | 'TH';

export interface Translations {
  nav: {
    brand: string;
    howItWorks: string;
    forStalls: string;
    demo: string;
    waitlist: string;
    langSwitch: string;
  };
  hero: {
    headline: string;
    subline: string;
    cta: string;
    badges: {
      campus: string;
      building: string;
      benefit: string;
    };
  };
  showcase3D: {
    title: string;
    screenNames: {
      home: string;
      store: string;
      dish: string;
      status: string;
      stall: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Number: string;
    step1Title: string;
    step1Desc: string;
    step2Number: string;
    step2Title: string;
    step2Desc: string;
    step3Number: string;
    step3Title: string;
    step3Desc: string;
  };
  forStalls: {
    title: string;
    highlight: string;
    description: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  demoSection: {
    title: string;
    subtitle: string;
    instruction: string;
  };
  waitlist: {
    heading: string;
    description: string;
    inputPlaceholder: string;
    submitButton: string;
    submitting: string;
    privacyNotice: string;
    successMessage: string;
    submitAnother: string;
    label: string;
    empty: string;
    failed: string;
    done: string;
  };
  stallForm: { heading: string; description: string; placeholder: string; button: string; success: string };
  choice: { label: string; student: string; stall: string };
  stallDemo: { hint: string };
  footer: {
    tagline: string;
    location: string;
    allRightsReserved: string;
  };
}

export const content: Record<Language, Translations> = {
  EN: {
    nav: {
      brand: 'REWJAD',
      howItWorks: 'How it works',
      forStalls: 'For stalls',
      demo: 'Demo',
      waitlist: 'Waitlist',
      langSwitch: 'TH',
    },
    hero: {
      headline: 'D1 food, super fast.\nOrder ahead.\nGrab it when you arrive.',
      subline: 'Pre-order from Mae Fah Luang University D1 canteen stalls before you walk over. Skip the noon crowd, pick up on time.',
      cta: 'Be first at D1',
      badges: {
        campus: 'Mae Fah Luang University',
        building: 'Canteen D1 Food Center',
        benefit: 'Packed and ready for pickup',
      },
    },
    showcase3D: {
      title: 'Designed for the noon rush at D1',
      screenNames: {
        home: 'Home and recommendations',
        store: 'D1 stall menu and wait time',
        dish: 'Dish customisation and pickup slot',
        status: 'Live queue number and status',
        stall: 'Stall order queue and ready button',
      },
    },
    howItWorks: {
      title: 'How it works in 3 steps',
      subtitle: 'Built for MFU students and staff on the go.',
      step1Number: 'Step 1',
      step1Title: 'Order',
      step1Desc: 'Pick your favourite D1 stall and choose your dish with custom options before leaving your lecture hall or dorm.',
      step2Number: 'Step 2',
      step2Title: 'Pick a time',
      step2Desc: 'Choose your pickup slot so the stall prepares and packs your food right as you walk across the campus grounds.',
      step3Number: 'Step 3',
      step3Title: 'Grab it at the counter',
      step3Desc: 'Walk straight to the D1 stall counter, show your order number, grab your packed meal, and head somewhere cool to eat.',
    },
    forStalls: {
      title: 'For stalls',
      highlight: '2 THB per order, no monthly fee',
      description: 'A transparent, low-cost tool made specifically for food vendors at D1 Canteen. You cook on schedule and serve pre-orders without overcrowding your counter.',
      points: [
        {
          title: 'Predictable lunch preparation',
          desc: 'Incoming tickets show scheduled pickup times so your staff can batch cook meals before the lunch bell rings.',
        },
        {
          title: 'One-tap ready notification',
          desc: 'Tap the green button when packed. The student receives an instant alert to step up to the counter and collect.',
        },
        {
          title: 'Zero monthly subscriptions',
          desc: 'Pay only 2 THB per completed order. No 30% delivery commission and no expensive hardware contracts.',
        },
      ],
    },
    demoSection: {
      title: 'Try the ordering experience',
      subtitle: 'Experience how smooth pre-ordering at D1 will be. Tap through the live screen below.',
      instruction: 'Tap the dish, select your pickup slot, and send your order.',
    },
    waitlist: {
      heading: 'Be first when REWJAD opens at D1',
      description: 'Get notified the day REWJAD pilots with our first partner stalls in Canteen D1 at Mae Fah Luang University.',
      inputPlaceholder: 'Email, LINE ID or phone',
      submitButton: 'Join the waitlist',
      submitting: 'Saving your spot...',
      privacyNotice: 'We keep your contact only to tell you when REWJAD opens.',
      successMessage: 'You are on the priority list for D1 canteen. We will notify you when REWJAD opens.',
      submitAnother: 'Register another contact',
      label: 'Your contact',
      empty: 'Please enter your email, LINE ID or phone',
      failed: 'Could not send. Check your connection and try again.',
      done: 'You are on the list',
    },
    stallForm: { heading: 'Run a D1 stall?', description: 'Leave one contact and we will talk about a one-day trial.', placeholder: 'Email, LINE ID or phone', button: 'Tell me about the trial', success: 'Thanks. We will contact you about the trial.' },
    choice: { label: 'I am a', student: 'Student or staff', stall: 'Stall owner' },
    stallDemo: { hint: 'Try the stall phone: orders arrive by themselves.' },
    footer: {
      tagline: 'Pre-order pickup app for D1 canteen',
      location: 'Mae Fah Luang University, Chiang Rai',
      allRightsReserved: 'All rights reserved.',
    },
  },
  TH: {
    nav: {
      brand: 'REWJAD',
      howItWorks: 'วิธีใช้งาน',
      forStalls: 'สำหรับร้านค้า',
      demo: 'ทดลองใช้งาน',
      waitlist: 'จองสิทธิ์',
      langSwitch: 'EN',
    },
    hero: {
      headline: 'ข้าว D1 เร็วจัด\nสั่งก่อน\nถึงแล้วรับเลย',
      subline: 'สั่งล่วงหน้าจากร้านจริงในโรงอาหาร D1 มหาวิทยาลัยแม่ฟ้าหลวง เดินมารับที่เคาน์เตอร์แล้วไปทานในห้องแอร์',
      cta: 'เป็นคนแรกที่ได้ใช้ที่ D1',
      badges: {
        campus: 'มหาวิทยาลัยแม่ฟ้าหลวง',
        building: 'โรงอาหาร D1',
        benefit: 'อาหารใส่กล่องพร้อมรับทันที',
      },
    },
    showcase3D: {
      title: 'ออกแบบเพื่อชั่วโมงเร่งด่วนที่โรงอาหาร D1',
      screenNames: {
        home: 'หน้าแรกและเมนูแนะนำ',
        store: 'หน้าร้าน เมนู และเวลารอ',
        dish: 'เลือกขนาดจานและเวลารับ',
        status: 'ติดตามหมายเลขคิวและสถานะปรุง',
        stall: 'หน้าจอร้านค้า กดแจ้งพร้อมรับ',
      },
    },
    howItWorks: {
      title: '3 ขั้นตอนง่ายๆ ได้ข้าวทันที',
      subtitle: 'ออกแบบเพื่อชีวิตนักศึกษาและบุคลากรมหาวิทยาลัยแม่ฟ้าหลวงที่เร่งรีบ',
      step1Number: 'ขั้นตอน 1',
      step1Title: 'สั่งอาหาร',
      step1Desc: 'เลือกร้านโปรดใน D1 และเลือกเมนูที่คุณอยากกินพร้อมระบุรายละเอียดพิเศษก่อนเดินออกจากห้องเรียนหรือหอพัก',
      step2Number: 'ขั้นตอน 2',
      step2Title: 'เลือกเวลารับ',
      step2Desc: 'ระบุรอบเวลารับอาหารที่สะดวก ร้านจะปรุงและแพ็กกล่องไว้ล่วงหน้าตามเวลาที่คุณเดินมาถึง',
      step3Number: 'ขั้นตอน 3',
      step3Title: 'รับที่เคาน์เตอร์',
      step3Desc: 'เดินตรงไปที่หน้าร้าน D1 แจ้งเลขคิว รับกล่องข้าวที่แพ็กเรียบร้อย แล้วไปนั่งกินในห้องแอร์หรือที่เย็นสบายได้เลย',
    },
    forStalls: {
      title: 'สำหรับร้านค้า',
      highlight: '2 บาทต่อออเดอร์ ไม่มีค่ารายเดือน',
      description: 'ระบบจัดการออเดอร์สำหรับร้านค้าโรงอาหาร D1 โดยเฉพาะ ไม่ต้องเสียค่าบริการรายเดือนและไม่โดนหักเปอร์เซ็นต์สูงเหมือนแอปเดลิเวอรีทั่วไป',
      points: [
        {
          title: 'เตรียมอาหารล่วงหน้าได้อย่างแม่นยำ',
          desc: 'เห็นรอบเวลาที่นักศึกษาจะมารับชัดเจน ทยอยปรุงและแพ็กลงกล่องก่อนช่วงเวลาเที่ยงที่คนแน่น',
        },
        {
          title: 'กดแจ้งพร้อมรับได้ในคลิกเดียว',
          desc: 'อาหารพร้อมแล้วกดปุ่มสีเขียวแจ้งเตือนตรงไปที่โทรศัพท์ของนักศึกษาให้เดินมารับที่หน้าเคาน์เตอร์',
        },
        {
          title: 'ไม่มีค่าบริการรายเดือน',
          desc: 'คิดค่าบริการเพียง 2 บาทต่อออเดอร์ที่เสร็จสมบูรณ์ ไม่มีค่าแรกเข้าและไม่มีค่าธรรมเนียมแอบแฝง',
        },
      ],
    },
    demoSection: {
      title: 'ทดสอบระบบสั่งอาหารจำลอง',
      subtitle: 'ลองสัมผัสความสะดวกรวดเร็วของการสั่งอาหารล่วงหน้าที่โรงอาหาร D1 ด้วยตัวคุณเอง',
      instruction: 'กดเลือกเมนู กำหนดเวลารับ แล้วกดส่งออเดอร์เพื่อดูการแจ้งเตือนจริง',
    },
    waitlist: {
      heading: 'เป็นคนแรกเมื่อ REWJAD เปิดที่ D1',
      description: 'ลงชื่อรับสิทธิ์เพื่อเป็นกลุ่มแรกที่ได้ใช้งานเมื่อ REWJAD เปิดให้บริการกับร้านค้าพันธมิตรในโรงอาหาร D1 มหาวิทยาลัยแม่ฟ้าหลวง',
      inputPlaceholder: 'อีเมล, LINE ID หรือเบอร์โทร',
      submitButton: 'ลงชื่อรับสิทธิ์',
      submitting: 'กำลังบันทึกข้อมูล...',
      privacyNotice: 'เราเก็บช่องทางติดต่อไว้แค่เพื่อบอกคุณตอน REWJAD เปิด',
      successMessage: 'บันทึกชื่อเรียบร้อยแล้ว เราจะติดต่อคุณทันทีเมื่อ REWJAD เปิดให้บริการที่โรงอาหาร D1',
      submitAnother: 'ลงชื่อติดต่อเพิ่ม',
      label: 'ช่องทางติดต่อของคุณ',
      empty: 'กรุณากรอกอีเมล LINE ID หรือเบอร์โทร',
      failed: 'ส่งไม่สำเร็จ ลองเช็กเน็ตแล้วส่งอีกครั้ง',
      done: 'ลงชื่อสำเร็จ',
    },
    stallForm: { heading: 'เปิดร้านใน D1 อยู่ใช่ไหม', description: 'ฝากช่องทางติดต่อไว้ แล้วเราจะคุยเรื่องทดลองใช้ 1 วัน', placeholder: 'อีเมล, LINE ID หรือเบอร์โทร', button: 'สนใจทดลองใช้', success: 'ขอบคุณครับ เราจะติดต่อไปเรื่องทดลองใช้' },
    choice: { label: 'ฉันเป็น', student: 'นักศึกษา/บุคลากร', stall: 'เจ้าของร้าน' },
    stallDemo: { hint: 'ลองเป็นร้านดู ออเดอร์จะเข้ามาเอง' },
    footer: {
      tagline: 'แอปสั่งอาหารล่วงหน้ารับที่เคาน์เตอร์ โรงอาหาร D1',
      location: 'มหาวิทยาลัยแม่ฟ้าหลวง เชียงราย',
      allRightsReserved: 'สงวนลิขสิทธิ์',
    },
  },
};
