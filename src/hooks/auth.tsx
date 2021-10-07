import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import * as AuthSession from "expo-auth-session";
import { AuthorizationResponse, User } from "../common/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import { appEnv } from "../../env";

const { CLIENT_ID } = appEnv;
const { REDIRECT_URI } = appEnv;

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

const userStorageKey = "@gofinances:user";

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userLogged, setUserLogged] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = (await AuthSession.startAsync({
                authUrl,
            })) as AuthorizationResponse;

            if (type === "success") {
                const response = await fetch(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
                );

                const userInfo = await response.json();

                const newUser = {
                    id: String(userInfo.id),
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                };

                setUserLogged(newUser);

                await AsyncStorage.setItem(
                    userStorageKey,
                    JSON.stringify(newUser)
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            if (credential) {
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName!
                        .givenName!}&length=1`,
                };

                setUserLogged(userLogged);
                await AsyncStorage.setItem(
                    userStorageKey,
                    JSON.stringify(userLogged)
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    async function signOut() {
        setUserLogged({} as User);

        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        const loadUserStorageData = async () => {
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged) as User;
                setUserLogged(userLogged);
            }

            setUserStorageLoading(false);
        };

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: {
                    id: userLogged.id,
                    name: userLogged.name,
                    email: userLogged.email,
                    photo: userLogged.photo,
                },
                signInWithGoogle,
                signInWithApple,
                signOut,
                userStorageLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export { AuthProvider, useAuth };
