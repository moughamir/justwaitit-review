import { Header } from '@/components/layout/Header';
import { ScrollTriggered } from '@/components/sections/ScrollTriggered';

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Header />
      <ScrollTriggered />
    </main>
  );
}
