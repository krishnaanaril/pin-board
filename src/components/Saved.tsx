import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

function Saved() {
    return (
        <>
            <div className="fixed w-full bottom-6 flex place-content-evenly">
            <Button asChild>
                    <Link to="/">
                        <ArrowLeft />
                        Back
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default Saved;