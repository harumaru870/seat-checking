import Head from 'next/head';
import { useEffect } from 'react'; // Import useEffect hook

export default function Home() {
  useEffect(() => {
    const seat_number = new Array(45);
    for (let i = 0; i < 45; i++) {
      seat_number[i] = String(i + 1);
    }

    const enter = (div_id, para_id) => {
      const dn = document.getElementById(div_id);
      const pn = document.getElementById(para_id);
      const user = window.prompt('名前を入力してください', '');
      if (user && user.length > 0) {
        pn.innerHTML = user;
        dn.style = "background-color: red;";
      }
    }

    window.enter = enter; // Make the function available globally

    const cleanup = () => {
      const user = window.prompt('席番号（半角数字）', '')
      if (seat_number.includes(user)) {
        const dn = document.getElementById("div" + user);
        const pn = document.getElementById("p" + user);
        if (window.confirm(`座席番号${user}の消毒はお済ですか？`)) {
          pn.innerHTML = `<p id='p${user}'><input type="button" value="名前入力" onclick="enter('div${user}','p${user}')"></p>`;
          dn.style = "background-color: white;";
        }
      }
    }

    window.cleanup = cleanup; // Make the function available globally

  }, []); // Empty dependency array for useEffect

  return (
    <>
      <Head>
        <meta name="description" content="座席記録" />
      </Head>

      <div className="container">
        <div className="head">
          <div className="Title" style={{ textAlign: 'center' }}>
            <h1>座席記録</h1>
            <h2>座ったところにお名前を書いてください</h2>
            <input type='button' value="消毒" onClick={() => window.cleanup()} />
          </div>
        </div>
        <div className="Seats">
          {Array.from({ length: 43 }, (_, i) => (
            <div className={`seat${i + 1}`} id={`div${i + 1}`}>
              <h5>座席番号{i + 1}</h5>
              <p id={`p${i + 1}`}>
                <input type="button" value="名前入力" onClick={() => window.enter(`div${i + 1}`, `p${i + 1}`)} />
              </p>
            </div>
          ))}
          <div className="utils"></div>
        </div>
      </div>
    </>
  );
}
