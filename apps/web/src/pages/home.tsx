import RecentlyViewed from "../components/home/RecentlyViewed";
import WorkspaceSection from "../components/home/WorkspaceSection";

function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <RecentlyViewed />
      <WorkspaceSection />
    </div>
  );
}

export default Home;
