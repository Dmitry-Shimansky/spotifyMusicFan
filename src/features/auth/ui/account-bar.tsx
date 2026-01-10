import {LoginButton} from "./login-button.tsx";
import {useMeQuery} from "../api/use-me-query.ts";
import {CurrentUser} from "./current-user/current-user.tsx";

export const AccountBar = () => {
   const query = useMeQuery()

    if (query.isPending) return <span>Loading...</span>

    return (
        <div>
            {!query.data && <LoginButton />}
            {query.data && <CurrentUser />}
        </div>
    )
};