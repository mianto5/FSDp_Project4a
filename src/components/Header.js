import React from "react";

export default function Header() {
  return (
    <header className="bg-dark py-2">
      <div className="container px-4 px-lg-5 my-3">
        <div className="text-center text-white">
          <h1 className="display-5 fw-bolder">Welcome to Kitchen Story</h1>
          <p className="lead fw-normal text-white-50 mb-0">
            The Website Where Your Kitchen Story Comes True!
          </p>
        </div>
      </div>
    </header>
  );
}
