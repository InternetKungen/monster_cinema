import React from "react";
import TitleBarComponent from "../../../components/TitleBarComponent/TitleBarComponent";
import "./about.scss";

const About: React.FC = () => {
  return (
    <section className="about-container">
      <section className="about-title">
        <TitleBarComponent title="Om Biografen" />
      </section>
      <p className="about-text">
        Välkommen till oss på Monsterbio, där varje filmvisning är en resa in i
        det okända! Sedan 1989 är vi Uppsalas mest passionerade
        skräckentusiaster som tror på kraften i gemenskapen och vill skapa en
        plats där skräckfans kan samlas, diskutera sina favoritfilmer och dela
        sina mest skrämmande upplevelser.
        <br />
        <br />
        Vi erbjuder en unik upplevelse där klassiska skräckfilmer möter moderna
        rysare. Vårt noggrant utvalda program inkluderar allt från kultklassiker
        till nysläppta skräckfilmer, samt specialevenemang och temakvällar som
        får adrenalinet att pumpa.
        <br />
        <br />
        Så kom och upplev en filmkväll som får dig att darra av spänning och
        skratt! Vare sig du är en hängiven skräckälskare eller bara nyfiken på
        vad som lurar i skuggorna, så har vi något för dig. Vi ser fram emot att
        välkomna dig till en värld där rädslan tar form och varje film är en ny
        historia att upptäcka. <br />
        <br />
        Välkommen till Monsterbio, här börjar din mardröm!
      </p>
    </section>
  );
};

export default About;
