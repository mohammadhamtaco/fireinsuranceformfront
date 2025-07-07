import React, { useState } from "react";
import "./form.css";
import axios from "axios";

function MyForm() {
  const [nationalCode, setNationalCode] = useState("");
  const [name, setName] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [earthquake, setEarthquake] = useState(false);
  const [flood, setFlood] = useState(false);
  const [thunderstorm, setThunderstorm] = useState(false);
  const [war, setWar] = useState(false);
  const [robbery, setRobbery] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     nationalCode,
  //     name,
  //     familyname,
  //     address,
  //     postalCode,
  //     phoneNumber,
  //     earthquake,
  //     flood,
  //     thunderstorm,
  //     war,
  //     robbery,
  //   };
  //   alert(JSON.stringify(formData, null, 2));

  //   try {
  //     const response = await fetch("backend-url.com/api/form", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert("اطلاعات با موفقیت ارسال شد!");
  //     } else {
  //       alert("خطا در ارسال اطلاعات.");
  //     }
  //   } catch (error) {
  //     alert("ارتباط با سرور برقرار نشد.");
  //   }
  // };

  const apiCall = async (e) => {
    e.preventDefault();
    const formData = {
      nationalCode,
      name,
      familyname,
      address,
      postalCode,
      phoneNumber,
      earthquake,
      flood,
      thunderstorm,
      war,
      robbery,
    };
    try {
      // await axios.post("http://localhost:8080/api/form", formData);
      await axios.get("http://localhost:8080").then((data) => {
        console.log(data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={apiCall}>
        <div className="form-title">
          <img src={require("../assets/hamtaLogo.png")} alt="HamtaCoLogo" />
          <p> فرم مخصوص کارکنان دانشگاه خوارزمی</p>
          <img src={require("../assets/kharazmiLogo.png")} alt="KharazmiLogo" />
        </div>

        <div className="row mb-5 justify-content-between">
          <input
            placeholder="کد ملی"
            className="col-12 col-sm-4 p-3"
            type="text"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
          />

          <input
            placeholder="نام"
            className="col-12 col-sm-3 p-3"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="نام خانوادگی"
            className="col-12 col-sm-4 p-3"
            type="text"
            value={familyname}
            onChange={(e) => setFamilyname(e.target.value)}
          />
        </div>
        <div className="row">
          <textarea
            placeholder="آدرس"
            className="p-3"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="row my-5">
          <input
            placeholder="کد پستی"
            className="col-12 col-sm-4 p-3"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <input
            placeholder="شماره تلفن همراه"
            className="col-12 col-sm-4 p-3 mx-sm-5"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {/* ----------------------------------------------- */}
        <p className="text-center my-3">
          این بیمه نامه جهت پوشش آتشسوزی، صاعقه و انفجار است و در صورت نیاز به
          پوششهای زیر هر کدام را جداگانه انتخاب نمائید:
        </p>
        {/* ----------------------------------------- */}
        <div className="row mb-4">
          <div className="form-check form-switch col-12">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={earthquake}
                onChange={(e) => setEarthquake(e.target.checked)}
              />
              زلزله
            </label>
          </div>
          <div className="form-check form-switch col-12">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={flood}
                onChange={(e) => setFlood(e.target.checked)}
              />
              سیل
            </label>
          </div>
          <div className="form-check form-switch col-12">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={thunderstorm}
                onChange={(e) => setThunderstorm(e.target.checked)}
              />
              طوفان
            </label>
          </div>
          <div className="form-check form-switch col-12">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={war}
                onChange={(e) => setWar(e.target.checked)}
              />
              پوشش جنگ
            </label>
          </div>
          <div className="form-check form-switch col-12">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={robbery}
                onChange={(e) => setRobbery(e.target.checked)}
              />
              سرقت ملک
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-50 mx-auto">
          ارسال
        </button>
      </form>
    </div>
  );
}

export default MyForm;
