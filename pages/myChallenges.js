import ChallengeCard from "@/components/challenges/card";
import { Pagination } from "@/components/challenges/pagiation";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";

export default function MyChallengesPage() {
  return (
    <>
      <div className="dataOptionsArea">
        <SearchBar />
        <Sort />
      </div>
      <div>
        <ChallengeCard />
      </div>
      <div className={""}>
        <Pagination pages={[1, 2, 3]} />
      </div>
    </>
  );
}
