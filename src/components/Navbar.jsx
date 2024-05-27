import { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiRequest from "../services/useApiRequest";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useBlogRequests from "../services/useBlogRequests";
import {
  fetchStart,
  getBlogsSuccess,
  setEditMode,
} from "../features/blogsSlice";
import useAxios from "../services/useAxios";
import logo from "../assets/logo.png"
import { Tooltip } from "@mui/material";
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
        } lg:z-50 z-50`} 
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
  const navigate = useNavigate()
  const { axiosToken } = useAxios();
  



  const handleSearch = (e) => {
    e.preventDefault();
    const getSearchedBlogs = async (searchQuery) => {
      dispatch(fetchStart());
      try {
        const res = await axiosToken(`/blogs/?search[title]=${searchQuery}`);
        
        dispatch(getBlogsSuccess(res.data));
        navigate("searchresults")
      } catch (error) {
        console.log(error);
      }
    };
    if (searchQuery.length > 0) {
      getSearchedBlogs(searchQuery);
    }

    
  };

  const categoryData = [
    {
      name: 'World',
      desc: 'Global news and events happening around the world.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5m0-16.5L9.75 6.75m0 0L12 9m-2.25-2.25L12 6.75m0-3l2.25 3m0 0L12 9m0 9V12m3 0v9m0 0L12 12m3 9H9m0 0V9" />
        </svg>
      ),
    },
    {
      name: 'Technology',
      desc: 'Latest advancements and news in technology.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75h-15m15 0v15h-15v-15m15 0L12 2.25M4.5 6.75L12 2.25m0 0v18" />
        </svg>
      ),
    },
    {
      name: 'Design',
      desc: 'Innovative design trends and insights.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 6.75H3m18 0v10.5H3V6.75m18 0L12 2.25M3 6.75L12 2.25m0 0v19.5" />
        </svg>
      ),
    },
    {
      name: 'Culture',
      desc: 'Exploring diverse cultures and traditions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75 4.365-9.75 9.75-9.75zm0 0v10.5m0 0L6.75 7.5" />
        </svg>
      ),
    },
    {
      name: 'Business',
      desc: 'Updates and analysis on global business.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3l9 9-9 9" />
        </svg>
      ),
    },
    {
      name: 'Politics',
      desc: 'Current political events and analysis.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5M12 2.25L3 12m9-9l9 9" />
        </svg>
      ),
    },
    {
      name: 'Science',
      desc: 'Discoveries and research in the scientific world.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 21.75H2.25m19.5-19.5H2.25m19.5 19.5V2.25m-19.5 19.5V2.25" />
        </svg>
      ),
    },
    {
      name: 'Health',
      desc: 'Health tips and news to stay well.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75 4.365-9.75 9.75-9.75zM12 9v6" />
        </svg>
      ),
    },
    {
      name: 'Style',
      desc: 'Latest fashion trends and style tips.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 4.75L19.25 19.25M4.75 19.25L19.25 4.75" />
        </svg>
      ),
    },
    {
      name: 'Travel',
      desc: 'Travel guides and destination tips.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zM12 9v6" />
        </svg>
      ),
    },
    {
      name: 'Sport',
      desc: 'Updates and news on sports events.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75l10.5 10.5M17.25 6.75L6.75 17.25" />
        </svg>
      ),
    },
    {
      name: 'Food',
      desc: 'Delicious recipes and culinary news.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12h10.5M12 6.75v10.5" />
        </svg>
      ),
    },
  ];
  
  const dropdownNavs = categories.map((item) => {
    const category = categoryData.find((cat) => cat.name === item.name);
    return {
      title: item.name,
      id: item._id,
      desc: category?.desc || "Default description",
      path: `categories/${item._id}`,
      icon: category?.icon || (
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
          d="M12 3.75v16.5M3.75 12h16.5"
        />
      </svg>
    ),
  }})
  

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
    { title: "About", path: "about" },
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
          <a href="/">
            <img
              src={logo}
              width={120}
              height={50}
              alt="Your Blogs"
            />
          </a>
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
            
              <div className="flex-1 mx-auto flex justify-center ">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2 border rounded-md p-2 w-2/3 lg:w-full"
                >
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
                  <Tooltip
                   title={"Sadece başlıklar içinde arama yapabilirsiniz. Backend'ten dolayı case sensitive'dir."}
                   arrow>
                    <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                  />
                  </Tooltip>
                  
                  
                </form>
              </div>
            
            {user?.username && (
              <span className="hidden whitespace-nowrap md:block text-gray-700">
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
