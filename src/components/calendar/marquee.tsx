import { useEffect, useState } from "react";

const Marquee: React.FC<{
  id: string;
  text: string[];
}> = (props) => {
  const [msgIdx, setMsgIdx] = useState(0);

  const changeMessage = () => {
    if (msgIdx === props.text.length - 1) setMsgIdx(0);
    else setMsgIdx(msgIdx + 1);
  };

  useEffect(() => {
    const el = document.getElementById(props.id);

    if (el) {
      el.addEventListener("animationiteration", changeMessage);
    }
  }, []);

  return (
    <p
      style={{
        overflow: "hidden",
        margin: "0",
        padding: "0",
        marginTop: "30px",
        marginBottom: "auto",
        display: "flex",
      }}
    >
      <small
        id={props.id}
        className="font-caveat"
        style={{
          display: "inline-block",
          textWrap: "nowrap",
          paddingLeft: "100%",
          animation: `marquee 10s linear infinite`,
          fontSize: "20px",
        }}
      >
        {props.text[msgIdx]}
      </small>
    </p>
  );
};

export default Marquee;
