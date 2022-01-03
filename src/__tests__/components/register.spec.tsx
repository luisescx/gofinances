import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";
import Register from "../../screens/Register";
import { useNavigation } from "@react-navigation/core";
import { mocked } from "ts-jest/utils";

jest.mock("@react-navigation/core");

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register Screen", () => {
    it("must open category modal when user clicks on button", async () => {
        const mockedNavigate = mocked(useNavigation as any);
        mockedNavigate.mockReturnValue({
            navigate: jest.fn(),
            addListener: jest.fn(),
        });

        const { getByTestId } = render(<Register />, {
            wrapper: Providers,
        });

        const categoryModal = getByTestId("modal-category");
        const buttonCategory = getByTestId("button-category");

        fireEvent.press(buttonCategory);
        await waitFor(() => {
            expect(categoryModal.props.visible).toBeTruthy();
        });
    });
});
