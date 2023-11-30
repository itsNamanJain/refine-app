import { useLogout, useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <div className="flex flex-col px-4 py-3">
      <ul>
        {menuItems.map((item, index) => (
          <li key={item.key}>
            <Link
              href={item.route ?? "/"}
              className={
                selectedKey === item.key
                  ? " text-blue-700"
                  : `${index % 2 === 0 ? "bg-gray-100" : "bg-white w-full "}`
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={"/generate-certificates"}
        className="!w-fit mt-4 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        Generate Certificates
      </Link>
      <button
        className="!w-fit mt-4 bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};
