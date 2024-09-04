import SectionTag from "../../SectionTag";
import DisctrictCard from "./DisctrictCard";

const District = () => {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <SectionTag name={"our districts"} />
            <DisctrictCard />
            <DisctrictCard />
            <DisctrictCard />
            <DisctrictCard />
            <DisctrictCard />
        </div>
    );
};

export default District;