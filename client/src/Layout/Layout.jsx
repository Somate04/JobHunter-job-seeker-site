import Navigation from "../Layout/Navigation";

function Layout(props) {
  return (
    <div className="ui container">
      <Navigation></Navigation>
      {props.children}
    </div>
  );
}

export default Layout;
