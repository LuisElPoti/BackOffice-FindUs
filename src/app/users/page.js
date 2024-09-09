"use client";
import React from "react";
import MyTable from "../components/table";

export default function Users() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-colorResumen">
            <div className="h-[45%] bg-greenBackground relative">
                <h2 className="text-xl text-letterColor font-bold ml-12 mt-8">Usuarios</h2>
            </div>
            <div className="flex-grow relative">
                <MyTable />
            </div>
        </div>
    );
}
