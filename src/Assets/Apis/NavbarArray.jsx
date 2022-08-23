import Blog from "../../Layouts/NavHoverUI/Blog";
import Demo from "../../Layouts/NavHoverUI/Demo";
import Lookbook from "../../Layouts/NavHoverUI/Lookbook";
import Portfolio from "../../Layouts/NavHoverUI/Portfolio";
import Product from "../../Layouts/NavHoverUI/Product";
import Sale from "../../Layouts/NavHoverUI/Sale";
import Shop from "../../Layouts/NavHoverUI/Shop";

export const navbarArray = [
  {
    navName: "Demo",
    navId: 1,
    navPath: "/demo",
    navElementName: <Demo/>
  },
  {
    navName: "Shop",
    navId: 2,
    navPath: "/shop",
    navElementName: <Shop/>
  },
  {
    navName: "Product",
    navId: 3,
    navPath: "/product",
    navElementName: <Product/>
  },
  {
    navName: "Sale",
    navId: 4,
    navPath: "/sale",
    navElementName: <Sale/>
  },
  {
    navName: "Portfolio",
    navId: 5,
    navPath: "/portfolio",
    navElementName: <Portfolio/>
  },
  {
    navName: "Lookbook",
    navId: 6,
    navPath: "/lookbook",
    navElementName: <Lookbook/>
  },
  {
    navName: "Blog",
    navId: 7,
    navPath: "/blog",
    navElementName: <Blog/>
  },
];
