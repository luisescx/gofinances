import React, { ReactNode, createContext, useContext, useState } from "react";

import * as AuthSession from "expo-auth-session";
import { AuthorizationResponse, User } from "../common/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userLogged, setUserLogged] = useState<User>({} as User);

    const userStorageKey = "@gofinances:user";

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

                setUserLogged({
                    id: String(userInfo.id),
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                });

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
                    photo: undefined,
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

    return (
        <AuthContext.Provider
            value={{
                user: {
                    id: "1",
                    name: "luis",
                    email: "luis@email.com",
                },
                signInWithGoogle,
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
