import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Akaya_Kanadaka } from '@next/font/google';

const akaya = Akaya_Kanadaka({
  subsets: ['latin'],
  variable: '--font-akaya',
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${akaya.variable} font-sans h-full`}>
      <Component {...pageProps} />
    </div>
  );
}
