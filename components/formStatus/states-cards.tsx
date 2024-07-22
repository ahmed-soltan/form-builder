import StatesCard from "./states-card";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

interface StatesCardsProps {
  visits?: number;
  submissions?: number;
  submissionsRate?: number;
  bounceRate?: number;
  loading: boolean;
}
const StatesCards = ({
  visits,
  submissions,
  submissionsRate,
  bounceRate,
  loading,
}: StatesCardsProps) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatesCard
        title={"Total Visits"}
        icon={<LuView className="text-blue-600" />}
        helperText={"All Time Form Visits"}
        value={visits?.toLocaleString() || ""}
        className={"shadow-md shadow-blue-600"}
        loading={loading}
      />
      <StatesCard
        title={"Total Submissions"}
        icon={<FaWpforms className="text-yellow-600" />}
        helperText={"All Time Form Submissions"}
        value={submissions?.toLocaleString() || ""}
        className={"shadow-md shadow-yellow-600"}
        loading={loading}
      />
      <StatesCard
        title={"Submissions Rate"}
        icon={<HiCursorClick className="text-green-600" />}
        helperText={"Visits that Result in form submission"}
        value={submissionsRate?.toLocaleString() + "%" || ""}
        className={"shadow-md shadow-green-600"}
        loading={loading}
      />
      <StatesCard
        title={"Bounce Rate"}
        icon={<TbArrowBounce className="text-red-600" />}
        helperText={"Visits that Leaves without interacting"}
        value={bounceRate?.toLocaleString() + "%" || ""}
        className={"shadow-md shadow-red-600"}
        loading={loading}
      />
    </div>
  );
};

export default StatesCards;
