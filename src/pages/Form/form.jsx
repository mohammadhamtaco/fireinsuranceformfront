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
        {/* ----------------------------------------- */}
        <p>
          بازگشت به تفاهم صورت گرفته مابین شرکت بیمه آسیا و دانشگاه خوارزمی،
          منازل مسکونی پرسنل تا سقف ده میلیارد ریال تحت پوشش بیمه‌ی آتش‌سوزی،
          صاعقه و انفجار قرار گرفته است. بمنظور شروع پوشش بیمه‌ای نسبت به تکمیل اطلاعات ذیل اقدام نمائید:
        </p>
        {/* ------------------------------------------- */}

        <div className="row justify-content-evenly">
          <input
            placeholder="کد ملی"
            className="col-10 col-sm-4 p-3"
            type="text"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
            required
          />

          <input
            placeholder="نام"
            className="col-10 col-sm-3 p-3 my-3 my-sm-0"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="نام خانوادگی"
            className="col-10 col-sm-4 p-3"
            type="text"
            value={familyname}
            required
            onChange={(e) => setFamilyname(e.target.value)}
          />
        </div>

        <div className="row justify-content-evenly my-3">
          <input
            placeholder="شماره تلفن همراه"
            className="col-10 col-sm-4 p-3 "
            type="text"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            placeholder="متراژ خانه"
            className="col-10 col-sm-3 p-3 my-3 my-sm-0"
            type="text"
            value={houseArea}
            required
            onChange={(e) => setHouseArea(e.target.value)}
          />
          <input
            placeholder="کد پستی"
            className="col-10 col-sm-4 p-3"
            type="text"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="row justify-content-evenly">
          <textarea
            placeholder="آدرس"
            className="py-3 col-10 col-sm-8"
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* ----------------------------------------------- */}
        <p className="my-3">
          به اطلاع میرساند امکان افزایش پوششهای ذیل به جهت بهبود بیمه‌نامه با
          توجه به نیاز بیمه‌گذار میسر است؛ در صورت درخواست، هر کدام از موارد مورد نیاز را انتخاب نمائید. کارشناسان این شرکت در اسرع وقت با شما ارتباط میگیرند.
        </p>
        {/* ----------------------------------------- */}

        <div className="row mb-4">
          {/* ریفکتور چک‌باکس‌ها با آرایه */}
          {[
            { label: "زلزله", state: earthquake, setState: setEarthquake, info: " با پرداخت حق بیمه اضافی به مبلغ 110 هزار تومان" },
            { label: "سیل", state: flood, setState: setFlood, info: " با پرداخت حق بیمه اضافی به مبلغ 44 هزار تومان" },
            { label: "طوفان", state: thunderstorm, setState: setThunderstorm, info: " با پرداخت حق بیمه اضافی به مبلغ 44 هزار تومان" },
            { label: "پوشش جنگ", state: war, setState: setWar, info: " با پرداخت حق بیمه اضافی به مبلغ 660 هزار تومان" },
            { label: "افزایش سرمایه", state: increaseCapital, setState: setIncreaseCapital, info: " لازم است با کارشناسان ما مشورت کنید" },
            { label: "سرقت با شکست حرز", state: robbery, setState: setRobbery, info: " لازم است با کارشناسان ما مشورت کنید" },
          ].map((item, idx) => (
            <div className="form-check form-switch col-12 col-sm-6" key={idx}>
                <input
                className="form-check-input"
                  type="checkbox"
                  checked={item.state}
                  onChange={e => item.setState(e.target.checked)}
              />
              <label className="form-check-label ">
                {item.label}
                <span className="form-check-info"> ({item.info}) </span>
              </label>
            </div>
          ))}
        </div>
        <div className="row justify-content-center align-items-center">
          <img
            className="captcha-image"
            src={cap.captcha}
            alt="Captcha"
            onClick={call_captcha}
          />
          <input
            placeholder="کد امنیتی را وارد کنید"
            className="col-10 col-sm-3 p-3"
            type="text"
            value={captchaValue}
            required
            onChange={(e) => setCaptchaValue(e.target.value)}
          />
        </div>
        <div className="row mx-auto justify-content-center mt-3">
          <button type="submit" className="btn btn-primary w-25">
            ارسال
          </button>
        </div>
      </div>
    </form>
  );
}

export default MyForm;
