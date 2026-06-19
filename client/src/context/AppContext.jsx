import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();

    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const [pickupDate, setPickUpDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [cars, setCars] = useState([]);

    // Fetch Logged In User
    const fetchUser = async () => {
        try {

            const { data } = await axios.get("/api/user/data");

            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Logout
    const logOut = () => {

        localStorage.removeItem("token");

        delete axios.defaults.headers.common["Authorization"];

        setToken(null);
        setUser(null);
        setIsOwner(false);

        toast.success("Logged Out Successfully");
    };

    // Fetch Cars
    const fetchCars = async () => {
        try {

            const { data } = await axios.get("/api/user/cars");

            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Load token from localStorage
    useEffect(() => {

        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
        }

        fetchCars();

    }, []);

    // Whenever token changes
    useEffect(() => {

        if (token) {

            axios.defaults.headers.common["Authorization"] = token;

            fetchUser();
        }

    }, [token]);

    const value = {
        navigate,
        currency,
        axios,

        token,
        setToken,

        user,
        setUser,

        isOwner,
        setIsOwner,

        showLogin,
        setShowLogin,

        showSignup,
        setShowSignup,

        fetchUser,

        logOut,

        cars,
        setCars,
        fetchCars,

        pickupDate,
        setPickUpDate,

        returnDate,
        setReturnDate
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};