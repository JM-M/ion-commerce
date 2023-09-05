import { useState } from "react";
import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import cx from "classnames";
import useCategories, { Category } from "../hooks/useCategories";
import PageLoader from "./PageLoader";

const CategoriesMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("/");

  const { categoriesQuery, getChildCategories, hasChildCategories } =
    useCategories();
  const { isLoading } = categoriesQuery;

  if (isLoading) return <PageLoader />;
  const categories = getChildCategories(activeCategory || "/");
  const paths = activeCategory.split("/");
  const lastPath = paths[paths.length - 1];
  const parentCategory =
    activeCategory !== "/" ? activeCategory.replace(lastPath, "") : "/";
  const isRootCategory = activeCategory === "/";

  return (
    <>
      {!isRootCategory && (
        <div className="flex items-center gap-2 pl-5 mr-5 -mt-2 mb-2">
          <IonIcon
            icon={chevronBack}
            onClick={() => setActiveCategory(parentCategory)}
          />
          <span>{activeCategory || "/"}</span>{" "}
        </div>
      )}
      <ul>
        {categories.map((category: Category, index: number) => {
          const { name, value } = category;
          const active = activeCategory === value;
          const hasChildren = hasChildCategories(value);
          return (
            <li key={index}>
              <Link
                to={`/store/category${value}`}
                className={cx(
                  "flex items-center justify-between h-10 pl-5 mr-5 mb-1 border border-transparent rounded-lg",
                  {
                    "border-[var(--ion-color-primary)] text-[var(--ion-color-primary)] font-medium":
                      active,
                  }
                )}
              >
                {name}
                {hasChildren && (
                  <IonIcon
                    icon={chevronForward}
                    onClick={() => {
                      if (!hasChildren) return;
                      setActiveCategory(value);
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoriesMenu;
