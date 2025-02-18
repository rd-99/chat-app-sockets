import { createContext, useContext, useState } from "react";
// import axios  from "axios";
import {z} from "zod";
import { ProtectedRoutesProps, SignInParam, User, UserContextType } from "../types";

const userContext = createContext<UserContextType | undefined>(undefined);

function ProtectedRoutes({children} : ProtectedRoutesProps) {

    const [user, setUser] = useState<User | null>(null);

    const signin = async ({email, password} : SignInParam) => {
        //perform validations with zod
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(2)
        });
        const params = schema.safeParse({email, password});
        if(!params.success) {
            alert("Invalid email or password");
        }else{
        const response  = {email , status: 200};
        if(response.status === 200) {
            const {email} = response;
            setUser({email});
        }
    }
    }

    const signout = async () => {
        setUser(null);
    }
    
    return ( 
        <userContext.Provider value={{user , signin, signout}}>
            {children}
        </userContext.Provider>
     );
}

export default ProtectedRoutes;

export const UserAuthContext = () => {

    const context = useContext(userContext)
    // if(!context) {
    //     throw new Error("abc")
    // }
    return context;

}


