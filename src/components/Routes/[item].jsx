// src/components/Routes/[item].jsx
import { Link } from "react-router-dom";
import Home from "../Home";
import { ArrowBackIcon } from "../Icons";

// search for the usages of Item and padd react components in the params 
const Item = (props) => {
  const { page } = props;
  if (page === "homepage") {
    return <div id="page">{page}</div>;
  } else {
    return (
      <div id="page">
        {/* <Link to="/">
          <button className="btn">
            <ArrowBackIcon /> Back to Home
          </button>
        </Link> */}
        {page}
      </div>
    );
  }
};

export default Item;