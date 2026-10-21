// Photos for the Playable phone. Credits: public/food/CREDITS.txt. A dish with no photo shows a skeleton.
export const STALL_PHOTO = ['stalls/pimpa.jpg', 'stalls/kha-mu-hongtae.jpg', 'stalls/saep-nua.jpg', 'stalls/chapayom.jpg'];

const DISH_PHOTO: Record<string, string> = {
  'ต้มยำ': 'food/tom-yum-noodle.jpg',
  'ข้าวขาหมู': 'food/khao-kha-mu.jpg',
  'ข้าวมันไก่ต้ม': 'food/khao-man-kai.jpg',
  'ข้าวมันไก่กรอบ': 'food/kai-krob.jpg',
  'ข้าวไก่ทอดน้ำปลา': 'food/kai-thot.jpg',
  'ข้าวปลากรอบ': 'food/pla-krob.jpg',
  'ข้าวปลาแกะ': 'food/pla-kae.jpg',
  'ส้มตำ': 'food/som-tam.jpg',
  'ชาไทย': 'food/cha-yen.jpg',
};

export const dishPhoto = (th: string): string | undefined => DISH_PHOTO[th];

/** Pickup slots: now (~10 min) then the next two 15-minute steps. Demo clock is 12:02. */
export const TIMES = ['12:10', '12:15', '12:30'];
