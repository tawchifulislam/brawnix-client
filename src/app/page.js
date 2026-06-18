import Banner from '@/components/Banner';
import Ecosystem from '@/components/Ecosystem';
import FeaturedClasses from '@/components/FeaturedClasses';
import LatestForum from '@/components/LatestForum';
import MilestoneCalculator from '@/components/MilestoneCalculator';

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
