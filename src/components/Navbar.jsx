import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";
import { Link, useLocation } from "react-router-dom";
import useBlogRequests from "../services/useBlogRequests";
import { fetchStart, getBlogsSuccess, setEditMode } from "../features/blogsSlice";
import useAxios from "../services/useAxios";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const defaultProfilImage =
    "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await props.logout();
      setState(false);

      window.location.href = "/";
    } catch (error) {
      console.error("Logout işlemi başarısız:", error);
    }
  };

  const navigation = [
    { title: "Profil & Settings", path: `/profil/${user?.currentUserId}` },
    { title: "Log out", path: "#", onClick: handleLogout },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setState(false);
      }
    };
    document.addEventListener("click", handleDropDown);
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            src={props.user.profilImage || defaultProfilImage}
            className="w-full h-full rounded-full "
          />
        </button>
        <div className="lg:hidden">
          <span className="block">{props.user.username}</span>
          <span className="block text-sm text-gray-500">
            {props.user.email}
          </span>
        </div>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "block" : "hidden"
        } lg:z-50 z-50`} // z-index ekledik
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            {item.title === "Log out" ? (
              <button
                className="block w-full text-left text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                onClick={item.onClick}
              >
                {item.title}
              </button>
            ) : (
              <Link
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                to={item.path}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default () => {
  useEffect(() => {
    getCategories();
  }, []);
  const { categories } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { axiosToken } = useAxios();



  const handleSearch = (e) => {
    e.preventDefault();
    const getSearchedBlogs = async (searchQuery) => {
      dispatch(fetchStart());
      try {
        const res = await axiosToken(
          `/blogs/?search[title]=${searchQuery}`
        );
        console.log(res.data.data[0]);
        dispatch(getBlogsSuccess(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    if(searchQuery.length>0){getSearchedBlogs(searchQuery)}
    
    console.log("Search query:", searchQuery);
  };




  
  const dropdownNavs = categories.map((item) => ({
    title: item.name,
    desc: "Duis aute irure dolor in reprehenderit",
    path: `/${item}`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
  }));

  const [drapdownState, setDrapdownState] = useState({
    isActive: false,
    idx: null,
  });
  const [menuState, setMenuState] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useApiRequest();
  const { getCategories } = useBlogRequests();

  const handleNewBlog = () => {
    dispatch(
      setEditMode({
        mode: false,
        blog: {
          title: "",
          image: "",
          content: "",
          categoryId: "",
          isPublish: false,
        },
      })
    );
  };

  const navigation = [
    { title: "Categories", path: "#", isDrapdown: true, navs: dropdownNavs },
    { title: "New Blog", path: "addblog", onClick: handleNewBlog },
    { title: "About", path: "#" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".nav-menu"))
        setDrapdownState({ isActive: false, idx: null });
    };
  }, []);

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
        </div>
        <div className="nav-menu flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ul className="mt-4 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0 ">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx}>
                    {item.isDrapdown ? (
                      <button
                        className="w-full flex items-center gap-1 text-gray-700 hover:text-indigo-600"
                        onClick={() =>
                          setDrapdownState({
                            idx,
                            isActive: !drapdownState.isActive,
                          })
                        }
                      >
                        {item.title}
                        {drapdownState.idx == idx && drapdownState.isActive ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={item.onClick}
                        className="block text-gray-700 hover:text-indigo-600"
                      >
                        {item.title}
                      </Link>
                    )}
                    {item.isDrapdown &&
                    drapdownState.idx == idx &&
                    drapdownState.isActive ? (
                      <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0 relative z-50 bg-gray-100">
                        <ul className="max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3 ">
                          {item?.navs.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <Link
                                to={dropdownItem.path}
                                onClick={() => (
                                  setDrapdownState({
                                    idx,
                                    isActive: !drapdownState.isActive,
                                  }),
                                  setMenuState(false)
                                )}
                                className="flex gap-3 items-center"
                              >
                                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14">
                                  {dropdownItem.icon}
                                </div>
                                <div>
                                  <span className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">
                                    {dropdownItem.title}
                                  </span>
                                  <p className="text-sm text-gray-600 group-hover:text-gray-800 mt-1">
                                    {dropdownItem.desc}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
            {user.username ? (
              <ProfileDropDown
                class="mt-5 pt-5 border-t lg:hidden"
                logout={logout}
                user={user}
              />
            ) : (
              <div className="mt-5 pt-5 lg:hidden">
                <Link
                  to="login"
                  onClick={() => setMenuState(false)}
                  className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg "
                >
                  Log in
                </Link>
                <Link
                  to="register"
                  onClick={() => setMenuState(false)}
                  className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none mt-2 rounded-lg shadow "
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-between space-x-2 sm:space-x-6">
          {location.pathname === '/' && (
            <div className="flex-1 mx-auto flex justify-center ">
              <form onSubmit={handleSearch} className="flex items-center space-x-2 border rounded-md p-2 w-1/2 lg:w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                />
                <button
                    type="submit"
                    className="text-indigo-600 hover:text-indigo-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3a6 6 0 100 12A6 6 0 009 3zm3.707 10.293a1 1 0 00-1.414-1.414L9 12.172l-2.293-2.293a1 1 0 00-1.414 1.414L7.586 13.586l-2.293 2.293a1 1 0 001.414 1.414L9 15.828l2.293 2.293a1 1 0 001.414-1.414L10.414 13.586l2.293-2.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
              </form>
            </div>)}
            {user?.username && (
              <span className="hidden whitespace-nowrap lg:block text-gray-700">
                <span className="text-xs font-thin">Logged in,</span>
                <span className="text-lg font-bold"> {user.username}</span>
              </span>
            )}
            {user.username ? (
              <ProfileDropDown
                class="hidden lg:block"
                logout={logout}
                user={user}
              />
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link
                  to="login"
                  className="whitespace-nowrap block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none flex-col items-center"
                  style={{ lineHeight: "1" }}
                >
                  Log in
                </Link>
                <Link
                  to="register"
                  className="whitespace-nowrap py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline flex-col items-center"
                  style={{ lineHeight: "1" }}
                >
                  Sign up
                </Link>
              </div>
            )}
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
