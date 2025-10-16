import type { MenuItemSimple } from "../../types/Menu";
import { FaEyeSlash, FaRegEdit } from "react-icons/fa";

export default function MenuItemHiddenCard({
  menuItem,
  toggleEdit,
}: {
  menuItem: MenuItemSimple;
  toggleEdit: (id: number) => void;
}) {
  return (
    <label
      htmlFor="eye-slash"
      className="group flex relative justify-center items-center cursor-pointer"
      onClick={() => toggleEdit(menuItem.id)}
    >
      <FaEyeSlash
        id="eye-slash"
        className="absolute flex text-5xl z-10 text-gray-400 transition-colors duration-200 group-hover:text-green-500"
      />
      <div className="relative flex flex-row items-stretch bg-gray-200 border border-primary-dark rounded-md shadow-lg min-h-[150px] transition-opacity duration-200">
        <div className="flex flex-1 flex-col justify-center gap-y-2 p-4 min-h-full">
          <header className="flex gap-x-2 items-center">
            <FaRegEdit className="text-2xl" />
            <h2 className="text-xl text-black font-bold">{menuItem.name}</h2>
          </header>
          <div className="flex flex-col text-black">
            <h4 className="text-md">
              Half Tray: ${menuItem.half_tray_price.toFixed(2)}
            </h4>
            <h4 className="text-md">
              Full Tray: ${menuItem.full_tray_price.toFixed(2)}
            </h4>
          </div>
        </div>
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="object-cover min-h-full max-w-[40%] rounded-md"
        />
      </div>
    </label>
  );
}
