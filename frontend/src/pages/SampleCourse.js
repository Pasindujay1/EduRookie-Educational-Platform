import React from "react";

function SampleCourse() {
  const courses = [
    {
      id: "price_1PECP8P0DHfG6KvysgXew9An",
      title: "Java Programming",
      price: 100.0,
    },
    {
      id: "price_1PECTnP0DHfG6KvyKLMizCYg",
      title: "OOP Concepts",
      price: 150.0,
    },
    {
      id: "price_1PECXlP0DHfG6KvyPzGLe2ny",
      title: "MySQL Database",
      price: 200.0,
    },
  ];

  const handleCheckout = async () => {
    await fetch("http://localhost:8003/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courses: courses,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };
  return (
    <div>
      <h1>Sample Course</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default SampleCourse;
