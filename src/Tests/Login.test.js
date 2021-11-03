import  LoginView  from "../views/login-view"
import * as React from "react";
import { screen, render } from "@testing-library/react"

test("Login header is showing", async () => {
 render (<LoginView />)
 const headingElement = screen.getByText("Loginn");
 expect(headingElement).toMatch("Login");
})