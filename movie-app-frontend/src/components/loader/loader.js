import { useState} from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./loader.css";

export default function Loader() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");

    window.setTimeout(() => {
        setLoading(false);
    }, 3000)

    return (
        <div>
            {loading ? <div className="loader">
                <PacmanLoader
                    color={color}
                    loading
                    size={75}
                />
            </div> : <div></div>}
        </div>
    );
}
