import Banner from '@/components/Home/Banner';
import Ecosystem from '@/components/Home/Ecosystem';
import FeaturedClasses from '@/components/Home/FeaturedClasses';
import LatestForum from '@/components/Home/LatestForum';
import MilestoneCalculator from '@/components/Home/MilestoneCalculator';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <FeaturedClasses />
      <Ecosystem />
      <LatestForum />
      <MilestoneCalculator />
    </div>
  );
}
