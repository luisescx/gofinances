import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { useAuth, AuthProvider } from "../../hooks/auth";
import * as AuthSession from "expo-auth-session";
import {} from "jest-mock";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("expo-auth-session");

global.fetch = jest.fn(() => {
    const response = Promise.resolve({
        json: () =>
            Promise.resolve({
                id: "id_teste",
                email: "email.teste",
                given_name: "joao",
                picture: "fototeste.png",
            }),
    });

    return response;
});

describe("Auth Hook", () => {
    beforeEach(async () => {
        const userCollectionKey = "@gofinances:user";
        await AsyncStorage.removeItem(userCollectionKey);
    });

    it("should be able to sign in with a valid Google account", async () => {
        const authSessionMocked = mocked(AuthSession.startAsync as any);
        authSessionMocked.mockReturnValueOnce({
            type: "success",
            params: {
                access_token: "access_token_fake_test",
            },
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).toBeTruthy();
    });

    it("user should not connect if cancel authentication with Google", async () => {
        const authSessionMocked = mocked(AuthSession.startAsync as any);
        authSessionMocked.mockReturnValueOnce({
            type: "cancel",
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty("id");
    });
});
