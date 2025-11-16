import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

//our context provider

export function AuthProvider({ user, setUser, children }) {
  return <AuthContext value={{ user, setUser }}> {children}</AuthContext>;
}
