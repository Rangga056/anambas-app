import Hero from "@/components/shared/Activity/Hero";
import LattestNews from "@/components/shared/Activity/LattestNewsSection/LattestNews";

const ActivityPage = () => {
  return (
    <div className="container">
      <div className="bg-hero-activity-img bg-cover bg-center max-w-screen-2xl mx-auto h-[calc(100vh-80px)] flex items-center justify-center max-h-[750px]">
        <Hero />
      </div>

      <LattestNews />

    </div>
  );
};
export default ActivityPage;
