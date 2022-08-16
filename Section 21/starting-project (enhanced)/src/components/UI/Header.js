import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <p>Greate Quotes</p>
      <Link to="/quotes">All Outes</Link>
      <Link to="/quotes/add">Add a Quote</Link>
    </div>
  );
};

export default Header;
