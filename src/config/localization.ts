const english = {
  cardNumber: 'CARD NUMBER',
  expiry: 'Expiry',
  CVV: 'CVV',
  cardHolderName: 'Name',
  enterNewCardPin: 'Enter your new card PIN to secure your card.',
  confirmCardPIN: 'Confirm your card PIN.',
  wrongCardPin: 'PIN does not match.\nPlease re-enter the card PIN',
  enterCurrentCardPin: 'Enter your current card PIN to secure your card.',
  enterVerifyCardPin: 'Enter your current card PIN for verification.',
  verifyPinButtonLabel: 'Verify PIN',
  setPinButtonLabel: 'Set PIN',
  changePinButtonLabel: 'Change PIN',
  copiedToClipboard: 'Copied to clipboard',
  viewPinCountdownLabel: (count: number) =>
    'PIN will be hidden in ' + count + ' seconds',
  show: 'Show',
  hide: 'Hide',
};

const arabic = {
  cardNumber: 'رقم البطاقة',
  expiry: 'تاريخ الانتهاء',
  CVV: '\u200Eرقم التحقق من البطاقة (CVV)',
  cardHolderName: 'الإسم',
  enterNewCardPin: '\u200Eالرجاء ادخال الرقم السري الجديد (PIN)',
  confirmCardPIN: '\u200Eيرجى إعادة إدخال رقم السري لبطاقتك (PIN)',
  wrongCardPin: '\u200Eالرقم السري لبطاقتك غير متطابق\n\u200Eيرجى إعادة إدخال رقم السري لبطاقتك (PIN)',
  enterCurrentCardPin: '\u200Eالرجاء ادخال الرقم السري الحالي (PIN)',
  enterVerifyCardPin: '\u200Eالرجاء إدخال رقم السري لبطاقتك للتحقق (PIN)',
  verifyPinButtonLabel: 'التحقق من رقم السري لبطاقتك',
  setPinButtonLabel: 'تعيين الرقم السري',
  changePinButtonLabel: '\u200Eتغيير الرقم السري (PIN)',
  copiedToClipboard: 'تم النسخ إلى الحافظة',
  viewPinCountdownLabel: (count: number) =>
    '\u200Eثواني\u200E ' + count + '\u200E سيتم إخفاء الرقم السري للبطاقة خلال',
  show: '\u200Eعرض',
  hide: '\u200Eإخفاء',
};

export const localization = {
  english: english,
  arabic: arabic,
};
