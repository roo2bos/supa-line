// hooks/useFonts.ts
import { Courgette, Roboto } from 'next/font/google';

const courgette = Courgette({
  weight: ['400'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const useFonts = () => {
  return { courgette: courgette.className, roboto: roboto.className };
};

export default useFonts;
