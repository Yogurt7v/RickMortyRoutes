import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {

    const navigate = useNavigate();

    useEffect (()=>{
        setTimeout (() => {
            navigate("/")
        }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
}