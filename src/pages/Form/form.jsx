import React, { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
// console.log(process.env);
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
  const [cap, setCap] = useState({ id: "", captcha: "" });

  const call_captcha = () => {
    // شرط حذف شد تا همیشه کلیک کار کند
    let url = "/captcha";
    if (cap.id !== "") url += `?id=${cap.id}`;

    API.get(url).then(({ data }) => {
      if (data) {
        console.log({ id: data.id });
        setCap({
          id: data.id,
          captcha: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            data.captcha
          )}`,
        });
      }
    }).catch((err) => {
      console.error(err.response?.data || 'خطا');
    });
  };
  useEffect(() => {
    call_captcha();
  }, []);

  const resetForm = () => {
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
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nationalCode,
        name,
        familyname,
        address,
        postalCode,
        phoneNumber,
        houseArea,
        earthquake,
        flood,
        thunderstorm,
        war,
        increaseCapital,
        robbery,
        id: cap.id,
        captcha: captchaValue,
      };
      const { data } = await API.post("/kharazmiforms", payload);
      console.log(data);
      alert("اطلاعات با موفقیت ثبت شد");
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.");
    } finally {
      call_captcha();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="container">
        <div className="form-title">
          <img src={require("../../assets/hamtaLogo.png")} alt="HamtaCoLogo" />
          <p> </p>
          <img
            src={require("../../assets/kharazmilogoblack.png")}
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
        <div className="row mb-5 justify-content-between">
          <input
            placeholder="کد پستی"
            className="col-12 col-sm-4 p-3"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            placeholder="شماره تلفن همراه"
            className="col-12 col-sm-3 p-3"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            placeholder="متراژ خانه"
            className="col-12 col-sm-4 p-3"
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
          {/* ریفکتور چک‌باکس‌ها با آرایه */}
          {[
            { label: "زلزله", state: earthquake, setState: setEarthquake },
            { label: "سیل", state: flood, setState: setFlood },
            { label: "طوفان", state: thunderstorm, setState: setThunderstorm },
            { label: "پوشش جنگ", state: war, setState: setWar },
            { label: "افزایش سرمایه", state: increaseCapital, setState: setIncreaseCapital },
            { label: "سرقت با شکست حرز", state: robbery, setState: setRobbery },
          ].map((item, idx) => (
            <div className="form-check form-switch col-12" key={idx}>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.state}
                  onChange={e => item.setState(e.target.checked)}
                />
                {item.label}
              </label>
            </div>
          ))}
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
      </div>
    </form>
  );
}

export default MyForm;
