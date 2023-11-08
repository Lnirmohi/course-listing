import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/typedHooks";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {

  const name = useAppSelector(state => state.student.name);

  const navigate = useNavigate();
  const location = useLocation();

  const pathName = location.pathname;

  return (
    <div className="col-span-full flex justify-between shadow-md px-12">
      <h2 className="text-primary text-center self-center font-RobotoSlab text-lg leading-none tracking-wide">
        Course <br /> Listing
      </h2>
      <nav className="flex grow justify-center list-none">
        <li
          className={`px-4 py-5 font-bold text-primary text-lg hover:cursor-pointer ${
            pathName === "/courses" ? "border-b-2 border-b-primary" : ""
          }`}
          onClick={() => {
            navigate("courses");
          }}
        >
          Courses
        </li>
        <li
          className={`px-4 py-5 font-bold text-primary text-lg hover:cursor-pointer ${
            pathName === "/dashboard" ? "border-b-2 border-b-primary" : ""
          }`}
          onClick={() => {
            navigate("dashboard");
          }}
        >
          Dashboard
        </li>
      </nav>
      <div className="flex gap-2 cursor-pointer">
        <UserCircleIcon className="self-center text-primary w-8 h-8" />
        <p className="text-xl text-primary self-center">{name}</p>
      </div>
    </div>
  );
}
