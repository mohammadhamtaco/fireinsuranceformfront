import React, { useState, useEffect, useRef } from "react";
import "./form.css";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL,
});
function MyForm() {
  const [nationalCode, setNationalCode] = useState("");
  const [name, setName] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseArea, setHouseArea] = useState("");
  const [earthquake, setEarthquake] = useState(false);
  const [flood, setFlood] = useState(false);
  const [thunderstorm, setThunderstorm] = useState(false);
  const [war, setWar] = useState(false);
  const [increaseCapital, setIncreaseCapital] = useState(false);
  const [robbery, setRobbery] = useState(false);

  const [captchaValue, setCaptchaValue] = useState("");
  const isRequested = useRef(false);
  const [cap, setCap] = useState({ id: "", captcha: "" });

  const call_captcha = () => {
    if (isRequested.current) return;
    isRequested.current = true;

    let url = "/captcha";
    if (cap.id !== "") url += `?id=${cap.id}`;

    API.get(url)
      .then(({ data }) => {
        if (data) {
          console.log({ id: data.id });
          setCap({
            id: data.id,
            captcha: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              data.captcha
            )}`,
          });
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    call_captcha();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    API.post("/kharazmiforms", {
      nationalCode: nationalCode,
      name: name,
      familyname: familyname,
      address: address,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      houseArea: houseArea,
      earthquake: earthquake,
      flood: flood,
      thunderstorm: thunderstorm,
      war: war,
      increaseCapital: increaseCapital,
      robbery: robbery,
      id: "Fake ID",
      captcha: captchaValue,
    }).then((data) => {
      console.log(data);
      alert("اطلاعات با موفقیت ثبت شد");
      // Reset form fields after successful submission
      setNationalCode("");
      setName("");
      setFamilyname("");
      setAddress("");
      setPostalCode("");
      setPhoneNumber("");
      setHouseArea("");
      setEarthquake(false);
      setFlood(false);
      setThunderstorm(false);
      setWar(false);
      setIncreaseCapital(false);
      setRobbery(false);
      setCaptchaValue("");
      setCap({ id: "", captcha: "" });
    });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="form-title">
          <img src={require("../assets/hamtaLogo.png")} alt="HamtaCoLogo" />
          <p> </p>
          <img
            src={require("../assets/kharazmilogoblack.png")}
            alt="KharazmiLogo"
          />
        </div>
        <p>
          بازگشت به تفاهم صورت گرفته مابین شرکت بیمه آسیا و دانشگاه خوارزمی،
          منازل مسکونی پرسنل تا سقف ده میلیارد ریال تحت پوشش بیمه‌ی آتش‌سوزی،
          صاعقه و انفجار قرار گرفته است
          <br />
          به منظور شروع پوشش بیمه‌ای نسبت به تکمیل اطلاعات ذیل اقدام نمائید:
        </p>

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
          <input
            placeholder="متراژ خانه"
            className="col-12 col-sm-2 p-3 mx-sm-5"
            type="text"
            value={houseArea}
            onChange={(e) => setHouseArea(e.target.value)}
          />
        </div>
        {/* ----------------------------------------------- */}
        <p className="text-center my-3">
          به اطلاع میرساند امکان افزایش پوششهای ذیل به جهت بهبود بیمه نامه با
          توجه به نیاز بیمه‌گذار میسر است:{" "}
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
                checked={increaseCapital}
                onChange={(e) => setIncreaseCapital(e.target.checked)}
              />
              افزایش سرمایه
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
              سرقت با شکست حرز
            </label>
          </div>
        </div>
        <div className="row ">
          <input
            placeholder="کد امنیتی را وارد کنید"
            className="col-12 col-sm-2 p-3 mx-sm-3"
            type="text"
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
          />
          <img
            className="captcha-image"
            src={cap.captcha}
            alt="Captcha"
            onClick={call_captcha}
          />

          <button type="submit" className="btn btn-primary w-50">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyForm;
