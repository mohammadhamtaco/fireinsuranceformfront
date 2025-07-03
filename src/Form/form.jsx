import React, { useState } from "react";
import "./form.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Name: ${nationalCode}\nOption 1: ${earthquake}\nOption 2: ${flood}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title">
        {/* <img src="/public/Hamta-LOGO.png" alt="HamtaCoLogo" /> */}
        <p> فرم مخصوص کارکنان دانشگاه خوارزمی</p>
      </div>

      <div className="row mb-5 justify-content-between">
        <input
          placeholder="کد ملی"
          className="col-4 p-4"
          type="text"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
        />

        <input
          placeholder="نام"
          className="col-3 p-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="نام خانوادگی"
          className="col-4 p-4"
          type="text"
          value={familyname}
          onChange={(e) => setFamilyname(e.target.value)}
        />
      </div>
      <div className="row my-5">
        <textarea
          placeholder="آدرس"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="row my-5">
        <input
          placeholder="کد پستی"
          className="col-4 p-4"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <input
          placeholder="شماره تلفن همراه"
          className="col-4 p-4 mx-5"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {/* ----------------------------------------------- */}
      <p className="text-center my-5">
        این بیمه نامه جهت پوشش آتشسوزی، صاعقه و انفجار است و در صورت نیاز به
        پوششهای زیر هر کدام را جداگانه انتخاب نمائید:
      </p>
      {/* ----------------------------------------- */}
      <div className="row my-5">
        <div className="form-check col">
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
        <div className="form-check col">
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
        <div className="form-check col">
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
        <div className="form-check col">
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
        <div className="form-check col">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={robbery}
              onChange={(e) => setRobbery(e.target.checked)}
            />
            سرقت ملک یا حرز
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
