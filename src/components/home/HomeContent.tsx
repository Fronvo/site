import HomePosts from "./HomePosts";
import HomeStories from "./HomeStories";
import { Separator } from "../ui/separator";

export default function HomeContent() {
  return (
    <div className="w-max m-auto mt-6">
      <HomeStories />

      <Separator className="mt-4 mb-4" />

      <HomePosts />
    </div>
  );
}
