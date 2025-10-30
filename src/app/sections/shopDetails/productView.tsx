import ProductSorting from "@/app/sections/shopDetails/productSorting";
import ProductCart from "@/app/sections/product-card"
import Pagination from "@/components/custom-ui/pagination";
import { useAppDispatch } from "@/lib/reduxHooks";
import { Product } from "@/lib/data";
import ProductsCategory from "./productsCategory";
import ShopSidebar from "./shopSidebar";

type ProductsViewPropsType = {
  isCategoryShow: boolean;
  isSortingProductTop: boolean;
  isGridDefaultView: boolean;
  isSidebarCategoryHide: boolean;
  data: Product[];
};

const ProductsView = ({
  isCategoryShow,
  isSortingProductTop,
  isGridDefaultView,
  isSidebarCategoryHide,
  data,
}: ProductsViewPropsType) => {
  return (
    <>
      <div className="container pt-15 pb-15">
        {isCategoryShow && (
          <div className="mb-7.5">
            <ProductsCategory />
          </div>
        )}
        <div className="grid lg:grid-cols-[23.3%_auto] grid-cols-1 gap-7.5">
          <ShopSidebar isSidebarCategoryHide={isSidebarCategoryHide} />
          <div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10 mt-7.5">
              {data.map((prd) => {
                return (
                  <ProductCart key={prd.id} product={prd} />
                );
              })}
            </div>
            {data.length > 9 && <Pagination />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsView;
