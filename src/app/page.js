import Banner from '@/components/Banner';
import Ecosystem from '@/components/Ecosystem';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <Ecosystem />
    </div>
  );
}
